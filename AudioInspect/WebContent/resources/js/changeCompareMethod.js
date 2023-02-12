$(document).ready(function() {
	$('.compare_button').click(function() {
		var original_comparemethod = document.querySelector(".compare_button.current").value
		$('.compare_button').removeClass('current');
		$(this).addClass('current');
		var change_comparemethod = document.querySelector(".compare_button.current").value
		var tab_id = $(".tab-link.current").text().replaceAll(" ", "").replaceAll('.', '').slice(0, -1)
		var comparefile_name = $('.tab-link.current ').text().slice(0, -1)
		switch (original_comparemethod) {
			case "TEXT":
				switch (change_comparemethod) {
					case "TEXT":
						break
					case "TREE":
						Text2Tree(tab_id, comparefile_name)
						break
					case "XML":
						TextTree2XML(tab_id, comparefile_name)
						break
				}
				break
			case "TREE":
				switch (change_comparemethod) {
					case "TEXT":
						Tree2Text(tab_id, comparefile_name)
						break
					case "TREE":
						break
					case "XML":
						TextTree2XML(tab_id, comparefile_name)
						break
				}
				break
			case "XML":
				switch (change_comparemethod) {
					case "XML":
						break
					default:
						XML2TextTree(change_comparemethod, tab_id, comparefile_name)
						break
				}
		}
	})
})

function Text2Tree(tab_id, comparefile_name) {
	$('#standardfile').empty()
	$('#' + tab_id).empty()
	var standardfile = standardfilesData.semiMetaData[0]
	var index = comparefilesData.fileName.indexOf(comparefile_name)
	var comparefile = comparefilesData.semiMetaData[index]
	//getStandText(), getCompText(), getStandTree(), getCompTree(): SemiMetaData.js에서 호출
	getStandTree(standardfile)
	getCompTree(comparefile_name, comparefile)
	compare(tab_id, standardfile, comparefile, comparefile_name)
}

function Tree2Text(tab_id, comparefile_name) {
	$('#standardfile').empty()
	$('#' + tab_id).empty()
	var standardfile = standardfilesData.semiMetaData[0]
	var index = comparefilesData.fileName.indexOf(comparefile_name)
	var comparefile = comparefilesData.semiMetaData[index]
	//getStandText(), getCompText(), getStandTree(), getCompTree(): SemiMetaData.js에서 호출
	getStandText(standardfile)
	getCompText(comparefile_name, comparefile)
	compare(tab_id, standardfile, comparefile, comparefile_name)
}

function TextTree2XML(tab_id, comparefile_name) {
	$('#standardfile').empty()
	$('#' + tab_id).empty()
	var standardfile = standardfilesData.metaData[0]
	var index = comparefilesData.fileName.indexOf(comparefile_name)
	var comparefile = comparefilesData.metaData[index]
	//getStandMetaDataTreeFromXML(), getCompMetaDataTreeFromXML(): MetaData.js에서 호출
	getStandMetaDataTreeFromXML(standardfile)
	getCompMetaDataTreeFromXML(comparefile_name, comparefile)
	compareXML(tab_id, standardfile.join("\n"), comparefile.join("\n"), comparefile_name)
}

function XML2TextTree(change_comparemethod, tab_id, comparefile_name) {
	$('#standardfile').empty()
	$('#' + tab_id).empty()
	var standardfile = standardfilesData.semiMetaData[0]
	var index = comparefilesData.fileName.indexOf(comparefile_name)
	var comparefile = comparefilesData.semiMetaData[index]
	//getStandText(), getCompText(), getStandTree(), getCompTree(): SemiMetaData.js에서 호출
	switch (change_comparemethod) {
		case "TEXT":
			getStandText(standardfile)
			getCompText(comparefile_name, comparefile)
			compare(tab_id, standardfile, comparefile, comparefile_name)
			break
		case "TREE":
			getStandTree(standardfile)
			getCompTree(comparefile_name, comparefile)
			compare(tab_id, standardfile, comparefile, comparefile_name)
			break
	}
}