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
				fileName: td[1].innerHTML,
				fileSize: "None",
				fileType: td[2].innerHTML,
				fileLocation: "DB"
			}
			beSelectedFileForManageDB.push(fileSet)
			break
	}
	console.log(beSelectedFileForManageDB)
}