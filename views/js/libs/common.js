var doProgress = function(selector, callback)
{
	var progress = '<span class="glyphicon glyphicon-refresh do-progress"></span>';
	var prevHtml = $(selector).html();
	
	$(selector).html(progress);
	
	callback(function()
	{
		$(selector).html(prevHtml);
	});
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}