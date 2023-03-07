function selectStandardFileLocation() {
	const html =
		`<div id="selectStandardFileLocation">
         <div id="selectStandardFileLocationContent">
            <div>
               <button id="quit">X</button>
            </div>
            <div>
               <h2>업로드하고자 하는 Standard file의 위치를 선택해주세요.</h2>
            </div>
            <div id = "fileLocationButtons">
               <input type="button" value="DB에서 파일 선택" onclick="modal_view()"/>
               <input type="file" id="standardfilebox" name="upload" style="display: none" accept=".wav, .flac, .3gp, .3ga, .mp3, .amr, .m4a"/>
               <label class="standardfilelabel" for="standardfilebox">파일 탐색기</label>
            </div>
         </div>
      </div>`

	const dom = new DOMParser().parseFromString(html, 'text/html')
	const selectStandardFileLocation = dom.querySelector("#selectStandardFileLocation")
	document.body.appendChild(selectStandardFileLocation)
	//X 버튼 클릭 시, Modal Window 사라짐.
	selectStandardFileLocation.querySelector("#quit").addEventListener("click", () => {
		document.body.removeChild(selectStandardFileLocation)
	})
	//Modal Window 외부 클릭 시, Modal Window 사라짐.
	window.addEventListener('click', (e) => {
		e.target === selectStandardFileLocation ? document.body.removeChild(selectStandardFileLocation) : false
	})
}

function selectCompareFileLocation() {
	const html =
		`<div id="selectCompareFileLocation">
         <div id="selectCompareFileLocationContent">
            <div>
               <button id="quit">X</button>
            </div>
            <div>
               <h2>업로드하고자 하는 Compare file의 위치를 선택해주세요.</h2>
            </div>
            <div id = "fileLocationButtons">
               <input type="button" value="DB에서 파일 선택" onclick="modal_view()"/>
               <input type="file" id="comparefilebox" style="display: none" multiple="multiple" accept=".wav, .flac, .3gp, .3ga, .mp3, .amr, .m4a"> 
               <label for="comparefilebox">파일 탐색기</label>
            </div>
         </div>
      </div>`

	const dom = new DOMParser().parseFromString(html, 'text/html')
	const selectCompareFileLocation = dom.querySelector("#selectCompareFileLocation")
	document.body.appendChild(selectCompareFileLocation)
	//X 버튼 클릭 시, Modal Window 사라짐.
	selectCompareFileLocation.querySelector("#quit").addEventListener("click", () => {
		document.body.removeChild(selectCompareFileLocation)
	})
	//Modal Window 외부 클릭 시, Modal Window 사라짐.
	window.addEventListener('click', (e) => {
		e.target === selectCompareFileLocation ? document.body.removeChild(selectCompareFileLocation) : false
	})
}