$(document).ready(function() {
	$('ul.compare_tabs li').off('click').on({
		'click': function() {
			var tab_id = $(this).attr('data-tab')
			$('ul.compare_tabs li').removeClass('current')
			$('div.compare_context table').removeClass('current')
			$(this).addClass('current')
			$('#' + tab_id).addClass('current')
			var comparefile_name = $(this).text().slice(0, -1)
			var comparemethod = document.querySelector('.compare_button.current').value
			if (tab_id != "compare_basic") {
				switch (comparemethod) {
					case "XML":
						var standardfile = standardfilesData.metaData[0].join("\n")
						var index = comparefilesData.fileName.indexOf(comparefile_name)
						var comparefile = comparefilesData.metaData[index].join("\n")
						compareXML(tab_id, standardfile, comparefile, comparefile_name)
						break
					default:
						var standardfile = standardfilesData.semiMetaData[0]
						var index = comparefilesData.fileName.indexOf(comparefile_name)
						var comparefile = comparefilesData.semiMetaData[index]
						compare(tab_id, standardfile, comparefile, comparefile_name)
						break
				}
			}
		}
	})
})

function compare(tab_id, standardfile, comparefile, comparefile_name) {
	var standardfileArr = standardfile.split("\n")
	var comparefileArr = comparefile.split("\n")
	var copy_standardfileArr = standardfile.split("\n")
	var copy_comparefileArr = comparefile.split("\n")
	var standardfile_name = document.querySelector('td.standard_name').innerHTML
	var comparemethod = document.querySelector(".compare_button.current").value
	var difference_index_standardfile = [] //기준 파일의 차이 속성 인덱스 저장
	var difference_index_comparefile = []
	var track_info_standardfile = [] //기준 파일의 트랙 정보(General, Audio) 속성 인덱스 저장
	var track_info_comparefile = []
	var notEqualIcon = '<i class="fa-sharp fa-solid fa-not-equal"></i>'

	//standard 파일과 이전에 선택한 compare 파일과의 비교 결과를 삭제
	$(".resultline").empty()
	$(".resultline_2").empty()
	$(".line").empty()

	//standardfile과 comparefile 차이 찾기
	for (var i = 0; i < standardfileArr.length; i++) {
		var slash = standardfileArr[i].indexOf(':')
		var search_standard_name = standardfileArr[i].substring(0, slash)
		for (var j = 0; j < comparefileArr.length; j++) {
			//standardfileArr[i]의 정보가 General, Audio, ""(공백)인 경우, comparefileArr[j]의 정보가 ""(공백)인 경우 비교하지 않는다.
			if (standardfileArr[i] == "General" || standardfileArr[i] == "Audio" || standardfileArr[i] == "" || comparefile[j] == "") {
				break
			} else {
				var compare_slash = comparefileArr[j].indexOf(':')
				var search_compare_name = comparefileArr[j].substring(0, compare_slash)
				//standardfileArr[i]와 comparefileArr[j]의 문자열에서 ':' 이전의 내용이 같아야지 비교 실행
				if (search_standard_name == search_compare_name) {
					//이제는 ':' 뒤의 내용을 비교하는데 이때 두 내용이 다른 경우
					if (standardfileArr[i].substring(slash + 1) != comparefileArr[j].substring(compare_slash + 1)) {
						let resultline = ''
						resultline = '<tr><td class = "compareresult">[DATA_VALUE_MISMATCHING] ' + search_standard_name + '<br>(' + standardfile_name + ') :: ' + standardfileArr[i].substring(slash + 1) + ' ' + notEqualIcon + " (" + comparefile_name + ") :: " + comparefileArr[j].substring(compare_slash + 1) + '</td></tr>'
						$('.resultline').append(resultline)
						standardfileArr[i] = ""
						comparefileArr[j] = "" //comparefileArr[j]의 내용을 공백으로 바꿈: General과 Audio에 같은 속성이 존재하기 때문
						difference_index_standardfile.push(i) //standardfile과 comparefile의 차이점의 인덱스를 저장
						difference_index_comparefile.push(j) //standardfile과 comparefile의 차이점의 인덱스를 저장
						break
						//이제는 ':' 뒤의 내용을 비교하는데 이때 두 내용이 같은 경우
					} else {
						standardfileArr[i] = ""
						comparefileArr[j] = ""
						break
					}
					//standardfileArr[i]와 comparefileArr[j]의 문자열에서 ':' 이전의 내용이 달라 비교 실행 X
				} else {
					continue
				}
			}
		}
	}

	//standardfile, comparefile 둘 중 하나만 가지고 있는 속성값 출력
	for (var i = 0; i < standardfileArr.length; i++) {
		if (tab_id == "compare_basic") {
			break
		} else {
			if (standardfileArr[i] == "General" || standardfileArr[i] == "") {
				continue
			} else if (standardfileArr[i] == "Audio") {
				track_info_standardfile = []
				track_info_standardfile.push(i)
				continue
			} else {
				var slash = standardfileArr[i].indexOf(':')
				var dataName = standardfileArr[i].substring(0, slash)
				let resultline_2 = ''
				resultline_2 = '<tr><td class = "compareresult">[DATA_MISSING] ' + dataName + '<br>(' + standardfile_name + ') 존재 O ' + notEqualIcon + ' (' + comparefile_name + ') 존재 X</td></tr>'
				$('.resultline_2').append(resultline_2)
				difference_index_standardfile.push(i) //standardfile과 comparefile의 차이점의 인덱스를 저장
			}
		}
	}

	for (var j = 0; j < comparefileArr.length; j++) {
		if (tab_id == "compare_basic") {
			break
		} else {
			if (comparefileArr[j] == "General" || comparefileArr[j] == "") {
				continue
			} else if (comparefileArr[j] == "Audio") {
				track_info_comparefile = []
				track_info_comparefile.push(j)
				continue
			} else {
				var slash = comparefileArr[j].indexOf(':')
				var dataName = comparefileArr[j].substring(0, slash)
				let resultline_2 = ''
				resultline_2 = '<tr><td class = "compareresult">[DATA_MISSING] ' + dataName + '<br>(' + standardfile_name + ') 존재 X ' + notEqualIcon + ' (' + comparefile_name + ') 존재 O</td></tr>'
				$('.resultline_2').append(resultline_2)
				difference_index_comparefile.push(j)
			}
		}
	}

	//standardfile과 comparefile를 빨간 색으로 출력
	if (comparemethod == "TEXT") { //출력 방식이 TEXT인 경우
		if (tab_id == "compare_basic") {
			stop
		} else {
			$('#standardfile').empty()
			for (var x = 0; x < copy_standardfileArr.length; x++) {
				if (difference_index_standardfile.includes(x) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
					let standardfile = ""
					standardfile = '<tr class = "standard_text"><td class = "filehover" style="color:red">' + copy_standardfileArr[x] + '</td></tr>'
					$('#standardfile').append(standardfile)
				} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
					let standardfile = ""
					standardfile = '<tr class = "standard_text"><td class = "filehover">' + copy_standardfileArr[x] + '</td></tr>'
					$('#standardfile').append(standardfile)
				}
			}
		}
		$('#' + tab_id).empty()
		for (var z = 0; z < copy_comparefileArr.length; z++) {
			if (tab_id == "compare_basic") {
				continue
			} else {
				if (difference_index_comparefile.includes(z) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
					let comparefile = ""
					comparefile = '<tr><td style="color:red" class = "filehover">' + copy_comparefileArr[z] + '</td></tr>'
					$('#' + tab_id + ".comparefile.current").append(comparefile)
				} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
					let comparefile = ""
					comparefile = '<tr><td class = "filehover">' + copy_comparefileArr[z] + '</td></tr>'
					$('#' + tab_id + ".comparefile.current").append(comparefile)
				}
			}
		}
	} else { //출력 방식이 TREE인 경우
		if (tab_id == "compare_basic") {
			stop
		} else {
			$('#standardfile').empty()
			//범위(1)
			var standardfile = ""
			standardfile = '<details class="standard_General"><summary><i class="fa-regular fa-file"></i> General</summary>'
			$('#standardfile').append(standardfile)
			//범위(2)
			for (var x = 1; x < track_info_standardfile[0]; x++) {
				if (difference_index_standardfile.includes(x) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style="color:red"></i> ' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_General').append(standardfile)
				} else if (copy_standardfileArr[x] == "") {
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td>' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_General').append(standardfile)
				} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td>┗  ' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_General').append(standardfile)
				}
			}
			//범위(3)
			var standardfile = ""
			standardfile = '</details><details class="standard_Audio"><summary><i class="fa-regular fa-file-audio"></i> Audio</summary>'
			$('#standardfile').append(standardfile)
			//범위(4)
			for (var x = track_info_standardfile[0] + 1; x < copy_standardfileArr.length; x++) {
				if (difference_index_standardfile.includes(x) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style="color:red"></i> ' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_Audio').append(standardfile)
				} else if (copy_standardfileArr[x] == "") {
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td>' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_Audio').append(standardfile)
				} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
					var standardfile = ""
					standardfile = '<tr class="tree_context"><td>┗  ' + copy_standardfileArr[x] + '</td></tr>'
					$('details.standard_Audio').append(standardfile)
				}
			}
		}
		$('#' + tab_id).empty()
		for (var z = 0; z < copy_comparefileArr.length; z++) {
			if (tab_id == "compare_basic") {
				continue
			} else {
				//범위(1)
				var comparefile = ""
				comparefile = '<details class="compare_General"><summary><i class="fa-regular fa-file"></i> General</summary>'
				$('#' + tab_id + ".comparefile.current").append(comparefile)
				//범위(2)
				for (var z = 1; z < track_info_comparefile[0]; z++) {
					if (difference_index_comparefile.includes(z) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
						var comparefile = ""
						comparefile = '<tr class="tree_context"><td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style="color:red"></i> ' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_General').append(comparefile)
					} else if (copy_comparefileArr[z] == "") {
						var comparefile = ""
						comparefile = '<tr class="tree_context"><td>' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_General').append(comparefile)
					} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
						var comparefile = ""
						comparefile = '<tr class="tree_context"><td>┗  ' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_General').append(comparefile)
					}
				}
				//범위(3)
				var comparefile = ""
				comparefile = '</details><details class="compare_Audio"><summary><i class="fa-regular fa-file-audio"></i> Audio</summary>'
				$('#' + tab_id + ".comparefile.current").append(comparefile)
				//범위(4)
				for (var z = track_info_comparefile[0] + 1; z < copy_comparefileArr.length; z++) {
					if (difference_index_comparefile.includes(z) == true) { //standardfile과 comparefile이 차이를 가지는 속성 인덱스
						let comparefile = ""
						comparefile = '<tr class="tree_context"><td style="color:red">┗  <i class="fa-solid fa-triangle-exclamation style="color:red"></i> ' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_Audio').append(comparefile)
					} else if (copy_comparefileArr[z] == "") {
						let comparefile = ""
						comparefile = '<tr class="tree_context"><td>' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_Audio').append(comparefile)
					} else { //standardfile과 comparefile이 차이를 가지지 않는 속성 인덱스
						let comparefile = ""
						comparefile = '<tr class="tree_context"><td>┗  ' + copy_comparefileArr[z] + '</td></tr>'
						$('details.compare_Audio').append(comparefile)
					}
				}
			}
		}
	}

	// "(기준 파일명)과 (비교 파일명)은 일치합니다/ 일치하지 않습니다." 출력
	var standard_compare_difference = $('.resultline').text()
	var standard_compare_difference_2 = $('.resultline_2').text()
	if (tab_id == "compare_basic") {
		stop
	} else {
		if (standard_compare_difference == '' && standard_compare_difference_2 == '') {
			let line = ''
			line = standardfile_name + ' 와 ' + comparefile_name + ' 는 일치합니다.'
			$('.line').append(line)
		} else {
			let line = ''
			line = standardfile_name + ' 와 ' + comparefile_name + ' 는 일치하지 않습니다.'
			$('.line').append(line)
		}
	}
}

