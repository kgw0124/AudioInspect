var inputFileType
var beSelectedFileForStandard = []
var beSelectedFileForCompare = []

function modal_view() {
	//초기화
	beSelectedFileForStandard = []
	beSelectedFileForCompare = []
	if (document.querySelector("#selectStandardFileLocation")) {
		var selectStandardFileLocation = document.querySelector("#selectStandardFileLocation")
		inputFileType = "standard"
		document.body.removeChild(selectStandardFileLocation)
	} else if (document.querySelector("#selectCompareFileLocation")) {
		var selectCompareFileLocation = document.querySelector("#selectCompareFileLocation")
		inputFileType = "compare"
		document.body.removeChild(selectCompareFileLocation)
	}
	const DB_html =
		`<script src="https://kit.fontawesome.com/a4a9a94dd2.js" crossorigin="anonymous"></script>
          <div id="selectFileDatabase">
           <div id="selectFileDatabaseContent">
               <div>
                  <button class="btn btn-danger" id="quit">X</button>
                  <button class = "selectdelete">선택 초기화</button>
               </div>
               <h4 class="top">
                  AudioInspect DB 선택
               </h4>
               <div class="menu-div">
                  <ul class="menu-style">
                     <li class="menu"><i class="fa-duotone fa-play"></i><a>디바이스 제조사 설정</a>
                        <ul class="hide">
                           <li class = "select-text">검색할 제조사를 선택해주세요.</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "manuAll" onclick = "manuclick()">전체보기</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "Samsung" id = "nonck" onclick = "manuclick()">Samsung</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "LG" id = "nonck" onclick = "manuclick()">LG</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "Apple" id = "nonck" onclick = "manuclick()">Apple</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "Xiaomi" id = "nonck" onclick = "manuclick()">샤오미</li>
                           <li class = "select-list"><input type="checkbox" class ="manufacturerlist" name = "Huawei" id = "nonck" onclick = "manuclick()">화웨이</li>
                        </ul>
                     </li>
                     <li class="menu"><i class="fa-duotone fa-play"></i><a>원본/편집 설정</a>
                        <ul class="hide">
                           <li class = "select-text">표시할 파일의 원본/편집 여부를 선택해주세요.</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist" name = "selectAll" onclick = "manuclick()">전체 파일 보기</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist" name = "selectorigin" id = 'editnonck' onclick = "manuclick()">원본 파일만 보기</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist" name = "edit" id = 'editnonck' onclick = "manuclick()">편집 파일만 보기</li>
                           <hr>
                           <li class = "select-text">편집 소프트웨어 설정</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "selectedit" onclick = "manuclick()">전체 보기</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Builtin" id = 'sweditnonck' onclick = "manuclick()">자체 탑제 소프트웨어 편집 본</li>
                           <li class = "select-text">PC 기반 소프트웨어</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Gold wave" id = 'sweditnonck' onclick = "manuclick()">Gold wave</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Wave pad" id = 'sweditnonck' onclick = "manuclick()">Wave pad</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Audacity" id = 'sweditnonck' onclick = "manuclick()">Audacity</li>
                           <li class = "select-text">안드로이드 기반 소프트웨어</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "302 lock screen" id = 'sweditnonck' onclick = "manuclick()">302 lock screen</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "inshot inc." id = 'sweditnonck' onclick = "manuclick()">inshot inc.</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Recorder & smart apps" id = 'sweditnonck' onclick = "manuclick()">recoder & smart apps</li>
                           <li class = "select-text">iOS 기반 소프트웨어</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Garageband" id = 'sweditnonck' onclick = "manuclick()">Garageband</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Lexis Audio Editor" id = 'sweditnonck' onclick = "manuclick()">Lexis Audio Editor</li>
                           <li class = "select-list"><input type="checkbox" class ="editlist2" name = "Wave pad mobile" id = 'sweditnonck' onclick = "manuclick()">Wave pad mobile</li>
                        </ul>
                     </li>
                     <li class="menu"><i class="fa-duotone fa-play"></i><a>검색 키워드 설정</a>
                        <ul class="hide">
                           <li class = "select-text">검색 키워드와 검색 옵션을 선택해주세요.</li>
                           <hr>
                           <li class = "select-text">검색 키워드</li>
                           <li class = "select-list"><input type="text" class="search_text" placeholder="검색 키워드를 입력해주세요."></li>
                           <li class = "select-list"><input type="button" class = "search_button" value="검색 키워드 적용" onclick = "manuclick()"></li>
                           <hr>
                           <li class = "select-text">검색 옵션</li>
                           <li class = "select-list"><input type="checkbox" class ="text_search" name = "file_name" id = "file_name" onclick = "manuclick()">파일 이름으로 검색</li>
                           <li class = "select-list"><input type="checkbox" class ="text_search" name = "record_device" id = "record_device" onclick = "manuclick()">녹음 모델명으로 검색</li>
                           <li class = "select-list"><input type="checkbox" class ="text_search" name = "record_device_num" id = "record_device_num" onclick = "manuclick()">녹음 모델 넘버로 검색</li>
                        </ul>
                     </li>
                     <li class="menu"><i class="fa-duotone fa-play"></i><a>OS 설정</a>
                        <ul class="hide">
                           <li class = "select-text">OS 종류</li>
                           <li class = "select-text">디바이스 제조사 선택 시 OS 종류는 자동으로 선택됩니다.</li>
                           <li class = "select-list"><input type="checkbox" class ="OSlist" name = "OSAll" onclick = "manuclick()">전체 보기</li>
                           <li class = "select-list"><input type="checkbox" class ="OSlist" name = "Android" id = "OSnonck"  onclick = "manuclick()">Android</li>
                           <li class = "select-list"><input type="checkbox" class ="OSlist" name = "iOS" id = "OSnonck"  onclick = "manuclick()">iOS</li>
                           <hr>
                           <li class = "select-text">OS 버전</li>
                           <li class = "select-text">현재 검색 결과에 나타나는 버전만 출력됩니다.</li>
                           <li class = "select-list"><input type="checkbox" class ="OSlist" name = "OSAll"  onclick = "manuclick()">전체 보기</li>
                           <li class = "select-list"><input type="checkbox" class = "select_OS" onchange = "OS_number()">OS 버전 선택
                           <select class = "selectOS" onchange = "OS_number()">
                           <option value = "7.0" class = "Android">Android 7.0</option>
                           <option value = "6.0" class = "Android">Android 6.0</option>
                           <option value = "8.0" class = "Android">Android 8.0</option>
                           <option value = "5.1.1" class = "Android">Android 5.1.1</option>
                           <option value = "8.1" class = "Android">Android 8.1</option>
                           <option value = "7.1.2" class = "Android">Android 7.1.2</option>
                           <option value = "9" class = "Android">Android 9</option>
                           <option value = "2.3.6" class = "Android">Android 2.3.6</option>
                           <option value = "4.2.2" class = "Android">Android 4.2.2</option>
                           <option value = "4.0.4" class = "Android">Android 4.0.4</option>
                           <option value = "4.1.2" class = "Android">Android 4.1.2</option>
                           <option value = "4.4.2" class = "Android">Android 4.4.2</option>
                           <option value = "2.2.1" class = "Android">Android 2.2.1</option>
                           <option value = "5.0.1" class = "Android">Android 5.0.1</option>
                           <option value = "10" class = "Android">Android 10</option>
                           <option value = "11" class = "Android">Android 11</option>
                           <option value = "6.0.1" class = "Android">Android 6.0.1</option>
                           <option value = "4.3" class = "Android">Android 4.3</option>
                           <option value = "4.4.4" class = "Android">Android 4.4.4</option>
                           <option value = "5.0" class = "Android">Android 5.0</option>
                           <option value = "4.0.3" class = "Android">Android 4.0.3</option>
                           <option value = "9.0" class = "Android">Android 9.0</option>
                           <option value = "8.0.1" class = "Android">Android 8.0.1</option>
                           <option value = "13.3.1" class = "iOS">iOS 13.3.1</option>
                           <option value = "13.4.1" class = "iOS">iOS 13.4.1</option>
                           <option value = "14.2" class = "iOS">iOS 14.2</option>
                           <option value = "14.2.1" class = "iOS">iOS 14.2.1</option>
                           <option value = "7.1.1" class = "iOS">iOS 7.1.1</option>
                           <option value = "9.0.2" class = "iOS">iOS 9.0.2</option>
                           <option value = "8.0.2" class = "iOS">iOS 8.0.2</option>
                           <option value = "8.1.2" class = "iOS">iOS 8.1.2</option>
                           <option value = "10.1.1" class = "iOS">iOS 10.1.1</option>
                           <option value = "10.2" class = "iOS">iOS 10.2</option>
                           <option value = "11.3" class = "iOS">iOS 11.3</option>
                           <option value = "13.5.1" class = "iOS">iOS 13.5.1</option>
                           <option value = "14" class = "iOS">iOS 14</option>
                           <option value = "13.7" class = "iOS">iOS 13.7</option>
                           <option value = "12.1.3" class = "iOS">iOS 12.1.3</option>
                           <option value = "12.4" class = "iOS">iOS 12.4</option>
                           <option value = "11.2.6" class = "iOS">iOS 11.2.6</option>
                           <option value = "11.0.3" class = "iOS">iOS 11.0.3</option>
                           <option value = "14.0.1" class = "iOS">iOS 14.0.1</option>
                           <option value = "13.2.3" class = "iOS">iOS 13.2.3</option>
                           <option value = "13.3" class = "iOS">iOS 13.3</option>
                           </select></li>
                           <li class = "select-list"><input type="checkbox" class = "input_OS" onclick = "OS_number2()">직접 입력<input type="text" class="search" onkeyup = "OS_number2()" placeholder="ex) 13.3"></li>
                        </ul>
                     </li>
                     <li class="menu"><i class="fa-duotone fa-play"></i><a>녹음 모드 선택</a>
                        <ul class="hide">
                           <li class = "select-list"><input type="checkbox" class = "recordlist" name = "recordAll" onclick = "recordclick()">전체 보기</li>
                           <hr>
                           <li class = "select-list">녹음 모드
                           <select class = "recordmode" onclick = "recordmode()">
                           <option value = "recordmode_All">전체보기</option>
                           <option value = "음악">음악</option>
                           <option value = "대화">대화</option>
                           <option value = "5min">5min</option>
                           <option value = "일반">일반</option>
                           <option value = "뮤직">뮤직</option>
                           <option value = "기본(pause 포함)">기본(pause 포함)</option>
                           <option value = "5분">5분</option>
                           <option value = "음성 녹음">음성 녹음</option>
                           <option value = "콘서트">콘서트</option>
                           <option value = "회의">회의</option>
                           <option value = "압축">압축</option>
                           <option value = "X">X</option>
                           <option value = "사용자 설정">사용자 설정</option>
                           <option value = "보이스">보이스</option>
                           <option value = "음성녹음">음성녹음</option>
                           <option value = "HD">HD</option>
                           <option value = "기본">기본</option>
                           <option value = "무손실">무손실</option>
                           <option value = "인터뷰">인터뷰</option>
                           <option value = "통화 녹음">통화 녹음</option>
                           <option value = "기본(북마크 포함)">기본(북마크 포함)</option>
                           </select></li>
                           <li class = "select-list">녹음 퀄리티
                           <select class = "recordQ" onclick = "recordmode()">
                           <option value = "recordQ_All">전체보기</option>
                           <option value = "고품질">고품질</option>
                           <option value = "보통">보통</option>
                           <option value = "보통(~100kbit&s, ~45MB&h)">보통(~100kbit&s, ~45MB&h)</option>
                           <option value = "일반">일반</option>
                           <option value = "낮음(~75kbit&s, ~32MB&h)">낮음(~75kbit&s, ~32MB&h)</option>
                           <option value = "24bit&176.4kHz">24bit&176.4kHz</option>
                           <option value = "낮음">낮음</option>
                           <option value = "16bit&176.4kHz">16bit&176.4kHz</option>
                           <option value = "24bit&96kHz">24bit&96kHz</option>
                           <option value = "16bit&192kHz">16bit&192kHz</option>
                           <option value = "16bit&48kHz">16bit&48kHz</option>
                           <option value = "16bit&88.2kHz">16bit&88.2kHz</option>
                           <option value = "보통(default)">보통(default)</option>
                           <option value = "X">X</option>
                           <option value = "통화 녹음">통화 녹음</option>
                           <option value = "MMS첨부용">MMS첨부용</option>
                           <option value = "24bit&88.2kHz">24bit&88.2kHz</option>
                           <option value = "높음">높음</option>
                           <option value = "24bit&192kHz">24bit&192kHz</option>
                           <option value = "높음(~192kbit&s, ~90MB&h)">높음(~192kbit&s, ~90MB&h</option>
                           <option value = "16bit&96kHz">16bit&96kHz</option>
                           <option value = "24bit&44.1kHz">24bit&44.1kHz</option>
                           <option value = "24bit&48kHz">24bit&48kHz</option>
                           <option value = "저음질">저음질</option>
                           <option value = "고음질">고음질</option>
                           <option value = "메시지 첨부용">메시지 첨부용</option>
                           </select></li>
                        </ul>
                    </li>
                  </ul>
               </div>
               <hr>
                <span>검색 결과</span>
                <div class="result-div">
                  <table class = "result-style">
                     <thead>
                        <th class="result-style_th" style="width: 4%; background-color: lightgray">No.</th>
                        <th class="result-style_th" style="width: 24%; background-color: lightgray">파일명</th>
                        <th class="result-style_th" style="width: 9%; background-color: lightgray">확장자</th>
                        <th class="result-style_th" style="width: 12%; background-color: lightgray">모델명</th>
                        <th class="result-style_th" style="width: 12%; background-color: lightgray">모델 넘버</th>
                        <th class="result-style_th" style="width: 12%; background-color: lightgray">os 정보</th>
                        <th class="result-style_th" style="width: 12%; background-color: lightgray">녹음 모드</th>
                        <th class="result-style_th" style="width: 13%; background-color: lightgray">편집 정보</th>
                    </thead>
                    <tbody class = "result_list">
                    </tbody>
                  </table>
               </div>
               <div>
                  <button onclick='submit()'>선택 완료</button>
               </div>               
            </div>
      </div>`
	const dom = new DOMParser().parseFromString(DB_html, 'text/html')
	const selectFileDatabase = dom.querySelector("#selectFileDatabase")
	document.body.appendChild(selectFileDatabase)
	//X 버튼 클릭 시, Modal Window 사라짐.
	selectFileDatabase.querySelector("#quit").addEventListener("click", () => {
		document.body.removeChild(selectFileDatabase)
	})
	//Modal Window 외부 클릭 시, Modal Window 사라짐.
	window.addEventListener('click', (e) => {
		e.target === selectFileDatabase ? document.body.removeChild(selectFileDatabase) : false
	})

	var initQueryForOriginal = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
		+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
		+ "where sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id;"
	var initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
		+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
		+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id;"

	// html dom 이 다 로딩된 후 실행된다.
	$(document).ready(function() {
		getFileListFromDB(initQueryForOriginal)
		getFileListFromDB(initQueryForEdited)
		//체크박스 확인
		$(".OSlist").click(function() {
			manuclick()
		})
		/*$(".selectOS").change(function(){
			OS_number()
		})*/
		//체크박스 체크 초기화
		$(".selectdelete").click(function() {
			deleteclick()
		});
		// menu 클래스 바로 하위에 있는 a 태그를 클릭했을때
		$(".menu>a").click(function() {
			if ($(".hide").is(":visible")) {
				$(".hide").slideUp()
				var removeIcon = $(".menu>i")
				removeIcon.removeClass("fa-solid fa-chevron-down").addClass("fa-duotone fa-play")
			}
			var submenu = $(this).next("ul")
			var clickIcon = $(this).prev("i")
			if (submenu.is(":visible")) {
				submenu.slideUp()
				clickIcon.removeClass("fa-solid fa-chevron-down").addClass("fa-duotone fa-play")
			} else {
				submenu.slideDown()
				clickIcon.removeClass("fa-duotone fa-play").addClass("fa-solid fa-chevron-down")
			}
		});
		$(".result>a").click(function() {
			var submenu = $(this).next("ul")
			if (submenu.is(":visible")) {
				submenu.slideUp()
			} else {
				submenu.slideDown()
			}
		})
	})
}

