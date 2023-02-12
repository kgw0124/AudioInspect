package Model;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class MetaDataParser {
	public String getMetaData2XML(String file_name, String fileType, ArrayList<ArrayList<String>> MetaData) throws ParserConfigurationException, IOException, TransformerException {
		//System.out.println("MetaDataParser - getMetaData2XML : " + MetaData);
		
		// XML 문서 생성
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = factory.newDocumentBuilder();
		Document document = documentBuilder.newDocument();
		document.setXmlStandalone(true);
		
		// 최상위 root 생성
		Element root = document.createElement("Root");
		document.appendChild(root);
		
		// MediaTrace 생성		
		Element MediaTrace = document.createElement("MediaTrace");
		MediaTrace.setAttribute("xmlns", "https://mediaarea.net/mediatrace");
		MediaTrace.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
		MediaTrace.setAttribute("xsi:schemaLocation", "https://mediaarea.net/mediatrace https://mediaarea.net/mediatrace/mediatrace_0_1.xsd");
		MediaTrace.setAttribute("version", "0.1");
		root.appendChild(MediaTrace);
		
		// creatingLibrary 생성
		Element creatingLibrary = document.createElement("creatingLibrary");
		creatingLibrary.setAttribute("version", "21.03");
		creatingLibrary.setAttribute("url", "https://mediaarea.net/MediaInfo");
		creatingLibrary.setTextContent("MediaInfoLib");
		MediaTrace.appendChild(creatingLibrary);
		
		// media 생성
		Element media = document.createElement("media");
		media.setAttribute("filename", file_name);
		media.setAttribute("parser", fileType);
		MediaTrace.appendChild(media);
		
		HashMap<String, Element> metaDataIsBlock = new HashMap<String, Element>();
		MetaData.forEach((i) -> {
			String metaDepthId = i.get(0);
			String is_block = i.get(1);
			String offset = i.get(2);
			String name = i.get(3);
			String size = i.get(4);
			String info = i.get(5);
			String info2 = i.get(6);
			String info3 = i.get(7);
			String info4 = i.get(8);
			String value = i.get(9);
			switch(is_block) {
			case "1": // Block
				Element Block = document.createElement("block");
				if (offset != "" && offset != null && !offset.isEmpty()) {
					Block.setAttribute("offset", offset);
				}
				if (name != "" && name != null && !name.isEmpty()) {
					Block.setAttribute("name", name);
				}
				if (size != "" && size != null && !size.isEmpty()) {
					Block.setAttribute("size", size);
				}
				if (info != "" && info != null && !info.isEmpty()) {
					Block.setAttribute("info", info);
				}
				if (info2 != "" && info2 != null && !info2.isEmpty()) {
					Block.setAttribute("info2", info2);
				}
				if (info3 != "" && info3 != null && !info3.isEmpty()) {
					Block.setAttribute("info3", info3);
				}
				if (info4 != "" && info4 != null && !info4.isEmpty()) {
					Block.setAttribute("info4", info4);
				}
				metaDataIsBlock.put(metaDepthId, Block);
				switch(metaDepthId.split("/").length) {
				case 1: // depth가 1인 Block
					media.appendChild(metaDataIsBlock.get(metaDepthId));
					break;
				default:
					Integer index = metaDepthId.replaceAll("/$", "").lastIndexOf("/");
					String previousMetaDepthId = metaDepthId.replaceAll("/$", "").substring(0, index+1);
					metaDataIsBlock.get(previousMetaDepthId).appendChild(Block);
					break;
				}
				break;
			case "0": //Data
				Element Data = document.createElement("data");
				if (offset != "" && offset != null && !offset.isEmpty()) {
					Data.setAttribute("offset", offset);
				}
				if (name != "" && name != null && !name.isEmpty()) {
					Data.setAttribute("name", name);
				}
				if (size != "" && size != null && !size.isEmpty()) {
					Data.setAttribute("size", size);
				}
				if (info != "" && info != null && !info.isEmpty()) {
					Data.setAttribute("info", info);
				}
				if (info2 != "" && info2 != null && !info2.isEmpty()) {
					Data.setAttribute("info2", info2);
				}
				if (info3 != "" && info3 != null && !info3.isEmpty()) {
					Data.setAttribute("info3", info3);
				}
				if (info4 != "" && info4 != null && !info4.isEmpty()) {
					Data.setAttribute("info4", info4);
				}
				if (value != "" && value != null && !value.isEmpty()) {
					Data.setTextContent(value);
				}
				Integer index = metaDepthId.replaceAll("/$", "").lastIndexOf("/");
				String previousMetaDepthId = metaDepthId.replaceAll("/$", "").substring(0, index+1);
				metaDataIsBlock.get(previousMetaDepthId).appendChild(Data);
				break;
			}
		});
		
		// XML 문자열로 변환
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		DOMSource source = new DOMSource(document);
		StreamResult result = new StreamResult(out);
		TransformerFactory transFactory = TransformerFactory.newInstance();
		Transformer transformer = transFactory.newTransformer();

		// 출력 시 문자코드: UTF-8
		transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		// 들여 쓰기 있음
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.transform(source, result);
		
		String MetaData2XML = new String(out.toByteArray(), StandardCharsets.UTF_8);
		return MetaData2XML;
	}
}
