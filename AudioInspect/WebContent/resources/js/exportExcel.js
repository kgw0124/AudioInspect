function exportReportToExcel() {
	var comparemethod = document.querySelector(".compare_button.current").value;
	if (comparemethod == "XML") {
		exportReportToExcel_XML();
	}
	else if (comparemethod == "TREE") {
		exportReportToExcel_TREE();
	}
	else if (comparemethod == "TEXT") {
		exportReportToExcel_TEXT();

	}
}

function exportReportToExcel_XML() {
	// workbook 생성
	var wb = XLSX.utils.book_new();

	// sheet명 생성
	wb.SheetNames.push("total_result");

	var arr = [];
	var summary = $("#summary")[0].innerText;
	var total = $(".compareresult");
	console.log(total)

	var attribute_name = ""
	var standardfile_value_2 = ""
	var attribute_name_1 = ""
	var attribute_name_2 = ""
	var data_block = ""
	var standardfile_value = ""
	var comparefile_value = ""
	var a = "불일치 원인"
	var b = "불일치 속성"
	var c = "Standard File"
	var d = "Compare File"
	if (total.length == 0) {
		arr[0] = ({ "비교 결과": summary });
	}
	for (var i = 0; i < total.length; i++) {
		attribute_name = $(".compareresult")[i].firstChild.data;
		attribute = $(".compareresult")[i].innerHTML;
		attribute2 = attribute.substr(attribute.indexOf("<br>"));
		attribute2 = attribute2.replace("<br", "");
		standardfile_value = attribute2.substr(0, attribute2.indexOf('<i class="fa-sharp fa-solid fa-not-equal"></i>'));
		comparefile_value = attribute2.substr(attribute2.indexOf('<i class="fa-sharp fa-solid fa-not-equal"></i>'));
		standardfile_value = standardfile_value.replace("(", "");
		attribute_name_1 = attribute_name.substr(0, attribute_name.indexOf("]"));
		attribute_name_1 = attribute_name_1.replace("[", "");
		attribute_name_2 = attribute.substr(0, attribute.indexOf("<br>"));
		attribute_name_2 = attribute_name_2.substr(attribute_name_2.indexOf("]"));
		attribute_name_2 = attribute_name_2.replaceAll("<b>", "").replaceAll("</b>", "")

		if (standardfile_value.includes("::")) {
			var standardfile_name = standardfile_value.substr(0, standardfile_value.indexOf("::"));
			standardfile_value_2 = standardfile_value.substr(standardfile_value.indexOf("::"));
			standardfile_value_2 = standardfile_value_2.replace(":: ", "");
			var comparefile_name = comparefile_value.substr(0, comparefile_value.indexOf("::"));
			comparefile_value_2 = comparefile_value.substr(comparefile_value.indexOf("::"));
			comparefile_value_2 = comparefile_value_2.replace(":: ", "");
		}
		else {
			var standardfile_name = standardfile_value.substr(0, standardfile_value.indexOf(")"));
			standardfile_value_2 = standardfile_value.substr(standardfile_value.indexOf(")"));
			standardfile_value_2 = standardfile_value_2.replace(") ", "");
			var comparefile_name = comparefile_value.substr(0, comparefile_value.indexOf(")"));
			comparefile_value_2 = comparefile_value.substr(comparefile_value.indexOf(")"));
			comparefile_value_2 = comparefile_value_2.replace(") ", "");
		}
		for (var j = 0; j < attribute_name_1.length; j++) {
			data_block = attribute_name_1
			attribute_name_2 = attribute_name_2.replace("]", "");
			var attribute_name2 = attribute_name_2
		}
		for (var j = 0; j < standardfile_value.length; j++) {
			standardfile_value_2
			comparefile_value_2;
		}
		summary1 = summary.substr(0, summary.indexOf("와"));
		summary1 = "Standard file = " + summary1;
		summary2 = summary.substr(0, summary.indexOf("는"));
		summary2 = summary2.substr(summary2.indexOf("와"));
		summary2 = summary2.replace("와", "Comparefile = ");
		summary3 = summary.substr(summary.indexOf("는"));
		summary3 = summary3.replace("는", "두 파일은");

		arr[0] = ({ "비교 결과": summary1 });
		arr[1] = ({ "비교 결과": summary2 });
		arr[2] = ({ "비교 결과": summary3 });
		arr[3] = ({});
		arr[4] = ({ "비교 결과": a, "": b, " ": c, "  ": d });
		arr[i + 5] = ({ "비교 결과": data_block, "": attribute_name2, " ": standardfile_value_2, "  ": comparefile_value_2 });

	}


	var ws = XLSX.utils.json_to_sheet(arr);


	ws['!cols'] = []
	ws['!cols'][0] = { width: 60 }
	ws['!cols'][1] = { width: 70 }
	ws['!cols'][2] = { width: 20 }
	ws['!cols'][3] = { width: 20 }


	wb.Sheets["total_result"] = ws;


	// 엑셀 파일 쓰기
	var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	var date = new Date();

	// 파일 다운로드
	saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Result_"' + date.toLocaleString() + '"' + '.xlsx');
}

