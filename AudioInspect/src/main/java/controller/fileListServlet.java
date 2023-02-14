package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import DAO.fileListDAO;

public class fileListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] query = request.getParameterValues("sqlQuery[]");
		ArrayList<String> result = new ArrayList<String>();
	    for(int i=0; i<query.length; i++) {
	        try {
				result.addAll(fileListDAO.getFileList(query[i]));
			} catch (SQLException e) {
				e.printStackTrace();
			}
	    }
	    PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();

		/*
		String query = request.getParameter("sqlQuery");
		PrintWriter out = response.getWriter();
		try {
			out.print(fileListDAO.getFileList(query));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		out.flush();
		*/
	}
	
	/*
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String query = request.getParameter("sqlQuery");
		PrintWriter out = response.getWriter();
		try {
			out.print(fileListDAO.getFileList(query));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		out.flush();
	}
	*/
}
