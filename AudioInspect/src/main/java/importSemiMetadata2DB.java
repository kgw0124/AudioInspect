import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import Util.DB;

public class importSemiMetadata2DB {
	public static void main(String args[]) throws IOException, SAXException, ParserConfigurationException {
		//읽고자 하는 폴더 경로 입력
		String DATA_DIRECTORY = "C:\\DG_Files\\SemiMetaXML\\Edited";
		File dir = new File(DATA_DIRECTORY);

		File files[] = dir.listFiles();
		for (File file : files) {
			readFileContent(file);
		}
	}
	
	public static void readFileContent(File file) throws SAXException, IOException, ParserConfigurationException{
		System.out.println("file : " + file);
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(file);

		//root 구하기
		Element root = doc.getDocumentElement();
		
		//파일명 구하기
		Node media = root.getElementsByTagName("media").item(0);
		int index1 = ((Element)media).getAttribute("ref").lastIndexOf("\\");
		String fileName = ((Element)media).getAttribute("ref").substring(index1+1);
		int index2 = fileName.lastIndexOf(".");
		fileName = fileName.substring(0, index2);
		System.out.println(fileName);
		
		//DB 연결 (meta_data_id값 가져오기)
		/*
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String queryForOriginal = "";
		String queryForEdited = "";
		try {
			conn = DB.getConnection();
			pstmt = conn.prepareStatement(query);
			rs = pstmt.executeQuery();
		} catch(SQLException e1) {
			e1.printStackTrace();
		}
		*/
		
		//track 구하기
		NodeList track = doc.getElementsByTagName("track");
		Node general = track.item(0);
		Node audio = track.item(1);
		general(general);
		audio(audio);
	}
	
	public static void general(Node general) {
		NodeList childeren = general.getChildNodes(); // 자식 노드 목록 get
		for(int i = 0; i < childeren.getLength(); i++){
			Node node = childeren.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE){ // 해당 노드의 종류 판정(Element일 때)
				Element ele = (Element)node;
				String nodeName = ele.getNodeName();
				System.out.println("node name: " + nodeName);
			}
		}
	}
	
	public static void audio(Node audio) {
		NodeList childeren = audio.getChildNodes(); // 자식 노드 목록 get
		for(int i = 0; i < childeren.getLength(); i++){
			Node node = childeren.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE){ // 해당 노드의 종류 판정(Element일 때)
				Element ele = (Element)node;
				String nodeName = ele.getNodeName();
				System.out.println("node name: " + nodeName);
			}
		}
	}
}
