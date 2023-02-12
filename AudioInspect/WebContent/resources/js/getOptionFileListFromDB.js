var initQueryForOriginal = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where (sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id)"
var initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id"
var selectmanufacturer;
var selectmanufacturer2;
var selectEdit;
var selectEdit2;
var selectOS;
var selectOS2;
var search_file_name;
var search_file_name2;
var search_model_name;
var search_model_name2;
var search_model_number;
var search_model_number2;
var select_recordmode;
var select_recordmode2;
var select_recordQ;
var select_recordQ2;
var select_Android;
var select_Android2;
var select_iOS;
var select_iOS2;
var OSArr = [];
var manuArr = [];


function manuclick() {
	var resultarr = [];
	var resultarr_2 = [];
	$(".result_list").empty();
	// 선택된 목록 가져오기
	const query = 'input[type="checkbox"]:checked';
	const selectedEls = document.querySelectorAll(query);
	// 선택된 목록에서 value 찾기
	let result = "";
	let result2 = '';
	selectedEls.forEach((el) => {
		result = el.name + '';
		resultarr.push(result);
		result2 = el.className + '';
		resultarr_2.push(result2)
	});
	for (var i = 0; i < resultarr.length; i++) {
		if (resultarr_2[i] == "manufacturerlist") {
			if (resultarr[i] == "manuAll") {
				getFileListFromDB(initQueryForOriginal)
				getFileListFromDB(initQueryForEdited)
				$("input[id = 'nonck']").prop("checked", false);
			} else {
				if (resultarr[i] == "manuAll") {
					resultarr.splice(0)
				}
				selectmanufacturer = initQueryForOriginal + " and sf.recording_app_manufacturer='" + resultarr[i] + "'";
				selectmanufacturer2 = " and esf.editing_app_manufacturer='" + resultarr[i] + "'";
				getFileListFromDB(selectmanufacturer)
				getFileListFromDB(selectmanufacturer2)
				$("input[name = 'manuAll']").prop("checked", false);
			}
		}
		if (resultarr_2[i] == "editlist") {
			if (resultarr[i] == "editAll") {
				$("input[id = 'editnonck']").prop("checked", false);
				getFileListFromDB(initQueryForOriginal)
				getFileListFromDB(initQueryForEdited)
			} if (resultarr[i] == "original") {
				$("input[name='editAll']").prop("checked", false);
				getFileListFromDB(initQueryForOriginal)
			} if (resultarr[i] == "edit") {
				$("input[name='editAll']").prop("checked", false);
				getFileListFromDB(initQueryForEdited)
			}
			else {
				$(".result_list").empty();
				selectEdit = initQueryForEdited + " and esf.editing_app_name='" + resultarr[i] + "'";
				getFileListFromDB(selectEdit)
			}
		}
		if (resultarr_2[i] == "editlist2") {
			if (resultarr[i] == "editAll2") {
				$("input[id = 'sweditnonck']").prop("checked", false);
				getFileListFromDB(initQueryForEdited)
			}
			else {
				$(".result_list").empty();
				$("input[name='editAll2']").prop("checked", false);
				selectEdit2 = initQueryForEdited + " and esf.editing_app_name='" + resultarr[i] + "'";
				getFileListFromDB(selectEdit2)
			}
		}
		if (resultarr_2[i] == "OSlist") {
			if (resultarr[i] == "OSAll") {
				if ($(".input_OS").is(":checked") == true) {
					$("input[class='input_OS']").prop("checked", false);
				}
				if ($(".select_OS").is(":checked") == true) {
					$("input[class='select_OS']").prop("checked", false);
				}
				$("input[id='OSnonck']").prop("checked", false);
				getFileListFromDB(initQueryForOriginal)
				getFileListFromDB(initQueryForEdited)
			} else {
				$("input[name='OSAll']").prop("checked", false);
				selectOS = initQueryForOriginal + " and osd.os_name='" + resultarr[i] + "'";
				selectOS2 = initQueryForEdited + " and osd.os_name='" + resultarr[i] + "'";
				getFileListFromDB(selectOS)
				getFileListFromDB(selectOS2)
			}
		}
		if (resultarr_2[i] == "text_search") {
			if (resultarr[i] == "file_name") {
				$("input[name='record_device']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				$(".search_button").click(function() {
					$(".result_list").empty();
					var search = $(".search_text").val();
					search_file_name = initQueryForOriginal + " and sf.file_name like'%" + search + "%'";
					search_file_name2 = initQueryForEdited + " and esf.file_name like'%" + search + "%'";
					getFileListFromDB(search_file_name)
					getFileListFromDB(search_file_name2)

				})
			}
			if (resultarr[i] == "record_device") {
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				$(".search_button").click(function() {
					$(".result_list").empty();
					var search = $(".search_text").val();
					search_model_name = initQueryForOriginal + " and sd.smart_device_model_name like'%" + search + "%'";
					search_model_name2 = initQueryForEdited + " and sd.smart_device_model_name like'%" + search + "%'";
					getFileListFromDB(search_model_name)
					getFileListFromDB(search_model_name2)

				})
			}
			if (resultarr[i] == "record_device_num") {
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device']").prop("checked", false);
				$(".search_button").click(function() {
					$(".result_list").empty();
					var search = $(".search_text").val();
					search_model_number = initQueryForOriginal + " and sd.smart_device_model_number like'%" + search + "%'";
					search_model_number2 = initQueryForEdited + " and sd.smart_device_model_number like'%" + search + "%'";
					getFileListFromDB(search_model_number)
					getFileListFromDB(search_model_number2)

				})
			}
		}
		if (resultarr[i].includes("All")) {
			$(".result_list").empty();
			console.log("All")
			//getFileListFromDB(initQueryForOriginal)
			//getFileListFromDB(initQueryForEdited)
		}
		if (resultarr[i].includes("original")) {
			$(".result_list").empty();
			console.log("original")
			//getFileListFromDB(initQueryForOriginal)
		}
		if (resultarr[i].includes("edit")) {
			$(".result_list").empty();
			console.log("edit")
			//getFileListFromDB(initQueryForEdited)
		}
	}
}