var cnt = 0;
function compareXML(tab_id, standardfile, comparefile, comparefile_name) {
	document.getElementById("XMLFileExport").addEventListener("click", function() {
		var current_filename = ($(".comparefile.current")[0].attributes[0].nodeValue)
		if (current_filename == tab_id) {
			cnt += 1;
			if (cnt == 1) {
				exportReportXMlCompare(comparefile, comparefile_name)
			}
		}
	})
	cnt = 0;
	var standardfile_name = document.querySelector('td.standard_name').innerHTML
	var standardfileArr = standardfile.split("\n")
	var comparefileArr = comparefile.split("\n")
	var block_info_for_count_depth_standardfile = []
	var block_info_for_count_depth_comparefile = []
	var block_info_standardfile = []
	var block_info_comparefile = []
	var data_info_standardfile = {
		depth0: [],
		depth1: [],
		depth2: [],
		depth3: [],
		depth4: [],
		depth5: [],
		depth6: [],
		depth7: [],
		depth8: [],
		depth9: [],
		depth10: [],
		depth11: [],
		depth12: [],
		depth13: []
	}
	var data_info_comparefile = {
		depth0: [],
		depth1: [],
		depth2: [],
		depth3: [],
		depth4: [],
		depth5: [],
		depth6: [],
		depth7: [],
		depth8: [],
		depth9: [],
		depth10: [],
		depth11: [],
		depth12: [],
		depth13: []
	}
	var notEqualIcon = '<i class="fa-sharp fa-solid fa-not-equal"></i>'

	//getStandMetaDataTreeFromXML(), getCompMetaDataTreeFromXML(): MetaData.js에서 호출
	$('#standardfile').empty()
	$('#' + tab_id).empty()
	getStandMetaDataTreeFromXML(standardfile.split("\n"))
	getCompMetaDataTreeFromXML(comparefile_name, comparefile.split("\n"))

	//비교 상세 결과 초기화
	$(".resultline").empty()
	$(".resultline_2").empty()
	$(".line").empty()
	
	//standardfile의 Block, Data 분석
	for (var i = 0; i < standardfileArr.length; i++) {
		if (standardfileArr[i].includes("block") == true) { //Block
			if ($(standardfileArr[i]).attr("name") == "Second pass") {
				break
			} else if (standardfileArr[i].includes("</block>") == false && $(standardfileArr[i]).attr("name") != undefined) {
				block_info_for_count_depth_standardfile.push(i)
				var current_blocks = []
				for (var j = 0; j < block_info_for_count_depth_standardfile.length; j++) {
					if (j == block_info_for_count_depth_standardfile.length - 1) { //depth에서 가장 마지막(=하위)인 Block
						var x = block_info_for_count_depth_standardfile[j]
						current_blocks.push($(standardfileArr[x]).attr("name") + ":")
						////상위 Block 속 같은 이름의 하위 Block들 처리
						var depth = block_info_for_count_depth_standardfile.length - 1
						var current_blocks_list = []
						for (var z = 0; z < data_info_standardfile["depth" + depth].length; z++) {
							if (data_info_standardfile["depth" + depth][z].includes(":") == true) {
								current_blocks_list.push(data_info_standardfile["depth" + depth][z].replace(/[0-9]/g, ""))
							}
						}
						var count = current_blocks_list.filter(element => element === current_blocks.join("")).length
						if (count >= 1) {
							var fromIndexArray = []
							var fromIndex = current_blocks_list.indexOf(current_blocks.join(""))
							while (fromIndex != -1) {
								fromIndexArray.push(fromIndex)
								fromIndex = current_blocks_list.indexOf(current_blocks.join(""), fromIndex + 1)
							}
							current_blocks.pop()
							current_blocks.push($(standardfileArr[x]).attr("name") + fromIndexArray.length + ":")
						}
					} else {
						var x = block_info_for_count_depth_standardfile[j]
						current_blocks.push($(standardfileArr[x]).attr("name") + ">")
					}
				}
				var depth = block_info_for_count_depth_standardfile.length - 1
				data_info_standardfile["depth" + depth].push("**Block Info**")
				data_info_standardfile["depth" + depth].push(current_blocks.join(""))
				block_info_standardfile.push(current_blocks.join(""))
			} else if (standardfileArr[i].includes("</block>") == true) {
				block_info_for_count_depth_standardfile.pop()
			}
		} else { //Data
			var depth = block_info_for_count_depth_standardfile.length - 1
			switch(depth){
				case -1:
					break
				default:
					data_info_standardfile["depth" + depth].push(i + $(standardfileArr[i]).attr("name") + "=" + $(standardfileArr[i]).text())
			}
		}
	}

	//comparefile의 Block, Data 분석
	for (var i = 0; i < comparefileArr.length; i++) {
		if (comparefileArr[i].includes("block") == true) { //Block
			if ($(comparefileArr[i]).attr("name") == "Second pass") {
				break
			} else if (comparefileArr[i].includes("</block>") == false && $(comparefileArr[i]).attr("name") != undefined) {
				block_info_for_count_depth_comparefile.push(i)
				var current_blocks = []
				for (var j = 0; j < block_info_for_count_depth_comparefile.length; j++) {
					if (j == block_info_for_count_depth_comparefile.length - 1) { //depth에서 가장 마지막(=하위)인 Block
						var x = block_info_for_count_depth_comparefile[j]
						current_blocks.push($(comparefileArr[x]).attr("name") + ":")
						////상위 Block 속 같은 이름의 하위 Block들 처리
						var depth = block_info_for_count_depth_comparefile.length - 1
						var current_blocks_list = []
						for (var z = 0; z < data_info_comparefile["depth" + depth].length; z++) {
							if (data_info_comparefile["depth" + depth][z].includes(":") == true) {
								current_blocks_list.push(data_info_comparefile["depth" + depth][z].replace(/[0-9]/g, ""))
							}
						}
						var count = current_blocks_list.filter(element => element === current_blocks.join("")).length
						if (count >= 1) {
							var fromIndexArray = []
							var fromIndex = current_blocks_list.indexOf(current_blocks.join(""))
							while (fromIndex != -1) {
								fromIndexArray.push(fromIndex)
								fromIndex = current_blocks_list.indexOf(current_blocks.join(""), fromIndex + 1)
							}
							current_blocks.pop()
							current_blocks.push($(comparefileArr[x]).attr("name") + fromIndexArray.length + ":")
						}
					} else {
						var x = block_info_for_count_depth_comparefile[j]
						current_blocks.push($(comparefileArr[x]).attr("name") + ">")
					}
				}
				var depth = block_info_for_count_depth_comparefile.length - 1
				data_info_comparefile["depth" + depth].push("**Block Info**")
				data_info_comparefile["depth" + depth].push(current_blocks.join(""))
				block_info_comparefile.push(current_blocks.join(""))
			} else if (comparefileArr[i].includes("</block>") == true) {
				block_info_for_count_depth_comparefile.pop()
			}
		} else { //Data
			var depth = block_info_for_count_depth_comparefile.length - 1
			switch (depth) {
				case -1:
					break
				default:
					data_info_comparefile["depth" + depth].push(i + $(comparefileArr[i]).attr("name") + "=" + $(comparefileArr[i]).text())
			}
		}
	}

	//standardfile과 comparefile의 Block 비교: BLOCK_MISSING
	BLOCK_MISSING(block_info_standardfile, standardfile_name, "standard", block_info_comparefile, comparefile_name, notEqualIcon)
	BLOCK_MISSING(block_info_comparefile, comparefile_name, "compare", block_info_standardfile, standardfile_name, notEqualIcon)

	var DATA_MISSING_LIST = []
	var DATA_VALUE_MISMATCHING_LIST = []
	for (const key in data_info_standardfile) {
		//standardfile과 comparefile의 Block 비교: BLOCK_LOCATION_MISMATCHING
		BLOCK_LOCATION_MISMATCHING(key, data_info_standardfile, data_info_comparefile, standardfile_name, comparefile_name, notEqualIcon)
		//standardfile과 comparefile의 Data 비교: DATA_MISSING & DATA_VALUE_MISMATCHING
		data_info_standardfile[key] = data_info_standardfile[key].join(",").split("**Block Info**")
		data_info_comparefile[key] = data_info_comparefile[key].join(",").split("**Block Info**")
		for (var i = 0; i < data_info_standardfile[key].length; i++) {
			var slashForStandard = data_info_standardfile[key][i].indexOf(':')
			var blockNameForStandard = data_info_standardfile[key][i].substring(1, slashForStandard)
			var dataListForStandard = data_info_standardfile[key][i].substring(slashForStandard + 2).split(",")
			for (var j = 0; j < data_info_comparefile[key].length; j++) {
				var slashForCompare = data_info_comparefile[key][j].indexOf(":")
				var blockNameForCompare = data_info_comparefile[key][j].substring(1, slashForCompare)
				var dataListForCompare = data_info_comparefile[key][j].substring(slashForCompare + 2).split(",")
				if (blockNameForStandard != "" && blockNameForStandard == blockNameForCompare) {
					//각 Date의 name과 value를 각각의 배열에 저장
					var dataNameForStandard = []
					var dataValueForStandard = []
					for (var z = 0; z < dataListForStandard.length; z++) {
						var slashDataForStandard = dataListForStandard[z].indexOf('=')
						dataNameForStandard.push(dataListForStandard[z].substring(0, slashDataForStandard))
						dataValueForStandard.push(dataListForStandard[z].substring(slashDataForStandard + 1))
					}
					var dataNameForCompare = []
					var dataValueForCompare = []
					for (var z = 0; z < dataListForCompare.length; z++) {
						var slashDataForCompare = dataListForCompare[z].indexOf('=')
						dataNameForCompare.push(dataListForCompare[z].substring(0, slashDataForCompare))
						dataValueForCompare.push(dataListForCompare[z].substring(slashDataForCompare + 1))
					}
					//한 Block 속 같은 이름으로 여러 개 존재하는 Data명 처리를 위해 각 Date의 name을 저장한 배열 복사
					var dataNameForStandardDuplicate = dataNameForStandard.map(element => element.replace(/[0-9]/g, "")).filter(element => element !== "")
					var dataNameForCompareDuplicate = dataNameForCompare.map(element => element.replace(/[0-9]/g, "")).filter(element => element !== "")
					//한 Block 속 같은 이름으로 여러 개 존재하는 Data명 처리
					for (var z = 0; z < dataNameForStandardDuplicate.length; z++) {
						var count = dataNameForStandardDuplicate.filter(element => element === dataNameForStandardDuplicate[z]).length
						if (count >= 2) {
							var fromIndexArray = []
							var fromIndex = dataNameForStandardDuplicate.indexOf(dataNameForStandardDuplicate[z])
							while (fromIndex != -1) {
								fromIndexArray.push(fromIndex)
								fromIndex = dataNameForStandardDuplicate.indexOf(dataNameForStandardDuplicate[z], fromIndex + 1)
							}
							for (var x = 1; x < fromIndexArray.length; x++) {
								dataNameForStandardDuplicate[fromIndexArray[x]] = dataNameForStandardDuplicate[fromIndexArray[x]] + x
							}
						}
					}
					for (var z = 0; z < dataNameForCompareDuplicate.length; z++) {
						var count = dataNameForCompareDuplicate.filter(element => element === dataNameForCompareDuplicate[z]).length
						if (count >= 2) {
							var fromIndexArray = []
							var fromIndex = dataNameForCompareDuplicate.indexOf(dataNameForCompareDuplicate[z])
							while (fromIndex != -1) {
								fromIndexArray.push(fromIndex)
								fromIndex = dataNameForCompareDuplicate.indexOf(dataNameForCompareDuplicate[z], fromIndex + 1)
							}
							for (var x = 1; x < fromIndexArray.length; x++) {
								dataNameForCompareDuplicate[fromIndexArray[x]] = dataNameForCompareDuplicate[fromIndexArray[x]] + x
							}
						}
					}
					//DATA_MISSING
					DATA_MISSING_LIST.push(DATA_MISSING(blockNameForStandard, dataNameForStandard, dataNameForStandardDuplicate, standardfile_name, "standard", dataNameForCompareDuplicate, comparefile_name, notEqualIcon))
					DATA_MISSING_LIST.push(DATA_MISSING(blockNameForCompare, dataNameForCompare, dataNameForCompareDuplicate, comparefile_name, "compare", dataNameForStandardDuplicate, standardfile_name, notEqualIcon))
					//DATA_VALUE_MISMATCHING
					DATA_VALUE_MISMATCHING_LIST.push(DATA_VALUE_MISMATCHING(dataNameForStandard, dataNameForStandardDuplicate, dataValueForStandard, blockNameForStandard, standardfile_name, dataNameForCompare, dataNameForCompareDuplicate, dataValueForCompare, comparefile_name, notEqualIcon))
				}
			}
		}
	}

	//DATA_MISING과 DATA_VALUE_MISMATCHING 표에 출력
	for (var z = 0; z < DATA_MISSING_LIST.length; z++) {
		$('.resultline_2').append(DATA_MISSING_LIST[z])
	}
	for (var z = 0; z < DATA_VALUE_MISMATCHING_LIST.length; z++) {
		$('.resultline_2').append(DATA_VALUE_MISMATCHING_LIST[z])
	}

	// "(기준 파일명)과 (비교 파일명)은 일치합니다/ 일치하지 않습니다." 출력
	var standard_compare_difference = $('.resultline').text()
	var standard_compare_difference_2 = $('.resultline_2').text()
	if (tab_id == "compare_basic") {
		stop
	} else {
		if (standard_compare_difference == '' && standard_compare_difference_2 == '') {
			let line = ''
			line = standardfile_name + ' 와 ' + comparefile_name + ' 는 일치합니다.'
			$('.line').append(line)
		} else {
			let line = ''
			line = standardfile_name + ' 와 ' + comparefile_name + ' 는 일치하지 않습니다.'
			$('.line').append(line)
		}
	}
}

