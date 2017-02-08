var mapReady = null;

(function()
{
	window.components = [];

	var position = null;

	var map = null;
	var me = null;
	
	mapReady = function()
	{
		map = new google.maps.Map(document.getElementById('map'), {
	    	center: {lat: 37.4987974, lng: 127.0274636},
	    	zoom: 18,
	    	disableDefaultUI: true
	  	});
		
		google.maps.event.addListener(map, 'click', function(event)
		{
			position = event.latLng;
			me.move(position);
		});

		for(var i=0; i<window.components.length; i++)
		{
			window.components[i]();
		}
		
		loadProfile();
		
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
			
			writePost();
			loadPosts();
		});
	}

	function loadProfile()
	{
		$.ajax({url : '/api/me', type: 'get'}).done(function(result)
		{
			var location = JSON.parse(result.location);
			result.location = new google.maps.LatLng(location.lat, location.lng);
			me = new _Profile(map, result);
			
		}).fail(function(res)
		{
			console.log(res);
		});
	}
	
	function writePost()
	{
		$('#savePost').on('click', function()
		{
			var content = $('#content').val();
			var location = JSON.stringify(me.getLocation());
			$.ajax({url : '/api/posts', type: 'post', data : {content : content, location : location}}).done(function(result)
			{
				new _Post(map, result);
				$('#postModal').modal('hide');
			}).fail(function()
			{
				console.log("실패");
			});
		});
	}
	
	function loadPosts()
	{
		$.ajax({url : '/api/posts', type: 'get'}).done(function(list)
		{
			for(var i=0; i<list.length; i++)
			{
				new _Post(map, list[i]);
			}
		}).fail(function(res)
		{
			console.log(res);
		});
	}
})();