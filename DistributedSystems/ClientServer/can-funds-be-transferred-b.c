#include<stdio.h>
#include<math.h>
#include<stdbool.h>

/*
Use this function to write data to socket
void write_string_to_socket(int sock_descriptor, char* message, uint32_t length);

Use this function to read data from socket
void read_string_from_socket(int sock_descriptor, char** message, uint32_t *length);
*/

// All global declarations go here
int nodes[100000];
double nodesP[100000];
int count;

/*
This function is called only once before any client connection is accepted by the server.
Read any global datasets or configurations here
*/
void init_server()
{
   printf("Reading configuration\n");
   FILE *read;
   FILE *write;
   char *filename = "training.txt";
   read = fopen( filename, "r" );
   if( read != NULL ) {
       //File exists. Read data from the file
       fscanf(read, "%d", &count);
       //nodes = malloc(sizeof(int) * count);
       
       for (int i = 0; i < count; i++) {
           nodes[i] = -1;
       }
       
       int u, v;
       double p;
       for (int i = 0; i < count; i++) {
           fscanf(read, "%d,%d,%lf", &u, &v, &p);
           nodes[v - 1] = u - 1;
           nodesP[v - 1] = p / 100;
       }
       fclose(read);
    }
   fflush(stdout);
}  

/*
Write your code here
This function is called everytime a new connection is accepted by the server
*/
void * process_client_connection(void * ptr)
{
    connection_t * conn;

    if (!ptr) pthread_exit(0); 
    conn = (connection_t *)ptr;

    printf("Connection received\n");
     fflush(stdout);

    int terminate_client = 0;
    do
    {
        /* read length of message */
        char *message = NULL;
        uint32_t message_length = 0;

        /* read message */
        read_string_from_socket(conn->sock, &message, &message_length);

        printf("Received = %s\n", message);

        /* End of operation on this clinet */
        if (strcmp(message, "END") == 0) {
            terminate_client = 1;
            free(message);
            break;
        }
        
        int src, dest;
        double limit;
        sscanf(message, "%d,%d,%lf", &src, &dest, &limit);
        src = src - 1;
        dest = dest - 1;
        
        //printf("%d %d %lf\n", src, dest, limit);
        
        int currentSrc = src;
        int currentDest = dest;
        
        double pSrc = 1;
        double pDest = 1;
        while (true) {
            if (nodes[currentSrc] == currentDest) {
                pSrc = pSrc * nodesP[currentSrc];
                break;
            } else if (nodes[currentDest] == currentSrc) {
                pDest = pDest * nodesP[currentDest];
                break;
            } else if (nodes[currentSrc] > nodes[currentDest]) {
                pSrc = pSrc * nodesP[currentSrc];
                currentSrc = nodes[currentSrc];
            } else if (nodes[currentDest] > nodes[currentSrc]) {
                pDest = pDest * nodesP[currentDest];
                currentDest = nodes[currentDest];
            } else {
                pSrc = pSrc * nodesP[currentSrc];
                pDest = pDest * nodesP[currentDest];
                
                break;
            }
        }
        
        double totalP = pSrc * pDest;
        
        printf("%lf %lf %lf %lf\n",pSrc, pDest, totalP, pow(10, limit));
        if (totalP >= pow(10, limit)) {
            write_string_to_socket(conn->sock, "YES", 3);
        } else {
            write_string_to_socket(conn->sock, "NO", 2);
        }
        
        free(message);

    } while(!terminate_client);

    /* close socket and clean up */
    printf("Closing client on socket %d\n", conn->sock);
     fflush(stdout);
    close(conn->sock);
    free(conn);
    pthread_exit(0);
}