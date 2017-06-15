module.exports = function(app)
{
	var Point = require(_path.controller + '/model/Point');
	var multipart = require('connect-multiparty');
	var fs = require('fs');
	
	var checkLogin = function(callback)
	{
		var f = function(req, res, next)
		{
			if(req.session.user)
			{
				try
				{
					callback(req, res, next);
				}
				catch(err)
				{
					console.log(err.stack);
				}
			}
			else
			{
				res.status(401).end();
			}
		};
		
		return f;
	};
	
	app.get('/api/points/:post_id', checkLogin(function(req, res, next)
	{
		Point.find({postId: req.params.post_id}, function(err, list)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        res.status(200).send(list);
	    });
	}));
	
//	app.post('/api/points', checkLogin(function(req, res, next)
//	{
//		var post = new Point(req.body);
//		post.author = req.session.user.username;
//		
//		post.save(function(err)
//	    {
//            if(err)
//            	return res.status(500).send({error: err});
//            
//	        res.status(201).send(post);
//	    });
//	}));
	
	app.put('/api/points', checkLogin(function(req, res, next)
	{
		Point.find({postId : req.body.postId, author : req.session.user.username}, function(err, item)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!item || item.length <= 0)
	        {
	        	var point = new Point(req.body);
	        	point.author = req.session.user.username;
	        	point.isOwn = true;
	        	
	        	point.save(function(err)
    		    {
    	            if(err)
    	            	return res.status(500).send({error: err});
    	            
    		        res.status(201).send(point);
    		    });
	        }
	        else
	        {
	        	item = item[0];
	        	if(req.session.user.username == item.author)
		        {
		        	for(var key in req.body)
			        {
			        	if(Point.schema.tree.hasOwnProperty(key))
			        		item[key] = req.body[key];
			        }
		        	
			        item.save(function(err)
			        {
			        	if(err)
			        		return res.status(500).send({error: err});
			        	
			            res.status(200).end();
			        });
		        }
		        else
		        {
		        	res.status(401).end();
		        }
	        }
	    });
	}));
	
	app.delete('/api/points/:id', checkLogin(function(req, res, next)
	{
		Point.findById(req.params.id, function(err, item)
		{
			if(req.session.user.username == item.author)
	        {
			    Point.remove({ _id: req.params.id }, function(err, output)
			    {
			    	if(err)
		        		return res.status(500).send({error: err});
			    	
		    		res.status(204).end();
			    });
	        }
	    	else
	    	{
	    		res.status(401).end();
	    	}
		});
	}));
};