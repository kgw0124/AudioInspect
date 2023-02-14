package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;

import Util.DB;

public class fileListDAO {
	public static ArrayList<String> getFileList(String query) throws SQLException {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = DB.getConnection();
			pstmt = conn.prepareStatement(query);
			rs = pstmt.executeQuery();
		} catch(SQLException e1) {
			e1.printStackTrace();
		}
		LinkedHashMap<String, ArrayList<String>> exportData = new LinkedHashMap<String, ArrayList<String>>();
		if (rs != null) {
			try {
				while (rs.next()) {
					String file_name = '"' + rs.getString("file_name") + '"';
					String recording_mode = '"' + rs.getString("recording_mode") + " / " + rs.getString("recording_quality") + '"';
					String file_type = '"' + rs.getString("file_type") + '"';
					String smart_device_model_name = '"' + rs.getString("smart_device_model_name") + '"';
					String smart_device_model_number = '"' + rs.getString("smart_device_model_number") + '"';
					String os_name = '"' + rs.getString("os_name") + " " + rs.getString("os_version") + '"';
					String file_id;
					String editing_app_name;
					try {
						file_id = '"' + Integer.toString(rs.getInt("edited_speech_file_id")) + '"';
						editing_app_name = '"' + rs.getString("editing_app_name") + '"';
					} catch (Exception e) {
						file_id = '"' + "원본" + Integer.toString(rs.getInt("original_speech_file_id")) + '"';
						editing_app_name = '"' + "원본" + '"';
					}
	
					ArrayList<String> values = new ArrayList<String>();
					// Modal창의 검색 결과 테이블에서 보여질 속성 순서대로 담는다.
					values.add(file_name);
					values.add(file_type);
					values.add(smart_device_model_name);
					values.add(smart_device_model_number);
					values.add(os_name);
					values.add(recording_mode);
					values.add(editing_app_name);
					exportData.put(file_id, values);
				}
			} catch(SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					if (rs != null)
						rs.close();
					if (pstmt != null)
						pstmt.close();
					if (conn != null)
						conn.close();
				} catch(SQLException se) {
					se.printStackTrace();
				}
			}
		}
		ArrayList<String> exportData2Array = new ArrayList<String>();
		Iterator<String> it = exportData.keySet().iterator();
		while(it.hasNext()){
			String key = (String) it.next();
			exportData2Array.add(key + ":" + exportData.get(key));
		}
		return exportData2Array;
	}
}
