window.components.push(function()
{
	function MessageMarker(latlng, map, args)
	{
		this.latlng = latlng;
		this.args = args;
		this.setMap(map);
	}
	
	MessageMarker.prototype = new google.maps.OverlayView();

	MessageMarker.prototype.draw = function()
	{
		var self = this;
		var div = this.div;
		if (!div)
		{
			div = this.div = document.createElement('div');
			div.className = 'message-marker';
			
			if (typeof(self.args.marker_id) !== 'undefined')
			{
				div.dataset.marker_id = self.args.marker_id;
			}
			
			var panes = this.getPanes();
			panes.overlayImage.appendChild(div);
		}
		
		this.move(this.latlng);
	};

	MessageMarker.prototype.remove = function()
	{
		if (this.div)
		{
			this.div.parentNode.removeChild(this.div);
			this.div = null;
		}	
	};

	MessageMarker.prototype.getPosition = function()
	{
		return this.latlng;	
	};
	
	MessageMarker.prototype.move = function(location)
	{
		var point = this.getProjection().fromLatLngToDivPixel(location);
		if (point)
		{
			this.div.style.left = point.x + 'px';
			this.div.style.top = point.y + 'px';
		}
	};
	
	MessageMarker.prototype.setText = function(text)
	{
		this.div.innerText = text;
	};
	
	window.MessageMarker = MessageMarker;
});