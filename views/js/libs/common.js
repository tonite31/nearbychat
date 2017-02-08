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