/*
function editclick() {
   var resultarr2 = [];
   $("input[name='editAll2']").prop("checked", false);
   $("input[id = 'sweditnonck']").prop("checked", false);
   $(".result_list").empty();
   const query = 'input[class="editlist"]:checked';
   const selectedEls =
	  document.querySelectorAll(query);
   let result = '';
   selectedEls.forEach((el) => {
	  result = el.name + '';
	  resultarr2.push(result);
   });
   for (var i = 0; i < resultarr2.length; i++) {
	  if (resultarr2[i] == "editAll") {
		 $("input[id = 'editnonck']").prop("checked", false);
		 getFileListFromDB(initQueryForOriginal)
		 getFileListFromDB(initQueryForEdited)
	  } if (resultarr2[i] == "original") {
		 $("input[name='editAll']").prop("checked", false);
		 getFileListFromDB(initQueryForOriginal)
	  } if (resultarr2[i] == "edit") {
		 $("input[name='editAll']").prop("checked", false);
		 getFileListFromDB(initQueryForEdited)
	  }
	  else {
		 $(".result_list").empty();
		 //$("input[id = 'editnonck']").prop("checked", false);
		 //$("input[name='editAll']").prop("checked", false);
		 selectEdit = initQueryForEdited + " and esf.editing_app_name='" + resultarr2[i] + "'";
		 getFileListFromDB(selectEdit)
	  }
   }
}
function editclick2() {
   $("input[name='editAll']").prop("checked", false);
   $("input[id = 'editnonck']").prop("checked", false);
   $(".result_list").empty();
   const query = 'input[class="editlist2"]:checked';
   const selectedEls =
	  document.querySelectorAll(query);
   let result = '';
   var resultarr3 = [];
   selectedEls.forEach((el) => {
	  result = el.name + '';
	  resultarr3.push(result);
   });
   for (var i = 0; i < resultarr3.length; i++) {
	  if (resultarr3[i] == "editAll2") {
		 $("input[id = 'sweditnonck']").prop("checked", false);
		 getFileListFromDB(initQueryForEdited)
	  }
	  else {
		 $(".result_list").empty();
		 $("input[name='editAll2']").prop("checked", false);
		 selectEdit2 = initQueryForEdited + " and esf.editing_app_name='" + resultarr3[i] + "'";
		 getFileListFromDB(selectEdit2)
	  }
   }
}
function OSclick() {
   $(".result_list").empty();
   const query = 'input[class="OSlist"]:checked';
   const selectedEls =
	  document.querySelectorAll(query);
   let result = '';
   var resultarr4 = [];
   selectedEls.forEach((el) => {
	  result = el.name + '';
	  resultarr4.push(result);
   });
   for (var i = 0; i < resultarr4.length; i++) {
	  if (resultarr4[i] == "OSAll") {
		 if ($(".input_OS").is(":checked") == true) {
			$("input[class='input_OS']").prop("checked", false);
		 }
		 if ($(".select_OS").is(":checked") == true) {
			$("input[class='select_OS']").prop("checked", false);
		 }
		 $("input[id='OSnonck']").prop("checked", false);
		 getFileListFromDB(initQueryForOriginal)
		 getFileListFromDB(initQueryForEdited)
	  } else {
		 $("input[name='OSAll']").prop("checked", false);
		 selectOS = initQueryForOriginal + " and osd.os_name='" + resultarr4[i] + "'";
		 selectOS2 = initQueryForEdited + " and osd.os_name='" + resultarr4[i] + "'";
		 getFileListFromDB(selectOS)
		 getFileListFromDB(selectOS2)
	  }
   }
}*/
function OS_number() {
	$(".result_list").empty();
	if ($(".input_OS").is(":checked") == true) {
		$("input[class='input_OS']").prop("checked", false);
	}
	if ($(".select_OS").is(":checked") == false) {
		$("input[class='select_OS']").prop("checked", true);
	}
	if ($("input[name='OSAll']").is(":checked") == true) {
		$("input[name='OSAll']").prop("checked", false);
	}
	var OS_version = $(".selectOS").val()
	/*selectmanufacturer = " and osd.os_version like '%" + OS_version + "'";
	OSArr.push(selectmanufacturer)
	//selectmanufacturer2 = " and osd.os_version like '%" + OS_version + "'";
	allSelect()*/
	select_Android = initQueryForOriginal + " and osd.os_version like '%" + OS_version + "' ";
	select_Android2 = initQueryForEdited + " and osd.os_version like '%" + OS_version + "'";
	getFileListFromDB(select_Android)
	getFileListFromDB(select_Android2)
}
function OS_number2() {
	$(".result_list").empty();
	if ($(".input_OS").is(":checked") == false) {
		$("input[class='input_OS']").prop("checked", true);
	}
	if ($(".select_OS").is(":checked") == true) {
		$("input[class='select_OS']").prop("checked", false);
	}
	if ($("input[name='OSAll']").is(":checked") == true) {
		$("input[name='OSAll']").prop("checked", false);
	}
	var OS_version2 = $(".search").val();
	var select_Android3 = initQueryForOriginal + " and osd.os_version like '%" + OS_version2 + "%'";
	var select_Android4 = initQueryForEdited + " and osd.os_version like '%" + OS_version2 + "%'";
	getFileListFromDB(select_Android3)
	getFileListFromDB(select_Android4)
}