function beSelectedFile(row) {
	var td = row.children()
	switch (row.attr('class')) {
		case "fileListFromDB beSelected":
			row.removeClass('beSelected')
			switch (inputFileType) {
				case "standard":
					beSelectedFileForStandard = []
					break
				case "compare":
					for (var i = 0; i < beSelectedFileForCompare.length; i++) {
						if (beSelectedFileForCompare[i].fileName == td[1].innerHTML) {
							beSelectedFileForCompare.splice(i, 1)
						}
					}
					break
			}
			break
		default:
			switch (inputFileType) {
				case "standard":
					if (beSelectedFileForStandard.length < 1) {
						row.addClass('beSelected')
						var fileSet = {
							fileId: row.attr('id'),
							fileName: td[1].innerHTML,
							fileSize: "None",
							fileType: td[2].innerHTML,
							fileLocation: "DB"
						}
						beSelectedFileForStandard.push(fileSet)
					} else {
						alert("기준 파일은 최대 1개 까지 첨부 가능합니다.")
					}
					break
				case "compare":
					row.addClass('beSelected')
					var fileSet = {
						fileId: row.attr('id'),
						fileName: td[1].innerHTML,
						fileSize: "None",
						fileType: td[2].innerHTML,
						fileLocation: "DB"
					}
					beSelectedFileForCompare.push(fileSet)
					break
			}
			break
	}
}

function submit() {
	const selectFileDatabase = document.querySelector("#selectFileDatabase")
	document.body.removeChild(selectFileDatabase)
	switch (inputFileType) {
		//fileManage.js에서 standard_addFile(), compare_addFile() 호출
		//MetaData.js에서 MetaDataFromDB() 호출
		case "standard":
			standard_addFile("DB", beSelectedFileForStandard)
			MetaDataFromDB("standard", beSelectedFileForStandard[0].fileName, beSelectedFileForStandard[0].fileId, beSelectedFileForStandard[0].fileType)
			break
		case "compare":
			compare_addFile("DB", beSelectedFileForCompare)
			for (var i = 0; i < beSelectedFileForCompare.length; i++) {
				MetaDataFromDB("compare", beSelectedFileForCompare[i].fileName, beSelectedFileForCompare[i].fileId, beSelectedFileForCompare[i].fileType)
			}
			break
	}
}