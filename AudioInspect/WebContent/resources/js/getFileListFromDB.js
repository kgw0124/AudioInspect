function getFileListFromDB(query) {
	$.ajax({
		method: "POST",
		url: '/fileListServlet; charset=utf-8',
		dataType: 'text',
		data: {
			sqlQuery: query
		},
		complete: function(data) {
			makeFileListFromDB(JSON.parse(data.responseText.replace("[","{").replace(/]$/, '}')))
		},
		error: function(request, status, error) {
			console.log(request.responseText)
			console.log(status.responseText)
			console.log(error.responseText)
			alert("ajax 에러 발생")
			return
		}
	})
}

function makeFileListFromDB(data){
	var index = 1;
	for(key in data){
		var exportdata = Object.entries(data[key])
		//selectFileDatabaseModal.js에서 beSelectedFile() 호출
		var fileInfoFromDB = "<tr id = " + key + " class = fileListFromDB onclick = 'beSelectedFile($(this))'>"
		fileInfoFromDB += "<td class='result-style_td'>" + index + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[0][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[1][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[2][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[3][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[4][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[5][1] + "</td>"
		fileInfoFromDB += "<td class='result-style_td'>" + exportdata[6][1] + "</td>"
		fileInfoFromDB += "</tr>"
		$('table.result-style tbody').append(fileInfoFromDB)
		index++
	}
}
