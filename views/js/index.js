window.components = [];

var position = null;

var map = null;
var overlay = null;
function mapReady()
{
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 37.3643570, lng: 127.1076850},
    	zoom: 18,
    	disableDefaultUI: true
  	});
	
	google.maps.event.addListener(map, 'click', function(event)
	{
		position = event.latLng;
		$('#postModal').modal('show');
//		new MessageMarker(event.latLng, map, {});
//	    overlay.move(event.latLng);
//	    map.panTo(event.latLng);
	});

	for(var i=0; i<window.components.length; i++)
	{
		window.components[i]();
	}
  
  	overlay = new MessageMarker(new google.maps.LatLng(37.3643570, 127.1076850), map, {});
  	
  	$(document).ready(function()
	{
		$('#chatInput').on('keydown', function(e)
		{
			if(e.keyCode == 13)
			{
				overlay.setText(this.value);
				this.value = '';
			}
		});
		
		$('#closePost').on('click', function()
		{
			$('#content').val('');
		});
		
		$('#savePost').on('click', function()
		{
			var content = $('#content').val();
			var latLng = JSON.stringify({lat : position.lat, lng : position.lng});
			$.ajax({url : '/api/posts', type: 'post', data : {content : content, latLng : latLng}}).done(function()
			{
				console.log("성공");
				$('#postModal').modal('hide');
			}).fail(function()
			{
				console.log("실패");
			});
		});
	});
}