<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<link rel="stylesheet" href="resources/css/style.css">
<link rel="shortcut icon" href="#">
<!-- 엑셀 파일 내보내기 -->
<!-- use xlsx.full.min.js from version 0.19.1 -->
<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.19.1/package/dist/xlsx.full.min.js"></script>
<script	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
<script	src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://kit.fontawesome.com/a4a9a94dd2.js"></script>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 반응형 웹페이지 -->
<title>AudioInspect File Comparison</title>
</head>
<body>
	<div class="topMenuWrapper">
		<h1>AudioInspect</h1>
		<ul class="topMenu">
			<li><a href="index.jsp">음성파일 비교</a></li>
			<li><a href="manage.jsp">음성파일 관리</a></li>
		</ul>
	</div>
	
	<div id="summary_div">
		<table id="summary">
			<tr>
				<td class="line"></td>
			</tr>
		</table>
	</div>

	<div class="compare_method">
		<span>비교 형식</span> 
		<input type="button" class="compare_button current"	value="TEXT"> 
		<input type="button" class="compare_button"	value="TREE">
		<input type="button" class="compare_button"	value="XML">
	</div>

	<div style="height: 50%;">
		<div id="standardfiletotal">
			<ul class="tabs">
				<li class="tab-link1" data-tab="standardfile">
					<div id="uploadfile">
						<input type="button" value="Standard file" style="background: inherit; border: none" onclick="selectStandardFileLocation()">
						<button class="stbtn">X</button>
					</div>
				</li>
			</ul>
			<div id="standardfile_scroll">
				<table id="standardfile"></table>
			</div>
		</div>

		<div id="comparefiletotal">
			<ul class="compare_tabs">
				<li class="compare_basic_tab-link current" data-tab="compare_basic">
					<input type="button" value="+" style="background: inherit; border: none" onclick="selectCompareFileLocation()">
				</li>
			</ul>
			<div class="compare_context" id="compare_context">
				<table id="compare_basic" class="comparefile current"></table>
			</div>
		</div>
	</div>

	<div class="reset_method">
		<button type="button" id="reset" name="reset" style="display: inline-block; border: 0; outline: 0; background: white">
			<span style="font-size: 15px">초기화</span> 
			<i id="resetbutton"	class="fa-solid fa-arrow-rotate-right" style="background: white; font-size: 20px"></i>
		</button>
	</div>

	<script src="resources/js/MetaData.js"></script>
	<script	src='https://unpkg.com/mediainfo.js@0.1.4/dist/mediainfo.min.js'></script>
	<script src="resources/js/SemiMetaData.js"></script>
	<script src="resources/js/fileManage.js"></script>
	<script src="resources/js/getCompareResults.js"></script>
	<script src="resources/js/changeCompareMethod.js"></script>
	<script src="resources/js/exportXML.js"></script>
	<script src="resources/js/exportExcel.js"></script>
	<script src="resources/js/selectFileLocationModal.js"></script>
	<script src="resources/js/selectFileDatabaseModal.js"></script>
	<script src="resources/js/getFileListFromDB.js"></script>
	<script src="resources/js/getOptionFileListFromDB.js"></script>

	<div>
		<div class="box">
			<table id="filelist">
				<thead id="filelisttable_head">
					<tr>
						<td style="width: 10%">No.</td>
						<td style="width: 30%">파일명</td>
						<td style="width: 20%">파일 크기</td>
						<td style="width: 20%">파일 확장자</td>
						<td style="width: 20%">파일 위치</td>
					</tr>
				</thead>
				<tbody id="filelisttable_body">
					<tr>
						<td style="width: 10%" class="detailline">Standard file</td>
						<td style="width: 30%" class="standard_name"></td>
						<td style="width: 20%" class="standard_size"></td>
						<td style="width: 20%" class="standard_fileType"></td>
						<td style="width: 20%" class="standard_location"></td>
					</tr>
					<tr class="removetr">
						<td style="width: 10%; height: 25px"></td>
						<td style="width: 30%"></td>
						<td style="width: 20%"></td>
						<td style="width: 20%"></td>
						<td style="width: 20%"></td>
					</tr>
					<tr class="removetr">
						<td style="width: 10%; height: 25px"></td>
						<td style="width: 30%"></td>
						<td style="width: 20%"></td>
						<td style="width: 20%"></td>
						<td style="width: 20%"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<script>
      $(function() {
         $(".stbtn").click(function() {
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
         });
      });
   </script>
	<br>
	<span class="compareresulttext" style="color: rgb(78, 78, 78)">비교 상세 결과</span>
	<div class="export_file">
		<span>결과 저장하기</span> 
		<input type="button" class="export_button" id="XMLFileExport" value="XML" onclick="exportReportToXML()">
		<input type="button" class="export_button" id="excelFileExport"	value="EXCEL" onclick="exportReportToExcel()">
	</div>
	<table id="resultlist">
		<thead id="resultlisttable">
			<tr>
				<td style="border: 1px solid black">메타데이터 상 주요 불일치 원인</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td style="border: 1px solid black">
					<div class="resultline"></div>
				</td>
			</tr>
			<tr>
				<td style="border: 1px solid black">
					<div class="resultline_2"></div>
				</td>
			</tr>
		</tbody>
	</table>
	<br>
</body>
</html>