/*
function searchclick() {
   $(".result_list").empty();
   const query = 'input[class="searchlist"]:checked';
   const selectedEls = document.querySelectorAll(query);
   let result = '';
   var resultarr5 = [];
   selectedEls.forEach((el) => {
	  result = el.name + '';
	  resultarr5.push(result);
   });
   for (var i = 0; i < resultarr5.length; i++) {
	  if (resultarr5[i] == "searchAll") {
		 $("input[id='searchnonck']").prop("checked", false);
		 getFileListFromDB(initQueryForOriginal)
		 getFileListFromDB(initQueryForEdited)
	  }
	  if (resultarr5[i] == "original") {
		 $("input[name='searchAll']").prop("checked", false);
		 getFileListFromDB(initQueryForOriginal)
	  }
	  if (resultarr5[i] == "edit") {
		 $("input[name='searchAll']").prop("checked", false);
		 getFileListFromDB(initQueryForEdited)
	  }
   }
}*/
/*
function textclick() {
   const query = 'input[class="text_search"]:checked';
   const selectedEls = document.querySelectorAll(query);
   let result = '';
   var resultarr6 = [];
   selectedEls.forEach((el) => {
	  result = el.name + '';
	  resultarr6.push(result);
   });
   for (var i = 0; i < resultarr6.length; i++) {
	  if (resultarr6[i] == "file_name") {
		 $("input[name='record_device']").prop("checked", false);
		 $("input[name='record_device_num']").prop("checked", false);
		 $(".search_button").click(function() {
			$(".result_list").empty();
			var search = $(".search_text").val();
			search_file_name = initQueryForOriginal + " and sf.file_name like'%" + search + "%'";
			search_file_name2 = initQueryForEdited + " and esf.file_name like'%" + search + "%'";
			getFileListFromDB(search_file_name)
			getFileListFromDB(search_file_name2)

		 })
	  }
	  if (resultarr6[i] == "record_device") {
		 $("input[name='file_name']").prop("checked", false);
		 $("input[name='record_device_num']").prop("checked", false);
		 $(".search_button").click(function() {
			$(".result_list").empty();
			var search = $(".search_text").val();
			search_model_name = initQueryForOriginal + " and sd.smart_device_model_name like'%" + search + "%'";
			search_model_name2 = initQueryForEdited + " and sd.smart_device_model_name like'%" + search + "%'";
			getFileListFromDB(search_model_name)
			getFileListFromDB(search_model_name2)

		 })
	  }
	  if (resultarr6[i] == "record_device_num") {
		 $("input[name='file_name']").prop("checked", false);
		 $("input[name='record_device']").prop("checked", false);
		 $(".search_button").click(function() {
			$(".result_list").empty();
			var search = $(".search_text").val();
			search_model_number = initQueryForOriginal + " and sd.smart_device_model_number like'%" + search + "%'";
			search_model_number2 = initQueryForEdited + " and sd.smart_device_model_number like'%" + search + "%'";
			getFileListFromDB(search_model_number)
			getFileListFromDB(search_model_number2)

		 })
	  }
   }

}*/

