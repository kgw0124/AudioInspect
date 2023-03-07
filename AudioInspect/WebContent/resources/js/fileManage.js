/* 기준 파일 */
var standardfilesArr = new Array()
var standardfilesData = {
	fileName: [],
	semiMetaData: [],
	metaData: []
}
function standard_addFile(fileLocation, files) {
	// 첨부파일 개수 확인
	if (standardfilesArr.length > 0) {
		alert("기준 파일은 최대 1개 까지 첨부 가능합니다.");
	} else {
		switch (fileLocation) {
			case "DB":
				standardfilesArr.push({ name: files[0].fileName })
				standardfilesData.fileName.push(files[0].fileName)
				$('.standard_name').append(files[0].fileName)
				$('.standard_size').append(files[0].fileSize)
				$('.standard_fileType').append(files[0].fileType)
				$('.standard_location').append(files[0].fileLocation)
				break
			case "local":
				for (const file of files) {
					// 파일 배열에 담기
					var reader = new FileReader()
					reader.onload = function() {
						standardfilesArr.push(file)
						standardfilesData.fileName.push(file.name)
					};
					reader.readAsDataURL(file)
					// 목록 추가
					$('.standard_name').append(file.name)
					$('.standard_size').append(returnFileSize(file.size))
					$('.standard_fileType').append(file.type)
					$('.standard_location').append("파일 탐색기")
					return true
				}
				break
		}
	}
}

function standard_deleteFile() {
	standardfilesArr = []
	standardfilesData = {
		fileName: [],
		semiMetaData: [],
		metaData: []
	}
}

//input 클릭으로 파일 받았을 때
$(document).on("change", "div#selectStandardFileLocation div#selectStandardFileLocationContent div input#standardfilebox", function(e) {
	standard_addFile("local", e.target.files)
	dropZone.classList.add("active")
	//handleFiles(): SemiMetaData.js에서, StandMetaData(): MetaData.js에서 호출
	handleFiles(e.target.files)
	StandMetaData(e.target.files)
	//selectStandardFileLocation Modal Window 삭제
	var selectStandardFileLocation = document.querySelector("#selectStandardFileLocation")
	document.body.removeChild(selectStandardFileLocation)
})

//drag&drop으로 파일 받았을 때
var dropZone = document.querySelector("#standardfile")
var toggleClass = function(className) {
	var list = ["dragenter", "dragleave", "dragover", "drop"]
	for (var i = 0; i < list.length; i++) {
		if (className === list[i]) {
			dropZone.classList.add("drop-zone-" + list[i])
		} else {
			dropZone.classList.remove("drop-zone-" + list[i])
		}
	}
}
// 드래그한 파일이 최초로 진입했을 때
dropZone.addEventListener("dragenter", function(e) {
	e.stopPropagation()
	e.preventDefault()
	toggleClass("dragenter")
	e.target.style.opacity = 0.3;

})
// 드래그한 파일이 dropZone 영역을 벗어났을 때
dropZone.addEventListener("dragleave", function(e) {
	e.stopPropagation()
	e.preventDefault()
	e.target.style.opacity = 1.0;
	toggleClass("dragleave")

})
// 드래그한 파일이 dropZone 영역에 머물러 있을 때
dropZone.addEventListener("dragover", function(e) {
	e.stopPropagation()
	e.preventDefault()
	toggleClass("dragover")
	e.target.style.opacity = 0.3;

})
dropZone.addEventListener("drop", function(e) {
	e.preventDefault()
	toggleClass("drop")
	e.target.style.opacity = 1.0
	file = e.dataTransfer && e.dataTransfer.files
	standard_addFile("local", file)
	//handleFiles(): SemiMetaData.js에서, StandMetaData(): MetaData.js에서 호출
	handleFiles(file)
	StandMetaData(file)
})

