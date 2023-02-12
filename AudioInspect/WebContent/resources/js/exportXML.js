function exportReportToXML() {
	var comparemethod = document.querySelector(".compare_button.current").value;
	if (comparemethod == "XML") {
		//standardfile의 xml 추출
		let element = document.createElement('a');
		var standardfile = standardfilesData.metaData[0]
		standardfile.unshift('<media fileName = "' + standardfilesData.fileName[0] + '">')
		standardfile.unshift('<?xml version="1.0" encoding="UTF-8"?>')
		var indexForRemove = []
		for(var i=0;i<standardfile.length;i++){
			if(standardfile[i].includes("</MediaTrace>")){
				indexForRemove.push(i)
			}else if(standardfile[i].includes("</Root>")){
				indexForRemove.push(i)
			}
		}
		for(var i=0;i<indexForRemove.length;i++){
			delete standardfile[indexForRemove[i]]
		}
		standardfile = standardfile.join().replaceAll(',','\n')
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(standardfile));
		element.setAttribute('download', 'audiofile.xml');
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		
		//비교결과의 xml 추출
		var resultline = $(".compareresult");
		if (resultline.length != 0) {
			var xml3 = '<?xml version="1.0" encoding="UTF-8"?>';
			xml3 += "\n";
			xml3 += '<root>'
			xml3 += "\n";

			var cnt = 0;
			var arr = [];
			var arr2 = [];
			var arr3 = [];
			var arr4 = [];
			for (var i = 0; i < resultline.length; i++) {
				attribute = $(".compareresult")[i].innerHTML;
				attribute2 = attribute.substr(0, attribute.indexOf("<br>"));
				attribute_name = $(".compareresult")[i].firstChild.data;
				attribute_name_1 = attribute_name.substr(0, attribute_name.indexOf("]"));
				attribute_name_1 = attribute_name_1.replace("[", "").replace(" ", "");
				//attribute_name_2 = attribute.substr(0, attribute.indexOf("<br>"));
				attribute_name_2 = attribute2.substr(attribute2.indexOf("]"));
				attribute_name_2 = attribute_name_2.replace("]", "")
				attribute_name_2 = attribute_name_2.replaceAll("<b>", "").replaceAll("</b>", "");

				var standardfile_value = $(".compareresult")[i].childNodes[2].data;
				var comparefile_value = $(".compareresult")[i].lastChild.data;
				if (standardfile_value.includes("::")) {
					var standardfile_name = standardfile_value.substr(0, standardfile_value.indexOf("::"));
					standardfile_name = standardfile_name.replace("(", "").replace(" ", "").replace(")", "");
					var standardfile_value_2 = standardfile_value.substr(standardfile_value.indexOf("::"));
					standardfile_value_2 = standardfile_value_2.replace(":: ", "").replace(" ", "");
					var comparefile_name = comparefile_value.substr(0, comparefile_value.indexOf("::"));
					comparefile_name = comparefile_name.replace("(", "").replace(" ", "").replace(")", "");
					var comparefile_value_2 = comparefile_value.substr(comparefile_value.indexOf("::"));
					comparefile_value_2 = comparefile_value_2.replace(":: ", "").replace(" ", "");
				}
				else {
					var standardfile_name = standardfile_value.substr(0, standardfile_value.indexOf(")"));
					standardfile_name = standardfile_name.replace("(", "").replace(")", "");
					standardfile_value_2 = standardfile_value.substr(standardfile_value.indexOf(")"));
					standardfile_value_2 = standardfile_value_2.replace(")", "").replace(" ", "").replace("존재 O ", "존재O").replace("존재 X ", "존재X");
					var comparefile_name = comparefile_value.substr(0, comparefile_value.indexOf(")"));
					comparefile_name = comparefile_name.replace("(", "").replace(")", "");
					comparefile_value_2 = comparefile_value.substr(comparefile_value.indexOf(")"));
					comparefile_value_2 = comparefile_value_2.replace(")", "").replace(" ", "").replace("존재 O", "존재O").replace("존재 X", "존재X")
				}
				if (attribute_name_1 == "BLOCK_MISSING") {
					arr[i] = [attribute_name_1, attribute_name_2, standardfile_name, standardfile_value_2, comparefile_name, comparefile_value_2];
				}
				else if (attribute_name_1 == "BLOCK_LOCATION_MISMATCHING") {
					arr2[i - arr.length] = [attribute_name_1, attribute_name_2, standardfile_name, standardfile_value_2, comparefile_name, comparefile_value_2];
				}
				else if (attribute_name_1 == "DATA_MISSING") {
					arr3[i - (arr.length + arr2.length)] = [attribute_name_1, attribute_name_2, standardfile_name, standardfile_value_2, comparefile_name, comparefile_value_2];

				}
				else if (attribute_name_1 == "DATA_VALUE_MISMATCHING") {
					arr4[i - (arr.length + arr2.length + arr3.length)] = [attribute_name_1, attribute_name_2, standardfile_name, standardfile_value_2, comparefile_name, comparefile_value_2];
				}
			}
			if (arr.length != 0) {
				var blockMissing = "";
				blockMissing = '   <BLOCK_MISSING>'
				blockMissing += ("\n");
				for (var i = 0; i < arr.length; i++) {
					blockMissing += '      <block name ="' + arr[i][1] + '">'
					blockMissing += ("\n");
					blockMissing += '         <standardfile name ="' + arr[i][2] + '">'
					blockMissing += arr[i][3];
					blockMissing += '</standardfile>'
					blockMissing += ("\n");
					blockMissing += '         <comparefile name ="' + arr[i][4] + '">'
					blockMissing += arr[i][5];
					blockMissing += '</comparefile>'
					blockMissing += ("\n");
					blockMissing += '      </block>'
					blockMissing += ("\n");
				}
				blockMissing += '   </BLOCK_MISSING>'
				blockMissing += ("\n");
				xml3 += blockMissing;
			}
			if (arr2.length != 0) {
				var blockLocationMismatching = "";
				blockLocationMismatching += '   <BLOCK_LOCATION_MISMATCHING>'
				blockLocationMismatching += ("\n");
				for (var i = 0; i < arr2.length; i++) {
					blockLocationMismatching += '      <block name ="' + arr2[i][1] + '">'
					blockLocationMismatching += ("\n");
					blockLocationMismatching += '         <standardfile name ="' + arr2[i][2] + '">'
					blockLocationMismatching += arr2[i][3];
					blockLocationMismatching += '</standardfile>'
					blockLocationMismatching += ("\n");
					blockLocationMismatching += '         <comparefile name ="' + arr2[i][4] + '">'
					blockLocationMismatching += arr2[i][5];
					blockLocationMismatching += '</comparefile>'
					blockLocationMismatching += ("\n");
					blockLocationMismatching += '      </block>'
					blockLocationMismatching += ("\n");
				}
				blockLocationMismatching += '   </BLOCK_LOCATION_MISMATCHING>'
				blockLocationMismatching += ("\n");
				xml3 += blockLocationMismatching;
			}
			if (arr3.length != 0) {
				var dataMissing = "";
				dataMissing += '   <DATA_MISSING>'
				dataMissing += ("\n");
				for (var i = 0; i < arr3.length; i++) {
					dataMissing += '      <block name ="' + arr3[i][1] + '">'
					dataMissing += ("\n");
					dataMissing += '         <standardfile name ="' + arr3[i][2] + '">'
					dataMissing += arr3[i][3];
					dataMissing += '</standardfile>'
					dataMissing += ("\n");
					dataMissing += '         <comparefile name ="' + arr3[i][4] + '">'
					dataMissing += arr3[i][5];
					dataMissing += '</comparefile>'
					dataMissing += ("\n");
					dataMissing += '      </block>'
					dataMissing += ("\n");
				}
				dataMissing += '   </DATA_MISSING>'
				dataMissing += ("\n");
				xml3 += dataMissing;
			}
			if (arr4.length != 0) {
				var dataValueMismatching = "";
				dataValueMismatching += '   <DATA_VALUE_MISMATCHING>'
				dataValueMismatching += ("\n");
				for (var i = 0; i < arr4.length; i++) {
					dataValueMismatching += '      <block name ="' + arr4[i][1] + '">'
					dataValueMismatching += ("\n");
					dataValueMismatching += '         <standardfile name ="' + arr4[i][2] + '">'
					dataValueMismatching += arr4[i][3];
					dataValueMismatching += '</standardfile>'
					dataValueMismatching += ("\n");
					dataValueMismatching += '         <comparefile name ="' + arr4[i][4] + '">'
					dataValueMismatching += arr4[i][5];
					dataValueMismatching += '</comparefile>'
					dataValueMismatching += ("\n");
					dataValueMismatching += '      </block>'
					dataValueMismatching += ("\n");
				}
				dataValueMismatching += '   </DATA_VALUE_MISMATCHING>'
				dataValueMismatching += ("\n");
				xml3 += dataValueMismatching;
			}

			//xml3 += "\n";
			xml3 += '</root>'
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml3));
			element.setAttribute('download', 'total_result.xml');
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}

	}
	else if (comparemethod == "TEXT") {
		alert("XML 포맷 저장은 TEXT 형식에서 지원하지 않습니다.")
	}
	else if (comparemethod == "TREE") {
		alert("XML 포맷 저장은 TREE 형식에서 지원하지 않습니다.")
	}
}



//comparefile의 xml 추출
function exportReportXMlCompare(comparefile, comparefile_name) {
	var comparemethod = document.querySelector(".compare_button.current").value;
	if (comparemethod == "XML") {
		let element = document.createElement('a');
		var index = comparefilesData.fileName.indexOf(comparefile_name)
		var comparefile = comparefilesData.metaData[index]
		comparefile.unshift('<media fileName = "' + comparefile_name + '">')
		comparefile.unshift('<?xml version="1.0" encoding="UTF-8"?>')
		var indexForRemove = []
		for(var i=0;i<comparefile.length;i++){
			if(comparefile[i].includes("</MediaTrace>")){
				indexForRemove.push(i)
			}else if(comparefile[i].includes("</Root>")){
				indexForRemove.push(i)
			}
		}
		for(var i=0;i<indexForRemove.length;i++){
			delete comparefile[indexForRemove[i]]
		}
		comparefile = comparefile.join().replaceAll(',','\n')
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(comparefile));
		element.setAttribute('download', 'compareAudiofile.xml');
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}