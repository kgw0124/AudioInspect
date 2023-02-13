function addFile2DB() {
	const html =
		`<div id="addModal" class="modal fade show" style="padding-right: 17px; display: block;" aria-hidden ="true" >
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
		</div>`
	const dom = new DOMParser().parseFromString(html, 'text/html')
	const addFile2DB = dom.querySelector("#addModal")
	document.body.appendChild(addFile2DB)
	//X 버튼 클릭 시, Modal Window 사라짐.
	addFile2DB.querySelector(".close").addEventListener("click", () => {
		document.body.removeChild(addFile2DB)
	})
	//Modal Window 외부 클릭 시, Modal Window 사라짐.
	window.addEventListener('click', (e) => {
		e.target === addFile2DB ? document.body.removeChild(addFile2DB) : false
	})
}