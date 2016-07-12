function init() {

	console.log("PsB init...");

	var url = window.location.href;

	if (url.indexOf("/r/photoshopbattles/comments") < 0) { return; }

	var urlChunks = url.split("/");
	
	if (urlChunks.length > 5) {

		var comments = $(".sitetable.nestedlisting > .comment");

		if (comments.length < 50) { return; } else { comments = null; }

		if (url.indexOf("limit") < 0) {

			console.log("redirecting");

			var delimiter = "?";

			if (url.indexOf("?") > 0) { delimiter = "&"; }

			window.location.replace(url+delimiter+"limit=1500");

		} else {

			expandAll();
			collapseNonShops();

		}

	}

}


// Expand all comments

function expandAll() {

	console.log('expanding');

	var comments = $(".comment.collapsed");

	for (var i = comments.length - 1; i > -1; i--) {

		var comment = comments[i];
		var expandLink = $(".entry > .tagline > .expand", comment);

		expandLink[0].click();
		expandLink[0].remove();

	}

}


// Collapse threads without external links unless a reply does

function collapseNonShops() {

	console.log('collapsing');

	var comments = $(".comment.noncollapsed");
 
	for (var i = comments.length - 1; i > -1; i--) {

		var comment = comments[i];
				
		var expandLink = $(".entry > .tagline > .expand", comment);

		if (typeof expandLink[0] != 'undefined') {

			var usertextBody = $(".entry > .usertext > .usertext-body > .md > p > a", comment).html();
			
			if (typeof usertextBody == 'undefined') {
			
				expandLink[0].click();

			} else if (usertextBody.indexOf("reddit.com") > 0) {

				expandLink[0].click();

			} else if ($(comment).is(".spam")) {

				expandLink[0].click();

			}

		}

	}

	console.log("done");

}


init();