function exportReportToExcel_TEXT() {
	// workbook 생성
	var wb = XLSX.utils.book_new();

	// sheet명 생성
	wb.SheetNames.push("Standard file");
	wb.SheetNames.push("Compare file");
	wb.SheetNames.push("total_result");

	var arr = [];
	var arr2 = [];
	var arr3 = [];

	for (var i = 0; i < $(".standard_text").length; i++) {
		var standard_result = $(".standard_text").children()[i].innerHTML;
		var st_result = standard_result.split(":")
		for (var j = 0; j < st_result.length; j++) {
			var attribute_name = st_result[0]
			var attribute_value = st_result[1]
		}
		arr[i] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}
	var compare = $(".comparefile.current")[0].firstElementChild.childNodes
	for (var i = 0; i < compare.length; i++) {
		var compare_result = compare[i].innerText;
		var com_result = compare_result.split(":")
		for (var j = 0; j < com_result.length; j++) {
			var attribute_name = com_result[0]
			var attribute_value = com_result[1]
		}
		arr2[i] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}


	var summary = $("#summary")[0].innerText
	var total = $(".compareresult");
	console.log(total)

	var attribute_name = ""
	var attribute_value = ""
	var attribute_value_1 = ""
	var standardfile_value_2 = ""
	var attribute_name_1 = ""
	var attribute_name_2 = ""
	var data_block = ""
	var attribute_value_2 = ""
	var standardfile_value = ""
	var comparefile_value = ""
	var attribute_name2 = ""
	var a = "불일치 원인"
	var b = "불일치 속성"
	var c = "Standard File"
	var d = "Compare File"
	if (total.length == 0) {
		arr3[0] = ({ "비교 결과": summary });
	}
	else {
		for (var i = 0; i < total.length; i++) {
			attribute_name = $(".compareresult")[i].firstChild.data;
			attribute_value_1 = $(".compareresult")[i].childNodes[2].data;
			attribute_value_2 = $(".compareresult")[i].lastChild.data;
			attribute_name_1 = attribute_name.substr(0, attribute_name.indexOf("]"));
			attribute_name_1 = attribute_name_1.replace("[", "");
			attribute_name_2 = attribute_name.substr(attribute_name.indexOf("]"));
			attribute_name_2 = attribute_name_2.replace("] ", "");
			if (attribute_value_1.includes("::")) {
				standardfile_value_2 = attribute_value_1.substr(attribute_value_1.indexOf("::"));
				standardfile_value_2 = standardfile_value_2.replace(":: ", "");
				comparefile_value_2 = attribute_value_2.substr(attribute_value_2.indexOf("::"));
				comparefile_value_2 = comparefile_value_2.replace(":: ", "");
			}
			else {
				standardfile_value_2 = attribute_value_1.substr(attribute_value_1.indexOf(")"));
				standardfile_value_2 = standardfile_value_2.replace(") ", "");
				comparefile_value_2 = attribute_value_2.substr(attribute_value_2.indexOf(")"));
				comparefile_value_2 = comparefile_value_2.replace(") ", "");
			}
			for (var j = 0; j < attribute_name_1.length; j++) {
				data_block = attribute_name_1
				attribute_name_2 = attribute_name_2.replace("]", "");
				attribute_name2 = attribute_name_2
			}
			for (var j = 0; j < attribute_value_1.length; j++) {
				standardfile_value = standardfile_value_2
				comparefile_value = comparefile_value_2;
			}
			summary1 = summary.substr(0, summary.indexOf("와"));
			summary1 = "Standard file = " + summary1;
			summary2 = summary.substr(0, summary.indexOf("는"));
			summary2 = summary2.substr(summary2.indexOf("와"));
			summary2 = summary2.replace("와", "Comparefile = ");
			summary3 = summary.substr(summary.indexOf("는"));
			summary3 = summary3.replace("는", "두 파일은");

			arr3[0] = ({ "비교 결과": summary1 });
			arr3[1] = ({ "비교 결과": summary2 });
			arr3[2] = ({ "비교 결과": summary3 });
			arr3[3] = ({});
			arr3[4] = ({ "비교 결과": a, "": b, " ": c, "  ": d });
			arr3[i + 5] = ({ "비교 결과": data_block, "": attribute_name2, " ": standardfile_value, "  ": comparefile_value });


		}
	}




	var ws = XLSX.utils.json_to_sheet(arr);
	var ws2 = XLSX.utils.json_to_sheet(arr2);
	var ws3 = XLSX.utils.json_to_sheet(arr3);

	ws['!cols'] = []
	ws['!cols'][0] = { width: 20 }
	ws['!cols'][1] = { width: 40 }
	ws2['!cols'] = []
	ws2['!cols'][0] = { width: 20 }
	ws2['!cols'][1] = { width: 40 }
	ws3['!cols'] = []
	ws3['!cols'][0] = { width: 50 }
	ws3['!cols'][1] = { width: 30 }
	ws3['!cols'][2] = { width: 35 }
	ws3['!cols'][3] = { width: 35 }


	wb.Sheets["Standard file"] = ws;
	wb.Sheets["Compare file"] = ws2;
	wb.Sheets["total_result"] = ws3;

	// 엑셀 파일 쓰기
	var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	var date = new Date();

	// 파일 다운로드
	saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Result_"' + date.toLocaleString() + '"' + '.xlsx');
}

