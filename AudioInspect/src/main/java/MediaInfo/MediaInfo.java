package MediaInfo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class MediaInfo {
	static final String MediaInfoPath = "C://MediaInfo_CLI_21.03_Windows_x64//MediaInfo.exe ";
	static final String MediaInfoOption = "--Details=10 --Output=XML ";

	public static String getXMLString(String filePath) {
		String xml = "";
		String line = new String();
		try {
			Runtime rt = Runtime.getRuntime();
			Process proc = rt.exec(MediaInfoPath + MediaInfoOption + "\"" + filePath + "\"");

			InputStream is = proc.getInputStream();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);

			// String response = new String();

			while ((line = br.readLine()) != null) {
				xml = xml + line + "\n";
			}

		} catch (IOException e) {
			e.printStackTrace();

		}
		xml = xml.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
		xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n" + "<Root>\n" + xml + "</Root>";
		
		//System.out.println("시작");
		//System.out.println(xml);

		return xml;
	}
}