function BLOCK_MISSING(fileA, fileA_name, fileA_type, fileB, fileB_name, notEqualIcon) {
	if (fileB.length != 0 && fileA.filter(x => !fileB.includes(x)).length != 0) {
		var existOnlyOneFile = fileA.filter(x => !fileB.includes(x))
		//상위 Block 속 하위 Block들 처리
		for (var z = 0; z < existOnlyOneFile.length; z++) {
			for (y = z + 1; y < existOnlyOneFile.length; y++) {
				var depthCount1 = (existOnlyOneFile[z].match(/\>/g) || []).length
				var depthCount2 = (existOnlyOneFile[y].match(/\>/g) || []).length
				if (depthCount1 != depthCount2) {
					if (/[0-9]/.test(existOnlyOneFile[z]) == false && existOnlyOneFile[z] != "") {
						if (existOnlyOneFile[y].includes(existOnlyOneFile[z].replaceAll(":", "")) == true) {
							existOnlyOneFile[y] = ""
						}
					} else if (/[0-9]/.test(existOnlyOneFile[z]) == true) {
						if (existOnlyOneFile[y].includes(existOnlyOneFile[z].replaceAll(":", "").slice(0, -1))) {
							if (existOnlyOneFile[y].replaceAll(":", "").slice(-1) == existOnlyOneFile[z].replaceAll(":", "").slice(-1)) {
								existOnlyOneFile[y] = ""
							}
						}
					}
				}
			}
		}
		existOnlyOneFile = existOnlyOneFile.filter(x => x != "")
		for (z = 0; z < existOnlyOneFile.length; z++) {
			//비교 상세 결과 출력
			if (/[0-9]/.test(existOnlyOneFile[z]) == true) {
				var slash = existOnlyOneFile[z].lastIndexOf(">")
				var topBlocks = existOnlyOneFile[z].slice(0, slash)
				var duplicateBlock = existOnlyOneFile[z].slice(slash + 1, -1).replace(/[0-9]/g, '')
				var duplicateBlockNumber = existOnlyOneFile[z].slice(slash + 1, -1).replace(/[^0-9]/g, '')
				var printBlockList = topBlocks + ">(" + duplicateBlockNumber + ") " + duplicateBlock
			} else {
				var printBlockList = existOnlyOneFile[z].replaceAll(":", "")
			}
			let resultline = ''
			if (fileA_type == "standard") {
				resultline = '<tr><td class = "compareresult">[BLOCK_MISSING] ' + printBlockList.replaceAll(">", "<b> &#5171; </b>") + '<br> (' + fileA_name + ') 존재 O ' + notEqualIcon + ' (' + fileB_name + ') 존재 X</td></tr>'
			} else {
				resultline = '<tr><td class = "compareresult">[BLOCK_MISSING] ' + printBlockList.replaceAll(">", "<b> &#5171; </b>") + '<br> (' + fileB_name + ') 존재 X ' + notEqualIcon + ' (' + fileA_name + ') 존재 O</td></tr>'
			}
			$('.resultline').append(resultline)
			//BLOCK_MISSING "초록색"으로 표기
			switch (fileA_type) {
				case "standard":
					var classList = ""
					break
				case "compare":
					var classList = "table.comparefile.current "
					break
			}
			var blockList = existOnlyOneFile[z].replaceAll(" ", "").replaceAll(":", "")
			if (/[0-9]/.test(blockList) == true) {
				var blockListCopy = blockList
				var blockIndex = blockListCopy.replace(/[^0-9]/g, '')
				blockList = blockList.replace(/[0-9]/g, "").split(">")
				for (x = 0; x < blockList.length; x++) {
					classList += "details." + fileA_type + blockList[x] + " "
				}
				var querySelectorAll = document.querySelectorAll(classList)
				querySelectorAll[blockIndex].style.color = "red"
			} else {
				blockList = blockList.split(">")
				for (x = 0; x < blockList.length; x++) {
					classList += "details." + fileA_type + blockList[x] + " "
				}
				document.querySelector(classList).style.color = "red"
			}
		}
	}
}

