function editFile2DB(){
	//console.log(beSelectedFileForManageDB)
	//beSelectedFileForMangageDB: fileManageForDB.js에서 호출
	switch(beSelectedFileForManageDB.length){
		case 0:
			alert("수정하고자 하는 음성파일을 선택해주십시오.")
			break
		case 1:
			switch(beSelectedFileForManageDB[0].fileId.includes("원본")){
				case true:
					$("#edit-modal-body-origin-radio").prop("checked", true)
					$("#edit-modal-body-origin").css("display", "")
					$("#edit-modal-body-edit").css("display", "none")
					break
				case false:
					$("#edit-modal-body-edit-radio").prop("checked", true)
					$("#edit-modal-body-origin").css("display", "none")
					$("#edit-modal-body-edit").css("display", "")
					break
			}
			$("#editModal").modal('show')
			break
		default:
			alert("음성파일 수정은 한번에 한개의 파일만이 가능합니다.")
			break
	}
}