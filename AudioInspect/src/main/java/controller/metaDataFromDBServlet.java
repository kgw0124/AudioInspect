package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;

import DAO.MetaDataDAO;

public class metaDataFromDBServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fileId = request.getParameter("fileId");
		String fileType = request.getParameter("fileType");
		try {
			PrintWriter out = response.getWriter();
			//System.out.println(MetaDataDAO.getMetaDataID(fileId, fileType));
			out.print(MetaDataDAO.getMetaDataID(fileId, fileType));
			out.flush();
		} catch (ParserConfigurationException | IOException | TransformerException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
