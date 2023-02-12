const standardfilebox = document.getElementById('standardfilebox')
const standardfile = document.getElementById('standardfile')
const track_info_standardfile = []
const track_info_comparefile = []

function handleFiles(files) {
	var file = files[0]
	const onChangeFile = (mediainfo) => {
		if (file) {
			standardfile.value = 'Working…'
			const getSize = () => file.size
			const readChunk = (chunkSize, offset) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onload = (event) => {
						if (event.target.error) {
							reject(event.target.error)
						}
						resolve(new Uint8Array(event.target.result))
					}
					reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
				})
			mediainfo
				.analyzeData(getSize, readChunk)
				.then((result) => {
					var comparemethod = document.querySelector(".compare_button.current").value
					//standardfileData.semiMetaData: fileManage.js에서 호출
					standardfilesData.semiMetaData.push(result)
					switch (comparemethod) {
						case "TEXT":
							getStandText(result)
							break
						case "TREE":
							getStandTree(result)
							break
					}
				})
				.catch((error) => {
					standardfile.value = `An error occured:\n${error.stack}`
				})
		}
	}
	MediaInfo({ format: "TEXT" }, (mediainfo) => {
		onChangeFile(mediainfo)
	})
}


function comparehandleFiles(files) {
	async function compareonChangeFile(mediainfo) {
		for (var file of files) {
			await comparefile_info(mediainfo, file)
		}
	}
	const comparefile_info = (mediainfo, file) => {
		//console.log(file)
		const filename = file.name.replaceAll(" ", "").replaceAll(".", "")
		const comparefile = document.getElementById(filename) //나가는 곳
		if (file) {
			comparefile.value = 'Working…'
			const getSize = () => file.size
			const readChunk = (chunkSize, offset) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onload = (event) => {
						if (event.target.error) {
							reject(event.target.error)
						}
						resolve(new Uint8Array(event.target.result))
					}
					reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
				})
			return mediainfo
				.analyzeData(getSize, readChunk)
				.then((result) => {
					var comparemethod = document.querySelector(".compare_button.current").value
					//comparefileData.semiMetaData: fileManage.js에서 호출
					comparefilesData.semiMetaData.push(result)
					switch (comparemethod) {
						case "TEXT":
							getCompText(filename, result)
							break
						case "TREE":
							getCompTree(filename, result)
							break
					}
				})
				.catch((error) => {
					comparefile.value = `An error occured:\n${error.stack}`
				})
		}
	}
	MediaInfo({ format: 'text' }, (mediainfo) => {
		compareonChangeFile(mediainfo)
	})
}

function getStandText(result) {
	var standardfile_result = result.split("\n")
	for (var i = 0; i < standardfile_result.length; i++) {
		var standardfile_txt = ''
		standardfile_txt += '<tr class = "standard_text"><td>' + standardfile_result[i] + '</td></tr>'
		$('#standardfile').append(standardfile_txt)
	}
}

function getCompText(filename, result) {
	var comparefile_result = result.split('\n')
	for (var i = 0; i < comparefile_result.length; i++) {
		var comparefile_txt = ''
		comparefile_txt += '<tr><td>' + comparefile_result[i] + '</td></tr>'
		$('#' + filename).append(comparefile_txt)
	}
}

function getStandTree(result) {
	var standardfile_result = result.split("\n")
	//범위(1)
	var standardfile = '<details class="standard_General"><summary><i class="fa-regular fa-file"></i> General</summary>'
	$('#standardfile').append(standardfile)
	//범위(2)
	for (var i = 1; i < standardfile_result.length; i++) {
		if (standardfile_result[i] == "Audio") {
			var standardfile = '</details><details class="standard_Audio"><summary><i class="fa-regular fa-file-audio"></i> Audio</summary>'
			$('#standardfile').append(standardfile)
			track_info_standardfile.push(i)
			break
		} else if (standardfile_result[i] == "") {
			var standardfile = '<tr class="tree_context"><td>' + standardfile_result[i] + '</td></tr>'
			$('details.standard_General').append(standardfile)
		} else {
			var standardfile = '<tr class="tree_context"><td>┗  ' + standardfile_result[i] + '</td></tr>'
			$('details.standard_General').append(standardfile)
		}
	}
	//범위(3)
	for (var i = track_info_standardfile[0] + 1; i < standardfile_result.length; i++) {
		if (standardfile_result[i] != "") {
			var standardfile = '<tr class="tree_context"><td>┗  ' + standardfile_result[i] + '</td></tr>'
			$('details.standard_Audio').append(standardfile)
		} else {
			var standardfile = '<tr class="tree_context"><td>' + standardfile_result[i] + '</td></tr>'
			$('details.standard_Audio').append(standardfile)
		}
	}
}

function getCompTree(filename, result) {
	var comparefile_result = result.split('\n')
	//범위(1)
	var comparefile = '<details class="compare_General"><summary><i class="fa-regular fa-file"></i> General</summary>'
	$('#' + filename).append(comparefile)
	//범위(2)
	for (var i = 1; i < comparefile_result.length; i++) {
		if (comparefile_result[i] == "Audio") {
			var comparefile = '</details><details class="compare_Audio"><summary><i class="fa-regular fa-file-audio"></i> Audio</summary>'
			$('#' + filename).append(comparefile)
			track_info_comparefile.push(i)
			break
		} else if (comparefile_result[i] == "") {
			var comparefile = '<tr class="tree_context"><td>' + comparefile_result[i] + '</td></tr>'
			$('details.compare_General').append(comparefile)
		} else {
			var comparefile = '<tr class="tree_context"><td>┗  ' + comparefile_result[i] + '</td></tr>'
			$('details.compare_General').append(comparefile)
		}
	}
	//범위(3)
	for (var i = track_info_comparefile[0] + 1; i < comparefile_result.length; i++) {
		if (comparefile_result[i] != "") {
			var comparefile = '<tr class="tree_context"><td>┗  ' + comparefile_result[i] + '</td></tr>'
			$('details.compare_Audio').append(comparefile)
		} else {
			var comparefile = '<tr class="tree_context"><td>' + comparefile_result[i] + '</td></tr>'
			$('details.compare_Audio').append(comparefile)
		}
	}
}