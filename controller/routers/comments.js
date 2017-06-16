module.exports = function(app)
{
	var Comment = require(_path.controller + '/model/Comment');
	var multipart = require('connect-multiparty');
	var fs = require('fs');
	
	var checkLogin = function(callback)
	{
		var f = function(req, res, next)
		{
			if(req.session.user)
			{
				callback(req, res, next);
			}
			else
			{
				res.status(401).end();
			}
		};
		
		return f;
	};
	
	app.get('/api/comments/:post_id', checkLogin(function(req, res, next)
	{
		Comment.find({postId: req.params.post_id}, function(err, list)
		{
			if(err)
				return res.status(500).send({error: err});
			
			for(var i=0; i<list.length; i++)
			{
				if(list[i].author == req.session.user.username)
					list[i].isOwn = true;
				else
					list[i].isOwn = false;
				
				console.log('흠 : ', list[i]);
			}
			
	        res.status(200).send(list);
	    });
	}));
	
	app.post('/api/comments', checkLogin(function(req, res, next)
	{
		var comment = new Comment(req.body);
		comment.author = req.session.user.username;
		
		comment.save(function(err)
	    {
            if(err)
            	return res.status(500).send({error: err});
            
	        res.status(201).send(comment);
	    });
	}));
	
	app.put('/api/comments/:id', checkLogin(function(req, res, next)
	{
		Comment.findById(req.params.id, function(err, item)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!item)
	        	return res.status(404);
	        
	        if(req.session.user.username == item.author)
	        {
	        	for(var key in req.body)
		        {
		        	if(Comment.schema.tree.hasOwnProperty(key))
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
	    });
	}));
	
	app.delete('/api/comments/:id', checkLogin(function(req, res, next)
	{
		Comment.findById(req.params.id, function(err, item)
		{
			if(req.session.user.username == item.author)
	        {
			    Comment.remove({ _id: req.params.id }, function(err, output)
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