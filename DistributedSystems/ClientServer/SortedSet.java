import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.newsclub.net.unix.AFUNIXServerSocket;
import org.newsclub.net.unix.AFUNIXSocketAddress;

/*
Java by default does not support UNIX Domain Sockets. Use junixsocket 3rd party library instead.
Documentaion: http://goo.gl/kveo6z
 */

class ProcessRunnable implements Runnable {
	private Socket sock = null;
	private Store store = null;

	private static int getInt(InputStream is) throws IOException {
		final byte[] buf = new byte[4];
		is.read(buf);
		final ByteBuffer wrapped = ByteBuffer.wrap(buf); // big-endian by
		// default

		return wrapped.getInt();
	}

	ProcessRunnable(Socket sock, Store store) {
		this.sock = sock;
		this.store = store;
	}

	/**
	 * @param sock
	 * @throws IOException
	 */
	private void process(Socket sock) throws IOException {
		System.out.println("Connected: " + sock);

		try (InputStream is = sock.getInputStream(); OutputStream os = sock.getOutputStream()) {
			boolean run = true;
			while (run) {
				final int numberOfParams = getInt(is);
				final ArrayList<Integer> params = new ArrayList<Integer>();
				for (int p = 0; p < numberOfParams; p++) {
					params.add(getInt(is));
				}

				System.out.println(params.toString());

				switch (params.get(0)) {
				case 1:
					store.add(params);
					os.write(ByteBuffer.allocate(4).putInt(0).array());
					os.flush();
					break;
				case 2:
					store.remove(params);
					os.write(ByteBuffer.allocate(4).putInt(0).array());
					break;
				case 3:
					final int size = store.size(params);
					os.write(ByteBuffer.allocate(4).putInt(1).array());
					os.write(ByteBuffer.allocate(4).putInt(size).array());
					os.flush();
					break;
				case 4:
					final int score = store.score(params);
					os.write(ByteBuffer.allocate(4).putInt(1).array());
					os.write(ByteBuffer.allocate(4).putInt(score).array());
					os.flush();
					break;
				case 5:
					store.range(params);
					final Set<Item> set = store.range(params);
					os.write(ByteBuffer.allocate(4).putInt(set.size() * 2).array());
					for (final Item item : set) {
						os.write(ByteBuffer.allocate(4).putInt(item.getKey()).array());
						os.write(ByteBuffer.allocate(4).putInt(item.getScore()).array());
					}
					os.flush();
					break;
				case 6:
					run = false;
					os.flush();
					break;
				default:
					System.out.println("not reconized" + params.get(1));
					break;
				}
			}
		}
		sock.close();
	}

	@Override
	public void run() {
		try {
			process(this.sock);
		} catch (final IOException e) {
			e.printStackTrace();
		}
	}
}

class Item implements Comparable<Item>{
	private final int key;
	private final int score;

	public Item(int key, int score) {
		this.key = key;
		this.score = score;
	}

	public int getKey() {
		return key;
	}

	public int getScore() {
		return score;
	}

	@Override
	public int compareTo(Item o) {
		if (this.key != o.key) {
			return this.key - o.key;
		}
		return this.score - o.score;
	}

}

class Store {
	private final ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Integer>> sortedSets;

	public Store() {
		sortedSets = new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Integer>>();
	}

	public synchronized void add(List<Integer> params) {
		ConcurrentHashMap<Integer, Integer> hashmap = sortedSets.get(params.get(1));

		if (hashmap == null) {
			hashmap = new ConcurrentHashMap<Integer, Integer>();
			sortedSets.put(params.get(1), hashmap);
		}
		hashmap.put(params.get(2), params.get(3));
	}

	public synchronized void remove(List<Integer> params) {
		final ConcurrentHashMap<Integer, Integer> hashmap = sortedSets.get(params.get(1));

		if (hashmap == null) {
			return;
		}
		hashmap.remove(params.get(2));

		if (hashmap.size() == 0) {
			sortedSets.remove(params.get(1));
		}
	}

	public synchronized int size(List<Integer> params) {
		final ConcurrentHashMap<Integer, Integer> hashmap = sortedSets.get(params.get(1));

		if (hashmap == null) {
			return 0;
		}

		return hashmap.size();
	}

	public synchronized int score(List<Integer> params) {
		System.out.println("get score" + params.toString());
		final ConcurrentHashMap<Integer, Integer> hashmap = sortedSets.get(params.get(1));

		if (hashmap == null) {
			return 0;
		}

		final Integer score = hashmap.get(params.get(2));

		if (score == null) {
			return 0;
		}
		return score;
	}

	public synchronized Set<Item> range(List<Integer> params) {
		final int low = params.get(params.size() - 2);
		final int high = params.get(params.size() - 1);

		final TreeSet<Item> set = new TreeSet<Item>();

		for (int i = 1; i < params.size() - 3; i++) {
			final ConcurrentHashMap<Integer, Integer> hashmap = sortedSets.get(params.get(i));
			if (hashmap == null) {
				continue;
			}
			for (final Map.Entry<Integer, Integer> entry : hashmap.entrySet()) {
				if (entry.getValue() >= low && entry.getValue() <= high) {
					set.add(new Item(entry.getKey(), entry.getValue()));
				}
			}
		}

		return set;
	}
}

public class Solution {
	// NOTE: Use this path to create the UDS Server socket
	static String SERVER_SOCKET_PATH = "./socket";
	static int BUFFER_SIZE = 4;

	public static void main(String[] args) throws IOException {
		final File socketFile = new File(SERVER_SOCKET_PATH);

		final Store store = new Store();
		final ExecutorService executor = Executors.newFixedThreadPool(8);
		try (AFUNIXServerSocket server = AFUNIXServerSocket.newInstance()) {
			server.bind(new AFUNIXSocketAddress(socketFile));
			System.out.println("server: " + server);
			while (!Thread.interrupted()) {
				System.out.println("Waiting for connection...");
				final Socket sock = server.accept();
				executor.execute(new ProcessRunnable(sock, store));
			}
		}
	}
}