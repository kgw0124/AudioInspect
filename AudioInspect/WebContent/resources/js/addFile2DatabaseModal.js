function addFile2DB() {
	$("#addModal").modal('show')
}

function change2origin_add(){
	$("#add-modal-body-edit-radio").prop("checked", false)
	$("#add-modal-body-origin-radio").prop("checked", true)
	$("#add-modal-body-edit").css("display", "none")
	$("#add-modal-body-origin").css("display", "")
}

function change2edit_add(){
	$("#add-modal-body-origin-radio").prop("checked", false)
	$("#add-modal-body-edit-radio").prop("checked", true)
	$("#add-modal-body-origin").css("display", "none")
	$("#add-modal-body-edit").css("display", "")
}