function BLOCK_LOCATION_MISMATCHING(key, data_info_standardfile, data_info_comparefile, standardfile_name, comparefile_name, notEqualIcon) {
	var depth_block_info_standardfile = []
	var depth_block_info_comparefile = []
	for (var x = 0; x < data_info_standardfile[key].length; x++) {
		if (data_info_standardfile[key][x].includes(":") == true) {
			depth_block_info_standardfile.push(data_info_standardfile[key][x].replaceAll(":", ""))
		}
	}
	for (var x = 0; x < data_info_comparefile[key].length; x++) {
		if (data_info_comparefile[key][x].includes(":") == true) {
			depth_block_info_comparefile.push(data_info_comparefile[key][x].replaceAll(":", ""))
		}
	}
	var commonStandardBlock = depth_block_info_standardfile.filter(x => depth_block_info_comparefile.includes(x))
	var commonCompareBlock = depth_block_info_comparefile.filter(x => depth_block_info_standardfile.includes(x))
	switch (key) {
		case "depth0":
			for (var x = 0; x < commonStandardBlock.length; x++) {
				if (commonCompareBlock.indexOf(commonStandardBlock[x]) != x) {
					//비교 상세 결과 출력
					let resultline = ''
					var posStandard = x + 1
					var posCompare = commonCompareBlock.indexOf(commonStandardBlock[x]) + 1
					resultline = '<tr><td class = "compareresult">[BLOCK_LOCATION_MISMATCHING] ' + commonStandardBlock[x].replaceAll(">", "<b> &#5171; </b>") + '<br>(' + standardfile_name + ') ' + posStandard + '번째 ' + notEqualIcon + ' (' + comparefile_name + ') ' + posCompare + '번째</td></tr>'
					$('.resultline').append(resultline)
					//BLOCK_LOCATION_MISMATCHING "주황색"으로 표기
					classListStandard = "summary.standard" + commonStandardBlock[x].replaceAll(" ", "").replace(/[0-9]/g, "")
					classListCompare = "table.comparefile.current summary.compare" + commonCompareBlock[x].replaceAll(" ", "").replace(/[0-9]/g, "")
					document.querySelector(classListStandard).style.color = "red"
					document.querySelector(classListCompare).style.color = "red"
				}
			}
			break
		default:
			var topBlocksList = []
			for (var x = 0; x < commonStandardBlock.length; x++) {
				var slash = commonStandardBlock[x].lastIndexOf(">")
				var topBlocks = commonStandardBlock[x].slice(0, slash)
				if (topBlocksList.includes(topBlocks) == false) {
					topBlocksList.push(topBlocks)
				}
			}
			if (topBlocksList.length != 0) {
				for (var x = 0; x < topBlocksList.length; x++) {
					var hasSameTopBlocksStandard = []
					var hasSameTopBlocksCompare = []
					for (var y = 0; y < commonStandardBlock.length; y++) {
						if (commonStandardBlock[y].includes(topBlocksList[x]) == true) {
							hasSameTopBlocksStandard.push(commonStandardBlock[y])
						}
						if (commonCompareBlock[y].includes(topBlocksList[x]) == true) {
							hasSameTopBlocksCompare.push(commonCompareBlock[y])
						}
					}
					for (var z = 0; z < hasSameTopBlocksStandard.length; z++) {
						if (hasSameTopBlocksCompare.indexOf(hasSameTopBlocksStandard[z]) != z) {
							//비교 상세 결과 출력
							let resultline = ''
							var posStandard = z + 1
							var posCompare = hasSameTopBlocksCompare.indexOf(hasSameTopBlocksStandard[z]) + 1
							resultline = '<tr><td class = "compareresult">[BLOCK_LOCATION_MISMATCHING] ' + hasSameTopBlocksStandard[z].replaceAll(">", "<b> &#5171; </b>") + '<br>(' + standardfile_name + ') ' + posStandard + '번째 ' + notEqualIcon + ' (' + comparefile_name + ') ' + posCompare + '번째</td></tr>'
							$('.resultline').append(resultline)
							//BLOCK_LOCATION_MISMATCHING 색깔 표기
							var classListStandard = ""
							var classListCompare = "table.comparefile.current "
							var blockList = hasSameTopBlocksStandard[z].replaceAll(" ", "").split(">")
							if (/[0-9]/.test(blockList) == true) {
								var blockListCopy = hasSameTopBlocksStandard[z].replaceAll(" ", "")
								var blockIndex = blockListCopy.replace(/[^0-9]/g, '');
								blockList = hasSameTopBlocksStandard[z].replaceAll(" ", "").replace(/[0-9]/g, "").split(">")
								for (var k = 0; k < blockList.length; k++) {
									classListStandard += "summary.standard" + blockList[k] + " "
									classListCompare += "summary.compare" + blockList[k] + " "
								}
								var querySelectorAllStandard = document.querySelectorAll(classListStandard)
								querySelectorAllStandard[blockIndex].style.color = "red"
								var querySelectorAllCompare = document.querySelectorAll(classListCompare)
								querySelectorAllCompare[blockIndex].style.color = "red"
							} else {
								for (var k = 0; k < blockList.length; k++) {
									if (k == blockList.length - 1) {
										classListStandard += "summary.standard" + blockList[k] + " "
										classListCompare += "summary.compare" + blockList[k] + " "
									} else {
										classListStandard += "details.standard" + blockList[k] + " "
										classListCompare += "details.compare" + blockList[k] + " "
									}
								}
								document.querySelector(classListStandard).style.color = "red"
								document.querySelector(classListCompare).style.color = "red"
							}
						}
					}
				}
			}
			break
	}
}

