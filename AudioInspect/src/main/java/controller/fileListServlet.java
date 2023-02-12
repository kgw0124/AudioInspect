package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import DAO.fileListDAO;

public class fileListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

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

}
