var beSelectedFileForManageDB = []

function beSelectedFile(row) {
	var td = row.children()
	switch (row.attr('class')) {
		case "fileListFromDB beSelected":
			row.removeClass('beSelected')
			for (var i = 0; i < beSelectedFileForManageDB.length; i++) {
				if (beSelectedFileForManageDB[i].fileName == td[1].innerHTML) {
					beSelectedFileForManageDB.splice(i, 1)
				}
			}
			break
		default:
			row.addClass('beSelected')
			var fileSet = {
				fileId: row.attr('id'),
				fileSize: "None",
				fileLocation: "DB",
				fileName: td[1].innerHTML,
				fileType: td[2].innerHTML,
				fileModel: td[3].innerHTML,
				fileModelNumber: td[4].innerHTML,
				fileOS: td[5].innerHTML,
				fileRecordMode: td[6].innerText				
			}
			beSelectedFileForManageDB.push(fileSet)
			break
	}
	//console.log(beSelectedFileForManageDB)
}