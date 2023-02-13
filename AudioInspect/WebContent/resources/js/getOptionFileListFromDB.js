var initQueryForOriginal = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where (sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id)"
var initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id"
var selectmanufacturer = [];
var selectmanufacturer2 = [];
var selectEdit = "";
var selectEdit2 = [];
var selectOS = "";
var selectOS2 = "";
var search_file_name = "";
var search_file_name2 = "";
var search_model_name = "";
var search_model_name2 = "";
var search_model_number = "";
var search_model_number2 = "";
var select_recordmode = "";
var select_recordmode2 = "";
var select_recordQ = "";
var select_recordQ2 = "";
var record = "";
var record2 = "";
var select_Android = "";
var select_Android2 = "";
var select_Android3 = "";
var select_Android4 = "";
var select_iOS = "";
var select_iOS2 = "";
var OSArr = [];
var manuArr = [];
var resultarr = [];
var resultarr_2 = [];
var resultarr_3 = [];
var resultarr_4 = [];
var resultarr_5 = [];


function manuclick() {
	$(".result_list").empty();
	resultarr = [];
	resultarr_2 = [];
	resultarr_3 = [];
	resultarr_4 = [];
	resultarr_5 = [];
	// 선택된 목록 가져오기
	const query = 'input[type="checkbox"]:checked';
	const selectedEls = document.querySelectorAll(query);
	// 선택된 목록에서 value 찾기
	let result = "";
	let result2 = '';
	let result3 = '';
	let result4 = '';
	selectedEls.forEach((el) => {
		result = el.name + '';
		resultarr.push(result);
		result2 = el.className + '';
		resultarr_2.push(result2)
		result3 = el.className + '';
		if (result3 == "manufacturerlist") {
			resultarr_3.push(" and sf.recording_app_manufacturer='" + result + "'")
			resultarr_4.push(" and sf.recording_app_manufacturer='" + result + "'")
		}
		result4 = el.className + '';
		if (result4 == "editlist2") {
			resultarr_5.push(" and esf.editing_app_name like'%" + result + "%'")
		}
	});
	for (var i = 0; i < resultarr.length; i++) {
		if (resultarr_2[i] == "manufacturerlist") {
			if (resultarr[i] == "manuAll") {
				$("input[id = 'nonck']").prop("checked", false);
			} else {
				if (resultarr[i] == "manuAll") {
					resultarr.splice(0)
				}
				selectmanufacturer[i] = resultarr_3[i]
				selectmanufacturer2[i] = resultarr_4[i]
				$("input[name = 'manuAll']").prop("checked", false);
			}
		}
		if (resultarr_2[i] == "editlist") {
			if (resultarr[i] == "selectAll") {
				$("input[id = 'editnonck']").prop("checked", false);
			}
			if (resultarr[i] == "selectorigin") {
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='edit']").prop("checked", false);
				const checkbox5 = $(".editlist2");
				for (var j = 0; j < checkbox5.length; j++) {
					checkbox5[j].checked = false;
				}
			}
			if (resultarr[i] == "edit") {
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
			}
		}
		if (resultarr_2[i] == "editlist2") {
			if (resultarr[i] == "selectedit") {
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
				$("input[id = 'sweditnonck']").prop("checked", false);
			}
			else {
				$("input[name='edit']").prop("checked", true);
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
				$(".result_list").empty();
				$("input[name='selectedit']").prop("checked", false);
				//selectEdit2[i - selectmanufacturer2.length] = resultarr_5[i]
				//resultarr_5[i] = resultarr_5[i]
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
			} else {
				$("input[name='OSAll']").prop("checked", false);
				selectOS = " and osd.os_name='" + resultarr[i] + "'";
				selectOS2 = " and osd.os_name='" + resultarr[i] + "'";
			}
		}
		if (resultarr_2[i] == "text_search") {
			if (resultarr[i] == "file_name") {
				$("input[name='record_device']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				var search = $(".search_text").val();
				search_file_name = " and sf.file_name like'%" + search + "%'";
				search_file_name2 = " and esf.file_name like'%" + search + "%'";
				search_model_name = "";
				search_model_name2 = "";
				search_model_number = "";
				search_model_number2 = "";

			}
			if (resultarr[i] == "record_device") {
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				var search2 = $(".search_text").val();
				search_model_name = " and sd.smart_device_model_name like'%" + search2 + "%'";
				search_model_name2 = " and sd.smart_device_model_name like'%" + search2 + "%'";
				search_file_name = "";
				search_file_name2 = "";
				search_model_number = "";
				search_model_number2 = "";

			}
			if (resultarr[i] == "record_device_num") {
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device']").prop("checked", false);
				var search3 = $(".search_text").val();
				search_model_number = " and sd.smart_device_model_number like'%" + search3 + "%'";
				search_model_number2 = " and sd.smart_device_model_number like'%" + search3 + "%'";
				search_file_name = "";
				search_file_name2 = "";
				search_model_name = "";
				search_model_name2 = "";
			}
		}
		var origin = [];
		var edited = [];
		if (resultarr_2[i].includes("edit")) {
			if (resultarr[i].includes("All")) {
				$(".result_list").empty();
				origin = initQueryForOriginal;
				edited = initQueryForEdited;
				getFileListFromDB(origin)
				getFileListFromDB(edited)
			}
			/*else if (resultarr[i].includes("origin")) {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				edit = "";
			}*/
			else {
				$(".result_list").empty();
				if (selectmanufacturer2.length > 0) {
					for (var n = 1; n < selectmanufacturer2.length + 1; n++) {
						if (resultarr_5.length > 0) {
							for (var m = 1; m < resultarr_5.length + 1; m++) {
								edited[n * m] = edited[n - 1] + resultarr_5[m - 1]
							}
						}
						else {
							edited[n - 1] = initQueryForEdited + record2 + selectmanufacturer2[n - 1] + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
						}
					}
				}
				else {
					var EditedQ = initQueryForEdited + record2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
					if (resultarr_5.length > 0) {
						for (var m = 0; m < resultarr_5.length; m++) {
							edited[m] = EditedQ + resultarr_5[m]
						}
					}
				}
				origin = ""
			}
		}
		else {
			if (resultarr[i].includes("origin")) {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				edit = "";
			}
			else {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				if (selectmanufacturer2.length > 0) {
					for (var n = 1; n < selectmanufacturer2.length + 1; n++) {
						if (resultarr_5.length > 0) {
							for (var m = 1; m < resultarr_5.length + 1; m++) {
								edited[n * m] = edited[n - 1] + resultarr_5[m - 1]
							}
						}
						else {
							edited[n - 1] = initQueryForEdited + record2 + selectmanufacturer2[n - 1] + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
						}
					}
				}
				else {
					var EditedQ = initQueryForEdited + record2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
					if (resultarr_5.length > 0) {
						for (var m = 0; m < resultarr_5.length; m++) {
							edited[m] = EditedQ + resultarr_5[m]
						}
					}
				}
				//origin = "";
				//origin = initQueryForOriginal + record + selectmanufacturer + selectEdit2 + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				//edited = initQueryForEdited + record2 + selectmanufacturer2 + selectEdit2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
			}
		}
	}
	for (var i = 0; i < origin.length; i++) {
		getFileListFromDB(origin[i]);
	}
	for (var j = 0; j < edited.length; j++) {
		getFileListFromDB(edited[j]);
	}
}

