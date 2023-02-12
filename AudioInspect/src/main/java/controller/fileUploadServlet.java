package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import MediaInfo.MediaInfo;

@MultipartConfig
public class fileUploadServlet extends HttpServlet {
	public static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)	throws ServletException, IOException {
		response.setContentType("text/html; charset=utf-8");

		// String msg="파일 업로드 중 정의되지 않은 오류가 발생했습니다. 관리자에게 문의 바랍니다.";
		String savefilePath = "C:\\AudioInspect";
		PrintWriter out = response.getWriter();
		try {
			File fileSaveDir = new File(savefilePath);
			if (!fileSaveDir.exists()) {
				fileSaveDir.mkdir();
			}

			for (Part part : request.getParts()) {
				String fileName = extractFileName(part);
				part.write(savefilePath + File.separator + fileName);

				response.setContentType("text/html");
				List <String> result = new ArrayList<>();
				result.add(fileName);
				result.add(MediaInfo.getXMLString("C:\\AudioInspect\\"+fileName));
				//String result=MediaInfo.getXMLString("C:\\AudioInspect\\"+fileName);
				//System.out.println(result);
				out.print(result);
				out.flush();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}

	private String extractFileName(Part part) {
		for (String cd : part.getHeader("content-disposition").split(";")) {
			if (cd.trim().startsWith("filename")) {
				String fileName = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
				return fileName.substring(fileName.lastIndexOf('/') + 1).substring(fileName.lastIndexOf('\\') + 1);
			}
		}
		return null;
	}
}