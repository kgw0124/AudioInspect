function StandMetaData(file) {
	var form = new FormData();
	var inputFileList = file;
	for (var i = 0; i < inputFileList.length; i++) {
		form.append('uploadFile', inputFileList[i]);
	}
	//정상적으로 form에 저장되었는지 확인
	//for (var key of form.values()) {
	//   console.log(key);
	//}

	$.ajax({
		method: "POST",
		url: '/fileUploadServlet; charset=utf-8',
		dataType: 'text',
		data: form,
		contentType: false,
		processData: false,
		complete: function(data) {
			dataList = data.responseText.replaceAll("[", "").replaceAll("]", "").split(",")
			xml = dataList[1].split("\n")
			xml.splice(0, 10)
			getStandMetaDataTreeFromXML(xml)
			//standardfilesData.metaData: fileManage.js에서 호출
			standardfilesData.metaData.push(xml)


		},
		error: function(request, status, error) {
			console.log(request.responseText);
			console.log(status.responseText);
			console.log(error.responseText);
			alert("ajax 에러 발생");
			return;
		}
	})
}

function CompMetaData(file) {
	var form = new FormData();
	form.append('uploadFile', file);
	//form.append('uploadFile', file);
	//정상적으로 form에 저장되었는지 확인
	//for (var key of form.keys()) {
	//   console.log(key);
	//}

	$.ajax({
		method: "POST",
		url: '/fileUploadServlet',
		dataType: 'text',
		data: form,
		contentType: false,
		processData: false,
		complete: function(data) {
			dataList = data.responseText.replaceAll("[", "").replaceAll("]", "").split(",")
			xml = dataList[1].split("\n")
			xml.splice(0, 10)
			getCompMetaDataTreeFromXML(dataList[0], xml)
			//comparefilesData.metaData: fileManage.js에서 호출
			var index = comparefilesData.fileName.indexOf(dataList[0])
			comparefilesData.metaData[index] = xml


		},
		error: function(request, status, error) {
			console.log(request.responseText);
			console.log(status.responseText);
			console.log(error.responseText);
			alert("ajax 에러 발생");
			return;
		}
	})
}

function StandMetaDataFromDB(selectedFileId, selectedFileType) {
	$.ajax({
		method: "POST",
		url: '/metaDataFromDBServlet',
		dataType: "text",
		data: {
			fileId: selectedFileId,
			fileType: selectedFileType
		},
		success: function(data) {
			xml = data.split("\n")
			xml.splice(0, 4)
			getStandMetaDataTreeFromXML(xml)
			//standardfilesData.metaData: fileManage.js에서 호출
			standardfilesData.metaData.push(xml)
		},
		error: function(xhr, request, status, error) {
			console.log(xhr)
			console.log(request)
			console.log(status)
			console.log(error)
			alert("ajax 에러 발생");
			return;
		}
	})
}

function CompMetaDataFromDB(beSelectedFileForCompare) {
	for (var i = 0; i < beSelectedFileForCompare.length; i++) {
		$.ajax({
			method: "POST",
			url: '/metaDataFromDBServlet',
			async: false,
			dataType: "text",
			data: {
				fileId: beSelectedFileForCompare[i].fileId,
				fileType: beSelectedFileForCompare[i].fileType
			},
			success: function(data) {
				xml = data.split("\n")
				xml.splice(0, 4)
				getCompMetaDataTreeFromXML(beSelectedFileForCompare[i].fileName, xml)
				//comparefilesData.metaData: fileManage.js에서 호출
				var index = comparefilesData.fileName.indexOf(beSelectedFileForCompare[i].fileName)
				comparefilesData.metaData[index] = xml
			},
			error: function(xhr, request, status, error) {
				console.log(xhr)
				console.log(request)
				console.log(status)
				console.log(error)
				alert("ajax 에러 발생");
				return;
			}
		})
		function trigerclick() {
			$('.tab-link.current').trigger("click")
		}
		setTimeout(trigerclick, 3000)
	}
}

