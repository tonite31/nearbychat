window.components = [];

var map = null;
var overlay = null;
function mapReady()
{
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 37.3659620, lng: 127.1082115},
    	zoom: 18,
    	disableDefaultUI: true
  	});
	
	google.maps.event.addListener(map, 'click', function(event)
	{
	    overlay.move(event.latLng);
	});

	for(var i=0; i<window.components.length; i++)
	{
		window.components[i]();
	}
  
  	overlay = new MessageMarker(new google.maps.LatLng(37.3659620, 127.1082115), map, {});
  	
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
	});
}