/* 비교 파일 */
var fileList = [];
var comparefilesArr = new Array();
var comparefilesData = {
	fileName: [],
	semiMetaData: [],
	metaData: []
}
var comparefile_numb = 1;
function compare_addFile(fileLocation, files) {
	for (const file of files) {
		if (standardfilesArr.length == 0) {
			alert("Standard file을 먼저 선택해 주세요");
			$("#comparefilebox").val("");
			document.querySelector("input[type=file]").value = "";
			compare_deleteFile();
		}
		// 첨부파일 검증
		else {
			var filename
			switch (fileLocation) {
				case "DB":
					if (compare_checkDuplicate(file.fileName)) {
						comparefilesArr.push({ name: file.fileName })
						comparefilesData.fileName.push(file.fileName)
						$(".removetr").remove();
						if (file.fileName == files[files.length - 1].fileName) {
							var compare_infos = '<tr name = "trStaff" class = "trline" id = "trline">'
							compare_infos += '<td class = "filenum" style="background: lightgrey; font-weight:bold">' + "Compare file " + comparefile_numb + '</td>'
							comparefile_numb++
							compare_infos += '<td style="background: lightgrey; font-weight:bold" id = "' + file.fileName + '">' + file.fileName + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">' + file.fileSize + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">' + file.fileType + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">' + file.fileLocation + '</td>'
							compare_infos += '</tr>'
							$('#filelisttable_body').append(compare_infos)
						} else {
							var compare_infos = '<tr name = "trStaff" class = "trline" id = "trline">'
							compare_infos += '<td class = "filenum">' + "Compare file " + comparefile_numb + '</td>'
							comparefile_numb++
							compare_infos += '<td id = "' + file.fileName + '">' + file.fileName + '</td>'
							compare_infos += '<td>' + file.fileSize + '</td>'
							compare_infos += '<td>' + file.fileType + '</td>'
							compare_infos += '<td>' + file.fileLocation + '</td>'
							compare_infos += '</tr>'
							$('#filelisttable_body').append(compare_infos)
						}
						$('ul.compare_tabs li').removeClass('current')
						$('div.compare_context table').removeClass('current')
						filename = file.fileName.replaceAll(" ", "").replaceAll(".", "")
						//탭메뉴 추가
						var compare_tabs = '<li id="cpdelete" class="tab-link current";  data-tab="' + filename + '">' + file.fileName + '<button id = "buttonhover" class="buttonhover" name = "tabdelete">X</button></li>';
						$('.compare_tabs').append(compare_tabs);
					}
					break
				case "local":
					if (compare_checkDuplicate(file)) {
						// 파일 배열에 담기
						var reader = new FileReader();
						reader.onload = function() {
							comparefilesArr.push(file);
							comparefilesData.fileName.push(file.name)
						};
						reader.readAsDataURL(file);
						$(".removetr").remove();
						if (file.name == files[files.length - 1].name) {
							var compare_infos = '<tr name = "trStaff" class = "trline" id = "trline">'
							compare_infos += '<td class = "filenum" style="background: lightgrey; font-weight:bold">' + "Compare file " + comparefile_numb + '</td>'
							comparefile_numb++
							compare_infos += '<td style="background: lightgrey; font-weight:bold" id = "' + file.name + '">' + file.name + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">' + returnFileSize(file.size) + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">' + file.type + '</td>'
							compare_infos += '<td style="background: lightgrey; font-weight:bold">파일 탐색기</td>'
							compare_infos += '</tr>'
							$('#filelisttable_body').append(compare_infos)
						} else {
							var compare_infos = '<tr name = "trStaff" class = "trline" id = "trline">'
							compare_infos += '<td class = "filenum">' + "Compare file " + comparefile_numb + '</td>'
							comparefile_numb++
							compare_infos += '<td id = "' + file.name + '">' + file.name + '</td>'
							compare_infos += '<td>' + returnFileSize(file.size) + '</td>'
							compare_infos += '<td>' + file.type + '</td>'
							compare_infos += '<td>파일 탐색기</td>'
							compare_infos += '</tr>'
							$('#filelisttable_body').append(compare_infos)
						}
						$('ul.compare_tabs li').removeClass('current')
						$('div.compare_context table').removeClass('current')
						filename = file.name.replaceAll(" ", "").replaceAll(".", "")
						//탭메뉴 추가
						var compare_tabs = '<li id="cpdelete" class="tab-link current";  data-tab="' + filename + '">' + file.name + '<button id = "buttonhover" class="buttonhover" name = "tabdelete">X</button></li>';
						$('.compare_tabs').append(compare_tabs);
					}
					break
			}
			//파일 별로 mediainfo 결과창 추가
			let compare_context = '';
			compare_context += '<table id="' + filename + '" class="comparefile current"></table>';
			//tabmenu.js없어져서 getCompareResults.js로 변경
			compare_context += '<script src="resources/js/getCompareResults.js"></script>';
			$('.compare_context').append(compare_context);
			//탭메뉴 파일명 옆 X로 지우기
			$('ul.compare_tabs li').on("click", "button[name=tabdelete]", function() {
				//현재 누른 탭메뉴의 파일명 불러와서 삭제
				var compare_tabs_data = $(this).parent();
				compare_tabs_data.remove();
				var t = compare_tabs_data[0].innerText;
				var a = t.replaceAll(" ", "").replaceAll('.', '').slice(0, -1);
				//tab내용 지우기
				if (compare_tabs_data[0].classList.value == "tab-link current") {
					var compare_context = $(".comparefile.current");
					compare_context.remove();
				}
				else {
					for (var r = 0; r < $(".comparefile").length; r++) {
						var comparefile_del = $(".comparefile")[r];
						if (a == comparefile_del.id) {
							var b = comparefile_del;
							b.remove();
						}
					}
				}
				var deletename = t.replace("X", "");
				//삭제한 탭메뉴의 파일을 comparefilesArr, comparefilesData에서도 삭제
				var deleteIndex = comparefilesArr.findIndex(x => x.name == deletename)
				comparefilesArr.splice(deleteIndex, 1)
				comparefilesData.fileName.splice(deleteIndex, 1)
				comparefilesData.semiMetaData.splice(deleteIndex, 1)
				comparefilesData.metaData.splice(deleteIndex, 1)
				//탭메뉴의 파일명과 filelist의 파일명이 같은지 확인하고 삭제
				for (var r = 1; r < ($(".trline").length) + 1; r++) {
					var filelist_filename = document.getElementById("filelisttable_body").getElementsByTagName("tr");
					var cell = filelist_filename[r].cells[1].innerText;
					//탭메뉴의 파일명을 text로 불러와서 삭제버튼인 X도 같이 출력되어 filelist에도 X를 붙이고 같은지 확인
					cell += "X";
					if (t == cell) {
						//console.log(filelist_filename);
						//console.log(cell);
						var deletecel = filelist_filename[r].cells[1].parentElement;
						deletecel.remove();
					}
					//result부분 삭제
					$(".resultline").empty();
					$(".resultline_2").empty();
					$(".line").empty();
					$("#comparefilebox").val("");
				}
				//filelist No. 삭제 시 번호 다시 세기
				for (var i = 0; i < $(".trline").length; i++) {
					$(".trline")[i].cells[0].innerHTML = '<td class = "filenum">' + "Compare file " + (i + 1) + '</td>';
				}
				//삭제 후 파일을 다시 넣으려면 comparefile_numb를 바꿔줘야 함
				comparefile_numb = $(".trline").length + 1
			})
			//current tab 클릭시 filelist에 표시
			$('ul.compare_tabs li').click(function() {
				var compare_tabs = $(".tab-link.current").text()
				for (var r = 1; r < ($(".trline").length) + 1; r++) {
					var filelist_filename = document.getElementById("filelisttable_body").getElementsByTagName("tr")
					var cell = filelist_filename[r].cells[1].innerText;
					//탭메뉴의 파일명을 text로 불러와서 삭제버튼인 X도 같이 출력되어 filelist에도 X를 붙이고 같은지 확인
					cell += "X"
					if (compare_tabs == cell) {
						for (var i = 0; i < 5; i++) {
							var currenttab = filelist_filename[r].cells[i]
							currenttab.style.backgroundColor = "lightgrey"
							currenttab.style.fontWeight = "bold"
						}
					}
					else {
						for (var i = 0; i < 5; i++) {
							var currenttab = filelist_filename[r].cells[i]
							currenttab.style.backgroundColor = "white"
							currenttab.style.fontWeight = "normal"
						}
					}
				}
			})
		}
	}
}