function recordclick() {
	$(".result_list").empty();
	const query = 'input[class="recordlist"]:checked';
	const selectedEls = document.querySelectorAll(query);
	let result = '';
	selectedEls.forEach((el) => {
		result = el.name + '';
	});
	if (result == "recordAll") {
		getFileListFromDB(initQueryForOriginal)
		getFileListFromDB(initQueryForEdited)
	}
}

function recordmode() {
	$(".result_list").empty();
	var mode = $(".recordmode").val();
	if (mode == "recordmode_All") {
		getFileListFromDB(initQueryForOriginal)
		getFileListFromDB(initQueryForEdited)
	} else {
		select_recordmode = initQueryForOriginal + " and sf.recording_mode='" + mode + "'";
		select_recordmode2 = initQueryForEdited + " and esf.recording_mode='" + mode + "'";
		getFileListFromDB(select_recordmode)
		getFileListFromDB(select_recordmode2)
	}
}
function recordQ() {
	$(".result_list").empty();
	var mode = $(".recordQ").val();
	if (mode == "recordQ_All") {
		getFileListFromDB(initQueryForOriginal)
		getFileListFromDB(initQueryForEdited)
	} else {
		select_recordQ = initQueryForOriginal + " and sf.recording_quality='" + mode + "'";
		select_recordQ2 = initQueryForEdited + " and esf.recording_quality='" + mode + "'";
		getFileListFromDB(select_recordQ)
		getFileListFromDB(select_recordQ2)
	}
}


/*
function allSelect() {
   console.log(OSArr)
   var arr = [...new Set(manuArr)];
   console.log(arr)
   for (var i = 0; i < arr; i++) {
	  var aaa = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
		 + "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
		 + "where (sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id)"
	  //aaa += OSArr[i]
	  aaa += arr[i]
	  getFileListFromDB(aaa)
	  console.log(aaa)
   }
   //initQueryForOriginal+= selectmanufacturer
   //initQueryForEdited += selectmanufacturer2
   //getFileListFromDB(initQueryForOriginal)
   //getFileListFromDB(initQueryForEdited)
}
*/
function deleteclick() {
	$(".result_list").empty();
	// 초기화할 checkbox 선택
	const checkbox = $(".manufacturerlist");
	const checkbox2 = $(".OSlist");
	const checkbox3 = $(".editlist");
	const checkbox4 = $(".text_search")
	// 체크박스 목록을 순회하며 checked 값을 초기화
	for (var i = 0; i < checkbox.length; i++) {
		checkbox[i].checked = false;
	}
	for (var i = 0; i < checkbox2.length; i++) {
		checkbox2[i].checked = false;
	}
	for (var i = 0; i < checkbox3.length; i++) {
		checkbox3[i].checked = false;
	}
	for (var i = 0; i < checkbox4.length; i++) {
		if (checkbox4[i].name == "file_name") {
			$("input[name='file_name']").prop("checked", true);
		}
		else {
			checkbox4[i].checked = false;
		}
	}
	getFileListFromDB(initQueryForOriginal)
	getFileListFromDB(initQueryForEdited)
}