function OS_number() {
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
	var OS_And_iOS = $("select[class = selectOS] option:selected").text();
	if (OS_And_iOS.includes("Android")) {
		$("input[name = 'Android']").prop("checked", true);
		$("input[name = 'iOS']").prop("checked", false);
	}
	else if (OS_And_iOS.includes("iOS")) {
		$("input[name = 'iOS']").prop("checked", true);
		$("input[name = 'Android']").prop("checked", false);
	}
	select_Android3 = "";
	select_Android4 = "";
	select_Android = " and osd.os_version like '%" + OS_version + "' ";
	select_Android2 = " and osd.os_version like '%" + OS_version + "'";
	manuclick();
}
function OS_number2() {
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
	select_Android = "";
	select_Android2 = "";
	select_Android3 = " and osd.os_version like '%" + OS_version2 + "%'";
	select_Android4 = " and osd.os_version like '%" + OS_version2 + "%'";
	manuclick();
}


function recordclick() {
	const query = 'input[class="recordlist"]:checked';
	const selectedEls = document.querySelectorAll(query);
	let result = '';
	selectedEls.forEach((el) => {
		result = el.name + '';
	});
	if (result == "recordAll") {
		record = ""
		record2 = ""
	}
	manuclick()
}
function recordmode() {
	if ($("input[class='recordlist']").is(":checked") == true) {
		$("input[class='recordlist']").prop("checked", false);
	}
	var mode = $(".recordmode").val();
	var mode2 = $(".recordQ").val();
	$(".result_list").empty();
	if (mode == "recordmode_All") {
		select_recordmode = "";
		select_recordmode2 = "";
	} else {
		select_recordmode = " and sf.recording_mode='" + mode + "'";
		select_recordmode2 = " and esf.recording_mode='" + mode + "'";
	}
	if (mode2 == "recordQ_All") {
		select_recordQ = "";
		select_recordQ2 = "";
	} else {
		select_recordQ = " and sf.recording_quality='" + mode2 + "'";
		select_recordQ2 = " and esf.recording_quality='" + mode2 + "'";
	}
	record = select_recordmode + select_recordQ;
	record2 = select_recordmode2 + select_recordQ2;
	manuclick()
}


function deleteclick() {
	$(".result_list").empty();
	// 초기화할 checkbox 선택
	const checkbox = $(".manufacturerlist");
	const checkbox2 = $(".OSlist");
	const checkbox3 = $(".editlist");
	const checkbox4 = $(".text_search")
	const checkbox5 = $(".editlist2");
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
	for (var i = 0; i < checkbox5.length; i++) {
		checkbox5[i].checked = false;
	}
	$("input[class='select_OS']").prop("checked", false);
	$("input[class='input_OS']").prop("checked", false);
	$(".search").val("")
	$(".recordmode").val("recordmode_All")
	$(".recordQ").val("recordQ_All")
	$(".search_text").val("")
	selectEdit = "";
	selectEdit2 = [];
	selectOS = "";
	selectOS2 = "";
	search_file_name = "";
	search_file_name2 = "";
	search_model_name = "";
	search_model_name2 = "";
	search_model_number = "";
	search_model_number2 = "";
	select_recordmode = "";
	select_recordmode2 = "";
	select_recordQ = "";
	select_recordQ2 = "";
	record = "";
	record2 = "";
	select_Android = "";
	select_Android2 = "";
	select_Android3 = "";
	select_Android4 = "";
	select_iOS = "";
	select_iOS2 = "";
	selectmanufacturer = [];
	selectmanufacturer2 = [];
	resultarr = [];
	resultarr_2 = [];
	resultarr_3 = [];
	resultarr_4 = [];
	getFileListFromDB(initQueryForOriginal)
	getFileListFromDB(initQueryForEdited)
}