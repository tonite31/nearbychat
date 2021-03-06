window.components.push(function()
{
	var template = '<div class="image-pane"><img src="data:image/jpeg;base64,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"></div>';
	template += '<div class="function-pane">';
	template += '<span class="glyphicon glyphicon-pencil function write-post"></span>';
	template += '</div>';
	
	function Profile(map, me)
	{
		this.me = me;
		this.setMap(map);
	}
	
	Profile.prototype = new google.maps.OverlayView();

	Profile.prototype.draw = function()
	{
		var self = this;
		var div = this.div;
		if (!div)
		{
			div = this.div = document.createElement('div');
			div.className = 'component-profile';
			div.innerHTML = template;
			
			$(div).find('.write-post').on('click', function(e)
			{
				$('#postModal').modal('show');
				e.stopPropagation();
				e.preventDefault();
			});
			
			if (typeof(self.marker_id) !== 'undefined')
			{
				div.dataset.marker_id = self.marker_id;
			}
			
			var panes = this.getPanes();
			panes.overlayImage.appendChild(div);
		}
		
		this.move(this.me.location);
	};

	Profile.prototype.remove = function()
	{
		if (this.div)
		{
			this.div.parentNode.removeChild(this.div);
			this.div = null;
		}	
	};

	Profile.prototype.move = function(location)
	{
		this.me.location = location;
		
		var point = this.getProjection().fromLatLngToDivPixel(location);
		if (point)
		{
			var width = $(this.div).css('width').replace('px', '');
			var height = $(this.div).css('height').replace('px', '');
			
			this.div.style.left = point.x - (width/2) + 'px';
			this.div.style.top = point.y - height + 'px';
		}
	};
	
	Profile.prototype.getLocation = function()
	{
		return this.me.location;
	};
	
	window._Profile = Profile;
});