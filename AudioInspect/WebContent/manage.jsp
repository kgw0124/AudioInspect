<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%!Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	String url = "jdbc:mysql://localhost:3306/audioinspect?serverTimezone=UTC";
	String user = "root";
	String password = "1234";
	String initQueryForOriginal = "select sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
			+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
			+ "where sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id;";
	String initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
			+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
			+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id;";
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

	<div>
		<table style ="width: 100%; border: 0; cellspacig: 0; cellpadding: 0;" class="table table-striped table-hover">
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
				rs = stmt.executeQuery(initQueryForOriginal);
				while (rs.next()) {
			%>
			<tr>
				<td>index</td>
				<td><%=rs.getString("file_name")%></td>
				<td><%=rs.getString("file_type")%></td>
				<td><%=rs.getString("smart_device_model_name")%></td>
				<td><%=rs.getString("smart_device_model_number")%></td>
				<td><%=rs.getString("os_name") + " " + rs.getString("os_version")%></td>
				<td><%=rs.getString("recording_mode") + " / " + rs.getString("recording_quality")%></td>
				<td>원본</td>
			</tr>
			<%
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