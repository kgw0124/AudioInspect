package Util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {
	private static String dburl = "jdbc:mysql://localhost:3306/audioinspect?serverTimezone=Asia/Seoul";
	private static String dbUser = "root";
	private static String dbpasswd = "1234";
	private static Connection conn;

	public static Connection getConnection() {
		ConnectDB();
		return conn;
	}

	public static void ConnectDB() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			//System.out.println(dburl + " " + dbUser + " " + " " + dbpasswd);
			conn = DriverManager.getConnection(dburl, dbUser, dbpasswd);
			System.out.println("DB연결 성공");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void closeDB() {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