function DATA_MISSING(fileA_blockName, fileA_dataName, fileA_dataNameDuplicate, fileA_name, fileA_type, fileB_dataNameDuplicate, fileB_name, notEqualIcon) {
	var DATA_MISSING_PRINT = []
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"a-z]/gi
	if (fileA_dataNameDuplicate.filter(x => !fileB_dataNameDuplicate.includes(x)).length != 0) {
		var existOnlyOneFile = fileA_dataNameDuplicate.filter(x => !fileB_dataNameDuplicate.includes(x))
		for (var z = 0; z < existOnlyOneFile.length; z++) {
			if (/[0-9]/.test(existOnlyOneFile[z]) == true) {
				var copy1 = existOnlyOneFile[z]
				var copy2 = existOnlyOneFile[z]
				var order = parseInt(copy1.replace(/[^0-9]/g, '')) + 1
				var dataName = "(" + order + ") " + copy2.replace(/[0-9]/g, '')
				var printText = '<tr><td class = "compareresult">[DATA_MISSING] ' + fileA_blockName.replaceAll(">", "<b> &#5171; </b>") + ' --' + dataName + '<br>'
				printText += '(' + fileA_name + ') 존재 O ' + notEqualIcon + ' (' + fileB_name + ') 존재 X</td></tr>'
				DATA_MISSING_PRINT.push(printText)
			} else {
				var printText = '<tr><td class = "compareresult">[DATA_MISSING] ' + fileA_blockName.replaceAll(">", "<b> &#5171; </b>") + ' --' + existOnlyOneFile[z] + '<br>'
				printText += '(' + fileA_name + ') 존재 O ' + notEqualIcon + ' (' + fileB_name + ') 존재 X</td></tr>'
				DATA_MISSING_PRINT.push(printText)
			}
			//DATA_MISSING "파란색"으로 표기
			var differenceIndex = fileA_dataName[fileA_dataNameDuplicate.indexOf(existOnlyOneFile[z])].split(" ")[0].replace(regExp, "")
			switch (fileA_type) {
				case "standard":
					document.getElementById(fileA_type + differenceIndex).style.color = "red"
					break
				case "compare":
					document.querySelector("table.comparefile.current #" + fileA_type + differenceIndex).style.color = "red"
					break
			}
		}
	}
	return DATA_MISSING_PRINT
}

