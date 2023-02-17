<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%!Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	String url = "jdbc:mysql://localhost:3306/audioinspect?serverTimezone=UTC";
	String user = "root";
	String password = "1234";
	String initQueryForOriginal = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
			+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
			+ "where sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id";
	String initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
			+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
			+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id;";
	ArrayList<String> query = new ArrayList<>(Arrays.asList(initQueryForOriginal, initQueryForEdited));
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet"	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/resources/vendor/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="resources/css/manage.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script	src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script	src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
<link rel="stylesheet"	href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
<link rel="stylesheet"	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet"	href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet"	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://kit.fontawesome.com/a4a9a94dd2.js" crossorigin="anonymous"></script>
<script src="resources/js/getFileListFromDB.js"></script>
<script src="resources/js/getOptionFileListFromDB.js"></script>
<script src="resources/js/fileManageForDB.js"></script>
</head>
<title>AudioInspect File Manage</title>
<body>
	<div class="topMenuWrapper">
		<h1>AudioInspect</h1>
		<ul class="topMenu">
			<li><a href="index.jsp">음성파일 비교</a></li>
			<li><a href="manage.jsp">음성파일 관리</a></li>
		</ul>
	</div>
	<nav>
		<h4 class="top">AudioInspect DB 선택</h4>
		<div class="menu-div">
			<ul class="menu-style">
				<li class="menu">
					<i class="fa-duotone fa-play"></i>
					<a>디바이스 제조사 설정</a>
					<ul class="hide">
						<li class="select-text">검색할 제조사를 선택해주세요.</li>
						<li class="select-list">
							<input type="checkbox" class="manufacturerlist" name="manuAll" onclick="manuclick()">전체보기</li>
						<li class="select-list">
							<input type="checkbox" class="manufacturerlist" name="Samsung" id="nonck" onclick="manuclick()">Samsung</li>
						<li class="select-list">
							<input type="checkbox" class="manufacturerlist" name="LG" id="nonck" onclick="manuclick()">LG</li>
						<li class="select-list">
							<input type="checkbox" class="manufacturerlist" name="Apple" id="nonck"	onclick="manuclick()">Apple</li>
						<li class="select-list">
							<input type="checkbox" class="manufacturerlist" name="Xiaomi" id="nonck" onclick="manuclick()">샤오미</li>
						<li class="select-list">
							<input type="checkbox"	class="manufacturerlist" name="Huawei" id="nonck" onclick="manuclick()">화웨이</li>
					</ul>
				</li>
				<li class="menu">
					<i class="fa-duotone fa-play"></i>
					<a>원본/편집 설정</a>
					<ul class="hide">
						<li class="select-text">표시할 파일의 원본/편집 여부를 선택해주세요.</li>
						<li class="select-list">
							<input type="checkbox" class="editlist" name="selectAll" onclick="manuclick()">
							전체 파일 보기</li>
						<li class="select-list">
							<input type="checkbox" class="editlist" name="selectorigin" id='editnonck' onclick="manuclick()">원본 파일만 보기</li>
						<li class="select-list">
							<input type="checkbox" class="editlist" name="edit" id='editnonck' onclick="manuclick()">편집 파일만 보기</li>
						<li class="select-text">편집 소프트웨어 설정</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="selectedit" onclick="manuclick()">전체 보기</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Builtin" id='sweditnonck' onclick="manuclick()">자체 탑제 소프트웨어 편집 본</li>
						<li class="select-text">PC 기반 소프트웨어</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Gold wave" id='sweditnonck' onclick="manuclick()">Gold wave</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Wave pad" id='sweditnonck' onclick="manuclick()">Wave pad</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Audacity" id='sweditnonck' onclick="manuclick()">Audacity</li>
						<li class="select-text">안드로이드 기반 소프트웨어</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="302 lock screen" id='sweditnonck' onclick="manuclick()">302 lock screen</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="inshot inc." id='sweditnonck' onclick="manuclick()">inshot inc.</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Recorder & smart apps" id='sweditnonck' onclick="manuclick()">recoder & smart apps</li>
						<li class="select-text">iOS 기반 소프트웨어</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Garageband" id='sweditnonck' onclick="manuclick()">Garageband</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Lexis Audio Editor" id='sweditnonck' onclick="manuclick()">Lexis Audio Editor</li>
						<li class="select-list">
							<input type="checkbox" class="editlist2" name="Wave pad mobile" id='sweditnonck' onclick="manuclick()">Wave pad mobile</li>
					</ul>
				</li>
				<li class="menu">
					<i class="fa-duotone fa-play"></i>
					<a>검색 키워드 설정</a>
					<ul class="hide">
						<li class="select-text">검색 키워드와 검색 옵션을 선택해주세요.</li>
						<li class="select-text">검색 키워드</li>
						<li class="select-list">
							<input type="text" class="search_text" placeholder="검색 키워드를 입력해주세요."></li>
						<li class="select-list">
							<input type="button" class="search_button" value="검색 키워드 적용" onclick="manuclick()"></li>
						<li class="select-text">검색 옵션</li>
						<li class="select-list">
							<input type="checkbox" class="text_search" name="file_name" id="file_name" onclick="manuclick()">파일 이름으로 검색</li>
						<li class="select-list">
							<input type="checkbox" class="text_search" name="record_device" id="record_device" onclick="manuclick()">녹음 모델명으로 검색</li>
						<li class="select-list">
							<input type="checkbox" class="text_search" name="record_device_num" id="record_device_num" onclick="manuclick()">녹음 모델 넘버로 검색</li>
					</ul>
				</li>
				<li class="menu">
				<i class="fa-duotone fa-play"></i>
				<a>OS 설정</a>
					<ul class="hide">
						<li class="select-text">OS 종류</li>
						<li class="select-text">디바이스 제조사 선택 시 OS 종류는 자동으로 선택됩니다.</li>
						<li class="select-list">
							<input type="checkbox" class="OSlist" name="OSAll" onclick="manuclick()">전체 보기</li>
						<li class="select-list">
							<input type="checkbox" class="OSlist" name="Android" id="OSnonck" onclick="manuclick()">Android</li>
						<li class="select-list">
							<input type="checkbox" class="OSlist" name="iOS" id="OSnonck" onclick="manuclick()">iOS</li>
						<li class="select-text">OS 버전</li>
						<li class="select-text">현재 검색 결과에 나타나는 버전만 출력됩니다.</li>
						<li class="select-list">
							<input type="checkbox" class="OSlist" name="OSAll" onclick="manuclick()">전체 보기</li>
						<li class="select-list">
							<input type="checkbox" class="select_OS" onchange="OS_number()">OS 버전 선택 
							<select class="selectOS" onchange="OS_number()">
								<option value="7.0" class="Android">Android 7.0</option>
								<option value="6.0" class="Android">Android 6.0</option>
								<option value="8.0" class="Android">Android 8.0</option>
								<option value="5.1.1" class="Android">Android 5.1.1</option>
								<option value="8.1" class="Android">Android 8.1</option>
								<option value="7.1.2" class="Android">Android 7.1.2</option>
								<option value="9" class="Android">Android 9</option>
								<option value="2.3.6" class="Android">Android 2.3.6</option>
								<option value="4.2.2" class="Android">Android 4.2.2</option>
								<option value="4.0.4" class="Android">Android 4.0.4</option>
								<option value="4.1.2" class="Android">Android 4.1.2</option>
								<option value="4.4.2" class="Android">Android 4.4.2</option>
								<option value="2.2.1" class="Android">Android 2.2.1</option>
								<option value="5.0.1" class="Android">Android 5.0.1</option>
								<option value="10" class="Android">Android 10</option>
								<option value="11" class="Android">Android 11</option>
								<option value="6.0.1" class="Android">Android 6.0.1</option>
								<option value="4.3" class="Android">Android 4.3</option>
								<option value="4.4.4" class="Android">Android 4.4.4</option>
								<option value="5.0" class="Android">Android 5.0</option>
								<option value="4.0.3" class="Android">Android 4.0.3</option>
								<option value="9.0" class="Android">Android 9.0</option>
								<option value="8.0.1" class="Android">Android 8.0.1</option>
								<option value="13.3.1" class="iOS">iOS 13.3.1</option>
								<option value="13.4.1" class="iOS">iOS 13.4.1</option>
								<option value="14.2" class="iOS">iOS 14.2</option>
								<option value="14.2.1" class="iOS">iOS 14.2.1</option>
								<option value="7.1.1" class="iOS">iOS 7.1.1</option>
								<option value="9.0.2" class="iOS">iOS 9.0.2</option>
								<option value="8.0.2" class="iOS">iOS 8.0.2</option>
								<option value="8.1.2" class="iOS">iOS 8.1.2</option>
								<option value="10.1.1" class="iOS">iOS 10.1.1</option>
								<option value="10.2" class="iOS">iOS 10.2</option>
								<option value="11.3" class="iOS">iOS 11.3</option>
								<option value="13.5.1" class="iOS">iOS 13.5.1</option>
								<option value="14" class="iOS">iOS 14</option>
								<option value="13.7" class="iOS">iOS 13.7</option>
								<option value="12.1.3" class="iOS">iOS 12.1.3</option>
								<option value="12.4" class="iOS">iOS 12.4</option>
								<option value="11.2.6" class="iOS">iOS 11.2.6</option>
								<option value="11.0.3" class="iOS">iOS 11.0.3</option>
								<option value="14.0.1" class="iOS">iOS 14.0.1</option>
								<option value="13.2.3" class="iOS">iOS 13.2.3</option>
								<option value="13.3" class="iOS">iOS 13.3</option>
						</select>
						</li>
						<li class="select-list">
							<input type="checkbox" class="input_OS" onclick="OS_number2()">직접 입력
							<input type="text" class="search" onkeyup="OS_number2()" placeholder="ex) 13.3">
						</li>
					</ul>
				</li>
				<li class="menu">
				<i class="fa-duotone fa-play"></i>
				<a>녹음 모드 선택</a>
					<ul class="hide">
						<li class="select-list">
							<input type="checkbox" class="recordlist" name="recordAll" onclick="recordclick()">전체 보기
						</li>
						<li class="select-list">녹음 모드 
						<select class="recordmode" onclick="recordmode()">
								<option value="recordmode_All">전체보기</option>
								<option value="음악">음악</option>
								<option value="대화">대화</option>
								<option value="5min">5min</option>
								<option value="일반">일반</option>
								<option value="뮤직">뮤직</option>
								<option value="기본(pause 포함)">기본(pause 포함)</option>
								<option value="5분">5분</option>
								<option value="음성 녹음">음성 녹음</option>
								<option value="콘서트">콘서트</option>
								<option value="회의">회의</option>
								<option value="압축">압축</option>
								<option value="X">X</option>
								<option value="사용자 설정">사용자 설정</option>
								<option value="보이스">보이스</option>
								<option value="음성녹음">음성녹음</option>
								<option value="HD">HD</option>
								<option value="기본">기본</option>
								<option value="무손실">무손실</option>
								<option value="인터뷰">인터뷰</option>
								<option value="통화 녹음">통화 녹음</option>
								<option value="기본(북마크 포함)">기본(북마크 포함)</option>
						</select>
						</li>
						<li class="select-list">녹음 퀄리티 
						<select class="recordQ" onclick="recordmode()">
								<option value="recordQ_All">전체보기</option>
								<option value="고품질">고품질</option>
								<option value="보통">보통</option>
								<option value="보통(~100kbit&s, ~45MB&h)">보통(~100kbit&s, ~45MB&h)</option>
								<option value="일반">일반</option>
								<option value="낮음(~75kbit&s, ~32MB&h)">낮음(~75kbit&s, ~32MB&h)</option>
								<option value="24bit&176.4kHz">24bit&176.4kHz</option>
								<option value="낮음">낮음</option>
								<option value="16bit&176.4kHz">16bit&176.4kHz</option>
								<option value="24bit&96kHz">24bit&96kHz</option>
								<option value="16bit&192kHz">16bit&192kHz</option>
								<option value="16bit&48kHz">16bit&48kHz</option>
								<option value="16bit&88.2kHz">16bit&88.2kHz</option>
								<option value="보통(default)">보통(default)</option>
								<option value="X">X</option>
								<option value="통화 녹음">통화 녹음</option>
								<option value="MMS첨부용">MMS첨부용</option>
								<option value="24bit&88.2kHz">24bit&88.2kHz</option>
								<option value="높음">높음</option>
								<option value="24bit&192kHz">24bit&192kHz</option>
								<option value="높음(~192kbit&s, ~90MB&h)">높음(~192kbit&s, ~90MB&h)</option>
								<option value="16bit&96kHz">16bit&96kHz</option>
								<option value="24bit&44.1kHz">24bit&44.1kHz</option>
								<option value="24bit&48kHz">24bit&48kHz</option>
								<option value="저음질">저음질</option>
								<option value="고음질">고음질</option>
								<option value="메시지 첨부용">메시지 첨부용</option>
						</select>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>

	<script>
		$(document).ready(
				function() {
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
					$(".menu>a").click(
							function() {
								if ($(".hide").is(":visible")) {
									$(".hide").slideUp()
									var removeIcon = $(".menu>i")
									removeIcon.removeClass("fa-solid fa-chevron-down")
											.addClass("fa-duotone fa-play")
								}
								var submenu = $(this).next("ul")
								var clickIcon = $(this).prev("i")
								if (submenu.is(":visible")) {
									submenu.slideUp()
									clickIcon.removeClass("fa-solid fa-chevron-down")
											.addClass("fa-duotone fa-play")
								} else {
									submenu.slideDown()
									clickIcon.removeClass("fa-duotone fa-play")
											.addClass("fa-solid fa-chevron-down")
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
	</script>

	<div class="button_method">
		<button href="#addModal" class="button_add" data-toggle="modal">
			<i class="material-icons">&#xE147;</i> <span>추가</span>
		</button>
		<button href="#deleteModal" class="button_delete" data-toggle="modal">
			<i class="material-icons">&#xE15C;</i> <span>삭제</span>
		</button>
		<button href="#editModal" class="button_edit" data-toggle="modal">
			<i class="material-icons">&#xE3C9;</i> <span>수정</span>
		</button>
		<button href="#reset" class="button_reset">
			<i class="material-icons">&#xF053;</i> <span>초기화</span>
		</button>
	</div>

	<div id="fileListTableWrapper">
		<table id="fileListTable" class="table table-striped table-hover">
			<thead>
				<tr>
					<th>No.</th>
					<th>파일명</th>
					<th>확장자</th>
					<th>모델명</th>
					<th>모델 넘버</th>
					<th>OS 정보</th>
					<th>녹음 모드</th>
					<th>편집 정보</th>

				</tr>
			</thead>
			<tbody>
			</tbody>
			<%
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				conn = DriverManager.getConnection(url, user, password);
				stmt = conn.createStatement();
				Integer index = 1;
				String file_id;
				String editing_app_name;
				for (int i = 0; i < query.size(); i++) {
					rs = stmt.executeQuery(query.get(i));
					while (rs.next()) {
						try {
							file_id = Integer.toString(rs.getInt("edited_speech_file_id"));
							editing_app_name = rs.getString("editing_app_name");
						} catch (Exception e) {
							file_id = "원본" + Integer.toString(rs.getInt("original_speech_file_id"));
							editing_app_name = "원본";
						}
			%>
						<tr id = "<%= file_id %>" class = "fileListFromDB" onclick = "beSelectedFile($(this))">
							<td><%=index%></td>
							<td><%=rs.getString("file_name")%></td>
							<td><%=rs.getString("file_type")%></td>
							<td><%=rs.getString("smart_device_model_name")%></td>
							<td><%=rs.getString("smart_device_model_number")%></td>
							<td><%=rs.getString("os_name") + " " + rs.getString("os_version")%></td>
							<td><%=rs.getString("recording_mode") + " / " + rs.getString("recording_quality")%></td>
							<td><%=editing_app_name%></td>
						</tr>
			<%
			index++;
			}
			}
			} catch (SQLException se) {
			se.printStackTrace();
			} finally {
			try {
			if (rs != null)
			rs.close();
			if (stmt != null)
			rs.close();
			if (conn != null)
			rs.close();
			} catch (SQLException se) {
			se.printStackTrace();
			}
			}
			%>
		</table>
	</div>

	<!-- Add Modal HTML -->
	<div id="addModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Add</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<p>
								<b>파일 편집 여부</b>
							</p>
							<label>
								<input type="radio" id="orign" name="chk_info" value="원본" checked="checked" onchange="setDisplay()">
								원본
							</label>
							<label>
								<input type="radio" id="edit" name="chk_info" value="편집본" onchange="setDisplay()">
								편집본
							</label>
						</div>
						<div class="form-group">
							<p>
								<b>파일 경로</b>
							</p>
							<input type="file" name="profile" accept=".m4a">
						</div>
						<div class="form-group">
							<p>
								<b>녹음 기종명 *</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 기종 넘버 *</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<p>
								<b>파일 이름 *</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 기기 제조사 *</b>
							</p>
							<select id="device">
								<option value="ios">IOS</option>
								<option value="android">Android</option>
							</select>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 os 이름 *</b>
							</p>
							<select id="device">
								<option value="ios">IOS</option>
								<option value="android">Android</option>
							</select>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 os 버전 정보 *</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 모드</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<p>
								<b>녹음 퀄리티</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-success" value="Add">
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<!-- Edit Modal HTML -->
	<div id="editModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Edit</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">

						<div class="form-group">
							<p>선택한 파일 이름 :</p>
						</div>
						<div class="form-group">
							<p>
								<b>파일 편집 여부</b>
							</p>
							<label><input type="radio" id="orign" name="chk_info"
								value="원본" checked="checked" onchange="setDisplay()">원본</label>
							<label><input type="radio" id="edit" name="chk_info"
								value="편집본" onchange="setDisplay()">편집본</label>
						</div>
						<div class="form-group">
							<p>
								<b>파일명</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>기종 모델 넘버</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>os 종류</b>
							</p>
							<select id="device">
								<option value="ios">IOS</option>
								<option value="android">Android</option>
							</select>
						</div>

						<div class="form-group">
							<p>
								<b>os 버전</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>녹음 모드</b>
							</p>
							<input type="text" class="form-control" required>
						</div>


						<div class="form-group">
							<p>
								<b>녹음 퀄리티</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>녹음 소프트웨어명</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>녹음 소프트웨어 버전</b>
							</p>
							<input type="text" class="form-control" required>
						</div>

						<div class="form-group">
							<p>
								<b>녹음 소프트웨어 제조사</b>
							</p>
							<input type="text" class="form-control" required>
						</div>
					</div>

					<div class="modal-footer">
						<input type="submit" class="btn btn-info" value="Save">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Delete Modal HTML -->
	<div id="deleteModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<p>파일을 삭제하시겠습니까?</p>

					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal"
							value="Cancel"> <input type="submit"
							class="btn btn-danger" value="Delete">
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>