window.components.push(function()
{
	function Post(map, post)
	{
		this.post = post;
		this.post.location = JSON.parse(this.post.location);
		this.post.location = new google.maps.LatLng(this.post.location.lat, this.post.location.lng);
		this.setMap(map);
	}
	
	Post.prototype = new google.maps.OverlayView();

	Post.prototype.draw = function()
	{
		var self = this;
		var div = this.div;
		if (!div)
		{
			div = this.div = document.createElement('div');
			div.className = 'component-post';
			div.innerHTML = this.post.content;
			
			if (typeof(self.marker_id) !== 'undefined')
			{
				div.dataset.marker_id = self.marker_id;
			}
			
			var panes = this.getPanes();
			panes.overlayImage.appendChild(div);
		}
		
		this.move(this.post.location);
	};
	
	Post.prototype.move = function(location)
	{
		var point = this.getProjection().fromLatLngToDivPixel(location);
		if (point)
		{
			var width = $(this.div).css('width').replace('px', '');
			var height = $(this.div).css('height').replace('px', '');
			
			this.div.style.left = point.x - (width/2) + 'px';
			this.div.style.top = point.y - height + 'px';
		}
	};

	Post.prototype.remove = function()
	{
		if (this.div)
		{
			this.div.parentNode.removeChild(this.div);
			this.div = null;
		}	
	};
	
	window._Post = Post;
});