//input 클릭으로 파일 받았을 때
$(document).on("change", "div#selectCompareFileLocation div#selectCompareFileLocationContent div input#comparefilebox", function(e) {
	compare_addFile("local", e.target.files)
	comparedropZone.classList.add("active");
	//comparehandleFiles(): SemiMetaData.js에서, CompMetaData(): MetaData.js에서 호출
	for (var i = 0; i < e.target.files.length; i++) {
		CompMetaData(e.target.files[i])
		function trigerclick() {
			$('.tab-link.current').trigger("click")
		}
		setTimeout(trigerclick, 3000)
	}
	comparehandleFiles(e.target.files)
	function trigerclick() {
		$('.tab-link.current').trigger("click")
	}
	setTimeout(trigerclick, 3000)
	//selectCompareFileLocation Modal Window 삭제
	var selectCompareFileLocation = document.querySelector("#selectCompareFileLocation")
	document.body.removeChild(selectCompareFileLocation)
})

//drag&drop으로 파일 받았을 때
var comparedropZone = document.querySelector("#compare_context")
var comparetoggleClass = function(className) {
	//console.log("current event: " + className)
	var list = ["dragenter", "dragleave", "dragover", "drop"]
	for (var i = 0; i < list.length; i++) {
		if (className === list[i]) {
			comparedropZone.classList.add("drop-zone-" + list[i])
		} else {
			comparedropZone.classList.remove("drop-zone-" + list[i])
		}
	}
}
// 드래그한 파일이 최초로 진입했을 때
comparedropZone.addEventListener("dragenter", function(e) {
	e.stopPropagation()
	e.preventDefault()
	comparetoggleClass("dragenter")
	e.target.style.opacity = 0.3;

})
// 드래그한 파일이 dropZone 영역을 벗어났을 때
comparedropZone.addEventListener("dragleave", function(e) {
	e.stopPropagation()
	e.preventDefault()
	comparetoggleClass("dragleave")
	e.target.style.opacity = 1.0;
})
// 드래그한 파일이 dropZone 영역에 머물러 있을 때
comparedropZone.addEventListener("dragover", function(e) {
	e.stopPropagation()
	e.preventDefault()
	comparetoggleClass("dragover")
	e.target.style.opacity = 0.3;
})
comparedropZone.addEventListener("drop", function(e) {
	e.preventDefault()
	toggleClass("drop")
	e.target.style.opacity = 1.0
	file = e.dataTransfer && e.dataTransfer.files
	compare_addFile("local", file)
	//comparehandleFiles(): SemiMetaData.js에서, CompMetaData(): MetaData.js에서 호출
	for (var i = 0; i < file.length; i++) {
		CompMetaData(file[i])
		function trigerclick() {
			$('.tab-link.current').trigger("click")
		}
		setTimeout(trigerclick, 3000)
	}
	comparehandleFiles(file)
	function trigerclick() {
		$('.tab-link.current').trigger("click")
	}
	setTimeout(trigerclick, 3000)
})

