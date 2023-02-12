import MediaInfo.MediaInfo;

public class test {
	public static void main(String args[]) {
		String filePath = "C:\\DG\\Audioinspect_AudioFiles\\Samsung_a\\Galaxy_Golden(SHV-E400S)\\SHV-E400S_4.4.4_normal_edit.m4a";
		String xml = MediaInfo.getXMLString(filePath);
		System.out.println(xml);
	}

}
