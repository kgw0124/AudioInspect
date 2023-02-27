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
					//원본용 Modal창 열기
					$("#edit-modal-body-origin-radio").prop("checked", true)
					$("#edit-modal-body-origin").css("display", "")
					$("#edit-modal-body-edit").css("display", "none")
					//선택한 파일의 DB 정보를 예제로 채워주기
					$("#edit-modal-body-origin-fileName").attr("value", beSelectedFileForManageDB[0].fileName)
					$("#edit-modal-body-origin-fileModel").attr("value", beSelectedFileForManageDB[0].fileModel)
					$("#edit-modal-body-origin-fileModelNumber").attr("value", beSelectedFileForManageDB[0].fileModelNumber)
					var fileOS = beSelectedFileForManageDB[0].fileOS.split(" ")[0]
					var fileOSVersion = beSelectedFileForManageDB[0].fileOS.split(" ")[1]
					switch(fileOS){
						case "iOS":
							$("#edit-modal-body-origin-fileOS-ios").prop("selected", true)
							break
						case "Android":
							$("#edit-modal-body-origin-fileOS-android").prop("selected", true)
							break						
					}
					$("#edit-modal-body-origin-fileOSVersion").attr("value", fileOSVersion)
					var fileRecordMode = beSelectedFileForManageDB[0].fileRecordMode.split("/")[0]
					var fileRecordQuality = beSelectedFileForManageDB[0].fileRecordMode.split("/")[1]
					$("#edit-modal-body-origin-fileRecordMode").attr("value", fileRecordMode)
					$("#edit-modal-body-origin-fileRecordQuality").attr("value", fileRecordQuality)	
					break
				case false:
					//편집용 Modal창 열기
					$("#edit-modal-body-edit-radio").prop("checked", true)
					$("#edit-modal-body-origin").css("display", "none")
					$("#edit-modal-body-edit").css("display", "")
					//선택한 파일의 DB 정보를 예제로 채워주기
					$("#edit-modal-body-edit-fileName").attr("value", beSelectedFileForManageDB[0].fileName)
					$("#edit-modal-body-edit-fileModel").attr("value", beSelectedFileForManageDB[0].fileModel)
					$("#edit-modal-body-edit-fileModelNumber").attr("value", beSelectedFileForManageDB[0].fileModelNumber)
					var fileOS = beSelectedFileForManageDB[0].fileOS.split(" ")[0]
					var fileOSVersion = beSelectedFileForManageDB[0].fileOS.split(" ")[1]
					/*
					console.log(beSelectedFileForManageDB[0].fileOS)
					console.log(beSelectedFileForManageDB[0].fileOS.split(" "))
					console.log(fileOS)
					console.log(fileOSVersion)
					*/
					switch(fileOS){
						case "iOS":
							$("#edit-modal-body-edit-fileOS-ios").prop("selected", true)
							break
						case "Android":
							$("#edit-modal-body-edit-fileOS-android").prop("selected", true)
							break						
					}
					$("#edit-modal-body-edit-fileOSVersion").attr("value", fileOSVersion)
					var fileRecordMode = beSelectedFileForManageDB[0].fileRecordMode.split("/")[0]
					var fileRecordQuality = beSelectedFileForManageDB[0].fileRecordMode.split("/")[1]
					$("#edit-modal-body-edit-fileRecordMode").attr("value", fileRecordMode)
					$("#edit-modal-body-edit-fileRecordQuality").attr("value", fileRecordQuality)
					break
			}
			$("#editModal").modal('show')
			break
		default:
			alert("음성파일 수정은 한번에 한개의 파일만이 가능합니다.")
			break
	}
}