function getStandMetaDataTreeFromXML(xml) {
	var comparemethod = document.querySelector(".compare_button.current").value
	switch (comparemethod) {
		case "XML":
			var standardfile = ""
			var result = ""
			var block_info = []
			var data_info = []
			for (var i = 0; i < xml.length; i++) {
				if (xml[i].includes("block") == true) { //block값들
					if (xml[i].includes("</block>") == true) {
						standardfile = '</details>'
						block_info.pop()
						result = result + standardfile
					} else {
						if ($(xml[i]).attr("name") == "Second pass") { //Second pass 블록 이하의 내용은 출력할 필요 없음
							break
						}
						standardfile = '<details id=standard' + i + ' class= standard' + $(xml[i]).attr('name').replaceAll(" ", "") + ' style="margin-left:' + 4 * block_info.length + '%"><summary class= standard' + $(xml[i]).attr('name').replaceAll(" ", "") + ">" + getBlockIcon(xml[i]) + $(xml[i]).attr('name') + '</summary>'
						block_info.push(i)
						result = result + standardfile
					}
				} else { //data값들
					standardfile = '<tr><td id=standard' + i + ' style="border-left: 2px dashed black; padding-left: 5px;">' + $(xml[i]).attr('name') + " :: " + $(xml[i]).text() + '</td></tr>'
					data_info.push(block_info[block_info.length - 1] + "," + standardfile)
				}
			}
			$('#standardfile').append(result)
			for (var i = 0; i < data_info.length; i++) {
				var data = data_info[i].split(",")
				$("details#standard" + data[0]).append(data[1])
			}
			break
	}
}

function getCompMetaDataTreeFromXML(fileName, xml) {
	var fileName = fileName.replaceAll(" ", "").replaceAll(".", "")
	var comparemethod = document.querySelector(".compare_button.current").value
	switch (comparemethod) {
		case "XML":
			var result = ""
			var block_info = []
			var data_info = []
			for (var i = 0; i < xml.length; i++) {
				if (xml[i].includes("block") == true) { //block값들
					if (xml[i].includes("</block>") == true) {
						comparefile = '</details>'
						block_info.pop()
						result = result + comparefile
					} else {
						if ($(xml[i]).attr("name") == "Second pass") { //Second pass 블록 이하의 내용은 출력할 필요 없음
							break
						}
						comparefile = '<details id=' + fileName + i + ' class= compare' + $(xml[i]).attr('name').replaceAll(" ", "") + ' style="margin-left:' + 4 * block_info.length + '%"><summary class= compare' + $(xml[i]).attr('name').replaceAll(" ", "") + ">" + getBlockIcon(xml[i]) + $(xml[i]).attr('name') + '</summary>'
						block_info.push(i)
						result = result + comparefile
					}
				} else { //data값들
					comparefile = '<tr><td id=compare' + i + ' style="border-left: 2px dashed black; padding-left: 5px;">' + $(xml[i]).attr('name') + " :: " + $(xml[i]).text() + '</td></tr>'
					data_info.push(block_info[block_info.length - 1] + "," + comparefile)
				}
			}
			$("table#" + fileName).append(result)
			for (var i = 0; i < data_info.length; i++) {
				var data = data_info[i].split(",")
				$("details#" + fileName + data[0]).append(data[1])
			}
			break
	}
}

function getBlockIcon(block) {
	blockName = $(block).attr('name')
	if (blockName == "File Type") {
		blockIcon = '<i class="fa-solid fa-file-check"></i>  '
		return blockIcon
	} else if (blockName == "Free space") {
		blockIcon = '<i class="fa-regular fa-cube"></i>  '
		return blockIcon
	} else if (blockName == "File header") {
		blockIcon = '<i class="fa-regular fa-id-card-clip"></i>  '
		return blockIcon
	} else if (blockName == "Data") {
		blockIcon = '<i class="fa-solid fa-database"></i>  '
		return blockIcon
	} else if (blockName == "Header") {
		blockIcon = '<i class="fa-solid fa-tags"></i>  '
		return blockIcon
	} else {
		blockName = blockName.toUpperCase()
		if (blockName.includes("HEADER")) {
			blockIcon = '<i class="fa-solid fa-user"></i>  '
			return blockIcon
		} else if (blockName.includes("DATA")) {
			blockIcon = '<i class="fa-regular fa-block"></i>  '
			return blockIcon
		} else {
			blockIcon = '<i class="fa-solid fa-table"></i>  '
			return blockIcon
		}
	}
}