function DATA_VALUE_MISMATCHING(dataNameForStandard, dataNameForStandardDuplicate, dataValueForStandard, blockNameForStandard, standardfile_name, dataNameForCompare, dataNameForCompareDuplicate, dataValueForCompare, comparefile_name, notEqualIcon) {
	var DATA_VALUE_MISMATCHING_PRINT = []
	var onlyStandard = dataNameForStandardDuplicate.filter(x => !dataNameForCompareDuplicate.includes(x))
	var onlyCompare = dataNameForCompareDuplicate.filter(x => !dataNameForStandardDuplicate.includes(x))
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"a-z]/gi
	for (var z = 0; z < dataNameForStandardDuplicate.length; z++) {
		var compareIndex = dataNameForCompareDuplicate.indexOf(dataNameForStandardDuplicate[z])
		if (dataValueForStandard[z] != dataValueForCompare[compareIndex]) {
			if (/[0-9]/.test(dataNameForStandardDuplicate[z]) == true) {
				var copy1 = dataNameForStandardDuplicate[z]
				var copy2 = dataNameForStandardDuplicate[z]
				var order = parseInt(copy1.replace(/[^0-9]/g, '')) + 1
				var dataName = "(" + order + ") " + copy2.replace(/[0-9]/g, '')
				var printText = '<tr><td class = "compareresult">[DATA_VALUE_MISMATCHING] ' + blockNameForStandard.replaceAll(">", "<b> &#5171; </b>") + ' --' + dataName + '<br>'
				printText += '(' + standardfile_name + ') :: ' + dataValueForStandard[z] + ' ' + notEqualIcon + ' (' + comparefile_name + ') :: ' + dataValueForCompare[compareIndex] + '</td></tr>'
				DATA_VALUE_MISMATCHING_PRINT.push(printText)
			} else {
				var printText = '<tr><td class = "compareresult">[DATA_VALUE_MISMATCHING] ' + blockNameForStandard.replaceAll(">", "<b> &#5171; </b>") + ' --' + dataNameForStandardDuplicate[z] + '<br>'
				printText += '(' + standardfile_name + ') :: ' + dataValueForStandard[z] + ' ' + notEqualIcon + ' (' + comparefile_name + ') :: ' + dataValueForCompare[compareIndex] + '</td></tr>'
				DATA_VALUE_MISMATCHING_PRINT.push(printText)
			}
			//DATA_VALUE_MISMATCHING "빨간색"으로 표기
			if (onlyStandard.includes(dataNameForStandardDuplicate[z]) === false && dataNameForStandard[dataNameForStandardDuplicate.indexOf(dataNameForStandardDuplicate[z])] != undefined) {
				var differenceIndexForStandard = dataNameForStandard[dataNameForStandardDuplicate.indexOf(dataNameForStandardDuplicate[z])].split(" ")[0].replace(regExp, "")
				document.getElementById('standard' + differenceIndexForStandard).style.color = "orange"
			}
			if (onlyCompare.includes(dataNameForCompareDuplicate[z]) === false && dataNameForCompare[dataNameForCompareDuplicate.indexOf(dataNameForCompareDuplicate[compareIndex])] != undefined) {
				var differenceIndexForCompare = dataNameForCompare[dataNameForCompareDuplicate.indexOf(dataNameForCompareDuplicate[compareIndex])].split(" ")[0].replace(regExp, "")
				document.querySelector("table.comparefile.current #compare" + differenceIndexForCompare).style.color = "orange"
			}
		}
	}
	return DATA_VALUE_MISMATCHING_PRINT
}