function editFile2DB(){
	console.log(beSelectedFileForManageDB)
	//beSelectedFileForMangageDB: fileManageForDB.js에서 호출
	switch(beSelectedFileForManageDB.length){
		case 0:
			alert("수정하고자 하는 음성파일을 선택해주십시오.")
			break
		case 1:
			var beSelectedFileName = "<p> 선택한 파일 이름 : " + beSelectedFileForManageDB[0].fileName + "</p>"
			$("#editModal_selectedFileName").append(beSelectedFileName)
			$("#editModal").modal('show')
			break
		default:
			alert("음성파일 수정은 한번에 한개의 파일만이 가능합니다.")
			break
	}
}