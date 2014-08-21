


window.onload = function() {
	'use strict';
	
	// trigger drop-downs to disable other menus in default state
	document.getElementById('citationStyle').onchange();
	document.getElementById('orderingOfRefs').onchange();
	document.getElementById('includeMonths').onchange();
	document.getElementById('additionalREVTeX').onchange();
	document.getElementById('numberAuthors').onchange();
	document.getElementById('authorIn').onchange();
	document.getElementById('typefaceAuthors').onchange();
	document.getElementById('authorNames').onchange();
	document.getElementById('datePosition').onchange();
	
	// create an Ajax object for all browsers
	var ajax;
	if (window.XMLHttpRequest) {
		ajax = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // older IE
		ajax = new ActiveXObject('MSXML2.XMLHTTP.3.0');
	}
	
	// anonymous function to be called when readyState changes
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if ( (ajax.status >= 200 && ajax.status < 300) 
				|| (ajax.status == 304) ) {
				// update the page with the response
				document.getElementById('output').innerHTML = ajax.responseText;
			} else {
				// report status text if a different status code was returned
				document.getElementById('output').innerHTML = ajax.statusText;
			}
		}
	};
	
	document.getElementById('btn').onclick = function() {
		/*
		// make a request
		ajax.open('GET', 'example.html', true);
		// actually send the request
		ajax.send(null);
		*/
		
		// request will be made using POST
		ajax.open('POST', 'makebst.php', true);
		// tell server how to handle the data
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		var options = document.getElementById('bstoptions').elements;
		var data = '';
		
		for (var i = 0; i < options.length; i++) {
			if (options[i].tagName == "SELECT") {
				if (!options[i].disabled) {
					if (i > 0) {
						data += '&';
					}
					data += options[i].name + '=' + encodeURIComponent(options[i].value);
				}
			}
		}
		ajax.send(data);
	}	
};





function hideOnStyle(value) {
	if(value == "a") { // author-year
		
		document.getElementById('htmlOutput').disabled=true;
		document.getElementById('authorYearSystem').disabled=false;
		
		// ordering
		var op = document.getElementById("orderingOfRefs").getElementsByTagName("option");
		for (var i = 0; i < op.length; i++) {
			if (op[i].value == "l" || op[i].value == "m" || op[i].value == "k") {
				op[i].disabled = false;
			}
		}
		
		document.getElementById('ignoreFirstNames').disabled=false;
		document.getElementById('juniorPart').disabled=false;
		document.getElementById('fontCitationLabels').disabled=false;
		document.getElementById('fontExtraLabel').disabled=false;
		document.getElementById('labelWhenMissing').disabled=false;
		document.getElementById('missingDate').disabled=false;
		
		document.getElementById('includeMonths').disabled=false;
		document.getElementById('suppressMonth').disabled=true;
		
		document.getElementById('truncateYear').disabled=false;
		
		
	} else {
		// not author-year
		document.getElementById('htmlOutput').disabled=false;
		document.getElementById('authorYearSystem').disabled=true;
		
		// ordering
		var op = document.getElementById("orderingOfRefs").getElementsByTagName("option");
		for (var i = 0; i < op.length; i++) {
			if (op[i].value == "l" || op[i].value == "m" || op[i].value == "k") {
				op[i].disabled = true;
			}
		}
		
		document.getElementById('ignoreFirstNames').disabled=true;
		document.getElementById('juniorPart').disabled=true;
		document.getElementById('fontCitationLabels').disabled=true;
		document.getElementById('fontExtraLabel').disabled=true;
		document.getElementById('labelWhenMissing').disabled=true;
		document.getElementById('missingDate').disabled=true;
		
		document.getElementById('includeMonths').disabled=true;
		document.getElementById('suppressMonth').disabled=false;
		
		document.getElementById('truncateYear').disabled=true;
	}
};

function hideOnOrdering(value) {
    /*
    // for some reason this gets asked anyway :-P
	if(value == "c") {
		// citation order
		document.getElementById('orderOnVonPart').disabled=true;
	} else {
		document.getElementById('orderOnVonPart').disabled=false;
	}
	*/
};

function hideOnAuthorsIn(value) {
	if(value == "m") {
		// some other truncation scheme
		document.getElementById('maxAuthorsBefore').disabled=false;
		document.getElementById('maxAuthorsWithout').disabled=false;
	} else {
		document.getElementById('maxAuthorsBefore').disabled=true;
		document.getElementById('maxAuthorsWithout').disabled=true;
	}
};


function hideOnNumAuthors(value) {
	var options = document.getElementById('maximumNumberAuthors').options;
	if(value == "l") {
		// limited authors
		// populate number of authors dropdown
		document.getElementById('maximumNumberAuthors').disabled=false;
		document.getElementById('minimumNumberAuthors').disabled=false;
		for (var i = 1; i < 100; i++) {
			options[options.length] = new Option(i.toString(), i.toString());
		}
	} else {
		document.getElementById('maximumNumberAuthors').disabled=true;
    	document.getElementById('minimumNumberAuthors').disabled=true;
    	
		for(var i = options.length-1; i >= 0; i--) {
       		document.getElementById('maximumNumberAuthors').remove(i);
    	}
	}
}


function hideOnDatePosition(value) {
	if(value == "*") {
		document.getElementById('datePunctuation').disabled=true;
		document.getElementById('blankAfterDate').disabled=true;
	} else {
		// date not at end
		document.getElementById('datePunctuation').disabled=false;
		document.getElementById('blankAfterDate').disabled=false;
	}
}


function hideOnAuthorNames(value) {
	if(value == "*" || value == "i") {
		// author names NOT reversed
		document.getElementById('editorNamesReversed').disabled=true;
		document.getElementById('positionOfJunior').disabled=true;
	} else {
		document.getElementById('editorNamesReversed').disabled=false;
		document.getElementById('positionOfJunior').disabled=false;
	}
}

function populateMinimum(maxNum) {	
	var options = document.getElementById('minimumNumberAuthors').options;
	for(var i = options.length-1; i >= 0; i--) {
       		document.getElementById('minimumNumberAuthors').remove(i);
    }
	for (var i = 1; i <= maxNum; i++) {
		options[options.length] = new Option(i.toString(), i.toString());
	}
}


function hideOnIncludeMonths(value) {
	if(value == "m") {
		// include months
		//document.getElementById('reversedDate').disabled=false;
	} else {
		// not author-year
		//document.getElementById('reversedDate').disabled=true;
	}
}

function hideOnREVTeX(value) {
	if(value == "r") {
		document.getElementById('eprint').disabled=true;
		document.getElementById('url').disabled=true;
	} else {
		document.getElementById('eprint').disabled=false;
		document.getElementById('url').disabled=false;
	}
}

function hideOnFontForAuthors(value) {
	if(value == "*") {
		// plain
		document.getElementById('fontFirstNames').disabled=true;
		document.getElementById('editorNames').disabled=true;
		document.getElementById('fontForAnd').disabled=true;
	} else {
		document.getElementById('fontFirstNames').disabled=false;
		document.getElementById('editorNames').disabled=false;
		document.getElementById('fontForAnd').disabled=false;
	}
}