function compare_deleteFile() {
	comparefilesArr = [];
	comparefilesData = {
		fileName: [],
		semiMetaData: [],
		metaData: []
	};
}

function compare_checkDuplicate(obj) {
	var filelist_filename = document.getElementById("filelisttable_body").getElementsByTagName("tr");
	if ($(".trline").length == 0) {
		return true;
	}
	else {
		for (var r = 1; r < $(".trline").length + 1; r++) {
			var cell = filelist_filename[r].cells[1].innerText;
			if (obj.name == cell) {
				alert(obj.name + "은 이미 선택하신 비교 파일입니다.");
				return false;
			}
		} return true;
	}
}

/* 첨부파일 검증 */
function validation(obj) {
	const fileTypes = ['audio/m4a', 'audio/x-m4a'];
	if (obj.name.lastIndexOf('.') == -1) {
		alert("확장자가 없는 파일은 제외되었습니다.");
		return false;
	} else if (!fileTypes.includes(obj.type)) {
		alert("m4a 파일만 첨부 가능합니다.");
		return false;
	} else {
		return true;
	}

}

/* 파일 사이즈 계산 */
function returnFileSize(number) {
	if (number < 1024) {
		return number + 'bytes';
	} else if (number > 1024 && number < 1048576) {
		return (number / 1024).toFixed(1) + 'KB';
	} else if (number > 1048576) {
		return (number / 1048576).toFixed(1) + 'MB';
	}
}

//전체 삭제
$('#reset').click(function() {
	var answer;
	answer = confirm("초기화 하시겠습니까?")
	if (answer == true) {
		$(".standard_name").empty();
		$(".standard_size").empty();
		$(".standard_fileType").empty();
		$(".standard_location").empty();
		$("#standardfile").empty();
		$("#standardfile").val("");
		$('.line').val("");
		$(".resultline").empty();
		$(".resultline_2").empty();
		$(".line").empty();
		standard_deleteFile();
		$("#comparefilebox").val("");
		compare_deleteFile();

		for (var r = 1; r < ($(".tab-link").length) + 1; r++) {
			$(".tab-link").remove();
		}
		//tab내용 지우기
		var compare_context = $(".comparefile.current");
		compare_context.remove();
		var compare_contextAll = $(".comparefile");
		compare_contextAll.remove();
		for (var r = 1; r < ($(".trline").length) + 1; r++) {
			$(".trline").remove();
		}
		//삭제 후 파일을 다시 넣으려면 comparefile_numb를 바꿔줘야 함
		comparefile_numb = $(".trline").length + 1;
	}
})