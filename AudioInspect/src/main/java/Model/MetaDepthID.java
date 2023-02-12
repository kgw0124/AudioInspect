package Model;

import java.util.ArrayList;

public class MetaDepthID {
	ArrayList<String> meta_depth1_id = new ArrayList<String>();
	ArrayList<String> meta_depth2_id = new ArrayList<String>();
	ArrayList<String> meta_depth3_id = new ArrayList<String>();
	ArrayList<String> meta_depth4_id = new ArrayList<String>();
	ArrayList<String> meta_depth5_id = new ArrayList<String>();
	ArrayList<String> meta_depth6_id = new ArrayList<String>();
	ArrayList<String> meta_depth7_id = new ArrayList<String>();
	ArrayList<String> meta_depth8_id = new ArrayList<String>();
	ArrayList<String> meta_depth9_id = new ArrayList<String>();
	ArrayList<String> meta_depth10_id = new ArrayList<String>();
	ArrayList<String> meta_depth11_id = new ArrayList<String>();
	ArrayList<String> meta_depth12_id = new ArrayList<String>();
	ArrayList<String> meta_depth13_id = new ArrayList<String>();
	ArrayList<String> meta_depth14_id = new ArrayList<String>();
	
	public void setMetaDepthId(Integer depth, String id) {
		switch(depth) {
		case 1:
			this.meta_depth1_id.add(id);
			break;
		case 2:
			this.meta_depth2_id.add(id);
			break;
		case 3:
			this.meta_depth3_id.add(id);
			break;
		case 4:
			this.meta_depth4_id.add(id);
			break;
		case 5:
			this.meta_depth5_id.add(id);
			break;
		case 6:
			this.meta_depth6_id.add(id);
			break;
		case 7:
			this.meta_depth7_id.add(id);
			break;
		case 8:
			this.meta_depth8_id.add(id);
			break;
		case 9:
			this.meta_depth9_id.add(id);
			break;
		case 10:
			this.meta_depth10_id.add(id);
			break;
		case 11:
			this.meta_depth11_id.add(id);
			break;
		case 12:
			this.meta_depth12_id.add(id);
			break;
		case 13:
			this.meta_depth13_id.add(id);
			break;
		case 14:
			this.meta_depth14_id.add(id);
			break;		
		}
	}
	
	public String getQueryByMetaDepth(String fileType, Integer depth, Integer meta_data_id) {
		String query = "";
		switch(depth) {
		case 1:
			query += "where meta_data_id =" + meta_data_id;
			break;
		case 2:
			for(int i = 0; i<meta_depth1_id.size() ; i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and " + fileType + "_meta_depth1_id =" + meta_depth1_id.get(i).replace("/", "");
				} else {
					query += " or meta_data_id =" + meta_data_id + " and " + fileType + "_meta_depth1_id =" + meta_depth1_id.get(i).replace("/", "");
				}
			}
			break;
		case 3:
			for (int i = 0; i < meta_depth2_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth2_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 4:
			for (int i = 0; i < meta_depth3_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth3_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 5:
			for (int i = 0; i < meta_depth4_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth4_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 6:
			for (int i = 0; i < meta_depth5_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth5_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 7:
			for (int i = 0; i < meta_depth6_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth6_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 8:
			for (int i = 0; i < meta_depth7_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth7_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 9:
			for (int i = 0; i < meta_depth8_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth8_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 10:
			for (int i = 0; i < meta_depth9_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth9_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 11:
			for (int i = 0; i < meta_depth10_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth10_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 12:
			for (int i = 0; i < meta_depth11_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth11_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 13:
			for (int i = 0; i < meta_depth12_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth12_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}
			break;
		case 14:
			for (int i = 0; i < meta_depth13_id.size(); i++) {
				if (i == 0) {
					query += "where meta_data_id =" + meta_data_id + " and ";
				} else {
					query += " or meta_data_id =" + meta_data_id + " and ";
				}
				String[] array = meta_depth13_id.get(i).split("/");
				for (int j = 0; j < array.length; j++) {
					if (j != array.length - 1) {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j] + " and ";
					} else {
						query += fileType + "_meta_depth" + Integer.toString(j + 1) + "_id =" + array[j];
					}
				}
			}			
			break;	
		}
		
		if(query.trim().equals(""))
			query = "empty";
		return query;
	}
	
	public void printMetaDepthId() {
		System.out.println("Depth1: " + meta_depth1_id);
		System.out.println("Depth2: " + meta_depth2_id);
		System.out.println("Depth3: " + meta_depth3_id);
		System.out.println("Depth4: " + meta_depth4_id);
		System.out.println("Depth5: " + meta_depth5_id);
		System.out.println("Depth6: " + meta_depth6_id);
		System.out.println("Depth7: " + meta_depth7_id);
		System.out.println("Depth8: " + meta_depth8_id);
		System.out.println("Depth9: " + meta_depth9_id);
		System.out.println("Depth10: " + meta_depth10_id);
		System.out.println("Depth11: " + meta_depth11_id);
		System.out.println("Depth12: " + meta_depth12_id);
		System.out.println("Depth13: " + meta_depth13_id);
		System.out.println("Depth14: " + meta_depth14_id);
	}
}