function exportReportToExcel_TREE() {
	// workbook 생성
	var wb = XLSX.utils.book_new();

	// sheet명 생성
	wb.SheetNames.push("Standard file");
	wb.SheetNames.push("Compare file");
	wb.SheetNames.push("total_result");

	var arr = [];
	var arr2 = [];
	var arr3 = [];
	var standard = $("#standardfile")[0].firstElementChild.childNodes
	var standard2 = $("#standardfile")[0].firstElementChild.nextElementSibling.childNodes
	for (var i = 0; i < standard.length; i++) {
		var standard_1 = standard[i].innerHTML;
		standard_1 = standard_1.replace('<i class="fa-regular fa-file"></i>', "").replace("<td>┗  ", "").replace("</td>", "").replace('<td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style=" color:red"=""></i>', "").replace('<i class="fa-regular fa-file-audio"></i>', "").replace("<td>", "")
		var standard_result = standard_1.split(":")
		for (var j = 0; j < standard_result.length; j++) {
			var attribute_name = standard_result[0]
			var attribute_value = standard_result[1]
		}
		arr[i] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}
	for (var i = 0; i < standard2.length; i++) {
		var standard_2 = standard2[i].innerHTML;
		standard_2 = standard_2.replace('<i class="fa-regular fa-file"></i>', "").replace("<td>┗  ", "").replace("</td>", "").replace('<td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style=" color:red"=""></i>', "").replace('<i class="fa-regular fa-file-audio"></i>', "").replace("<td>", "")
		var standard_result2 = standard_2.split(":")
		for (var j = 0; j < standard_result2.length; j++) {
			attribute_name = standard_result2[0]
			attribute_value = standard_result2[1]
		}
		arr[i + standard.length] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}


	var compare = $(".comparefile.current")[0].firstElementChild.childNodes
	var compare2 = $(".comparefile.current")[0].firstElementChild.nextElementSibling.childNodes
	for (var i = 0; i < compare.length; i++) {
		var compare_1 = compare[i].innerHTML;
		compare_1 = compare_1.replace('<i class="fa-regular fa-file"></i>', "").replace("<td>┗  ", "").replace("</td>", "").replace('<td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style=" color:red"=""></i>', "").replace('<i class="fa-regular fa-file-audio"></i>', "").replace("<td>", "")
		var com_result = compare_1.split(":")
		for (var j = 0; j < com_result.length; j++) {
			var attribute_name = com_result[0]
			var attribute_value = com_result[1]
		}
		arr2[i] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}
	for (var i = 0; i < compare2.length; i++) {
		var compare_2 = compare2[i].innerHTML;
		compare_2 = compare_2.replace('<i class="fa-regular fa-file"></i>', "").replace("<td>┗  ", "").replace("</td>", "").replace('<td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style=" color:red"=""></i>', "").replace('<i class="fa-regular fa-file-audio"></i>', "").replace("<td>", "")
		var com_result2 = compare_2.split(":")
		for (var j = 0; j < com_result2.length; j++) {
			attribute_name = com_result2[0]
			attribute_value = com_result2[1]
		}
		arr2[i + compare.length] = ({ "속성 이름": attribute_name, "속성 값": attribute_value });
	}

	var summary = $("#summary")[0].innerText
	var total = $(".compareresult");

	var attribute_name = ""
	var attribute_value = ""
	var attribute_value_1 = ""
	var standardfile_value_2 = ""
	var attribute_name_1 = ""
	var attribute_name_2 = ""
	var data_block = ""
	var attribute_value_2 = ""
	var standardfile_value = ""
	var comparefile_value = ""
	var a = "불일치 원인"
	var b = "불일치 속성"
	var c = "Standard File"
	var d = "Compare File"

	if (total.length == 0) {
		arr3[0] = ({ "비교 결과": summary });
	}
	for (var i = 0; i < total.length; i++) {
		attribute_name = $(".compareresult")[i].firstChild.data;
		attribute_value_1 = $(".compareresult")[i].childNodes[2].data;
		attribute_value_2 = $(".compareresult")[i].lastChild.data;
		attribute_name_1 = attribute_name.substr(0, attribute_name.indexOf("]"));
		attribute_name_1 = attribute_name_1.replace("[", "");
		attribute_name_2 = attribute_name.substr(attribute_name.indexOf("]"));
		attribute_name_2 = attribute_name_2.replace("] ", "");
		if (attribute_value_1.includes("::")) {
			standardfile_value_2 = attribute_value_1.substr(attribute_value_1.indexOf("::"));
			standardfile_value_2 = standardfile_value_2.replace(":: ", "");
			comparefile_value_2 = attribute_value_2.substr(attribute_value_2.indexOf("::"));
			comparefile_value_2 = comparefile_value_2.replace(":: ", "");
		}
		else {
			standardfile_value_2 = attribute_value_1.substr(attribute_value_1.indexOf(")"));
			standardfile_value_2 = standardfile_value_2.replace(") ", "");
			comparefile_value_2 = attribute_value_2.substr(attribute_value_2.indexOf(")"));
			comparefile_value_2 = comparefile_value_2.replace(") ", "");
		}
		for (var j = 0; j < attribute_name_1.length; j++) {
			data_block = attribute_name_1
			attribute_name_2 = attribute_name_2.replace("]", "");
			var attribute_name2 = attribute_name_2
		}
		for (var j = 0; j < attribute_value_1.length; j++) {
			standardfile_value = standardfile_value_2
			comparefile_value = comparefile_value_2;
		}
		summary1 = summary.substr(0, summary.indexOf("와"));
		summary1 = "Standard file = " + summary1;
		summary2 = summary.substr(0, summary.indexOf("는"));
		summary2 = summary2.substr(summary2.indexOf("와"));
		summary2 = summary2.replace("와", "Comparefile = ");
		summary3 = summary.substr(summary.indexOf("는"));
		summary3 = summary3.replace("는", "두 파일은");

		arr3[0] = ({ "비교 결과": summary1 });
		arr3[1] = ({ "비교 결과": summary2 });
		arr3[2] = ({ "비교 결과": summary3 });
		arr3[3] = ({});
		arr3[4] = ({ "비교 결과": a, "": b, " ": c, "  ": d });
		arr3[i + 5] = ({ "비교 결과": data_block, "": attribute_name2, " ": standardfile_value, "  ": comparefile_value_2 });
	}

	var ws = XLSX.utils.json_to_sheet(arr);
	var ws2 = XLSX.utils.json_to_sheet(arr2);
	var ws3 = XLSX.utils.json_to_sheet(arr3);

	ws['!cols'] = []
	ws['!cols'][0] = { width: 20 }
	ws['!cols'][1] = { width: 40 }
	ws2['!cols'] = []
	ws2['!cols'][0] = { width: 20 }
	ws2['!cols'][1] = { width: 40 }
	ws3['!cols'] = []
	ws3['!cols'][0] = { width: 50 }
	ws3['!cols'][1] = { width: 30 }
	ws3['!cols'][2] = { width: 35 }
	ws3['!cols'][3] = { width: 35 }
	wb.Sheets["Standard file"] = ws;
	wb.Sheets["Compare file"] = ws2;
	wb.Sheets["total_result"] = ws3;

	// 엑셀 파일 쓰기
	var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	var date = new Date();
	// 파일 다운로드
	saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Result_"' + date.toLocaleString() + '"' + '.xlsx');
}
function s2ab(s) {
	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	var view = new Uint8Array(buf);  //create uint8array as viewer
	for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	return buf;
}