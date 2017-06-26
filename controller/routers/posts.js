module.exports = function(app)
{
	var Post = require(_path.controller + '/model/Post');
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
	
	app.get('/api/posts', checkLogin(function(req, res, next)
	{
		Post.find(function(err, list)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        res.status(200).send(list);
	    });
	}));
	
	app.get('/api/posts/:id', checkLogin(function(req, res, next)
	{
		Post.findOne({_id: req.params.id}, function(err, post)
		{
	        if(err)
	        	return res.status(500).send({error: err});
	        
	        if(!post)
	        	return res.status(404);
	        
    		post.isOwn = req.session.user.username == post.author ? true : false;
	        res.status(200).send(post);
	    });
	}));
	
	app.post('/api/posts', checkLogin(function(req, res, next)
	{
		var post = new Post(req.body);
		post.author = req.session.user.username;
		
		post.save(function(err)
	    {
            if(err)
            	return res.status(500).send({error: err});
            
	        res.status(201).send(post);
	    });
	}));
	
	app.post('/api/posts/files', multipart(), checkLogin(function(req, res, next)
	{
		if(req.session.user)
		{
			try
			{
				var file = req.files.photo;
				var oldpath = file.path;
				var targetDir = _path.uploads + '/' + req.session.user.username;
				var newpath = targetDir + '/' + file.originalFilename;
				if(!fs.existsSync(targetDir))
					fs.mkdirSync(targetDir);
				
				fs.rename(oldpath, newpath, function (err)
				{
					if (err) throw err;
					
			        res.write('/uploads/' + req.session.user.username + '/' + file.originalFilename);
			        res.end();
			    });
			}
			catch(err)
			{
				console.log(err.stack);
				res.status(500).end(err.stack.toString());
			}
		}
		else
		{
			res.status(401).end();
		}
	}));
	
	app.put('/api/posts/:id', checkLogin(function(req, res, next)
	{
		Post.findById(req.params.id, function(err, item)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!item)
	        	return res.status(404);
	        
	        if(req.session.user.username == item.author)
	        {
	        	for(var key in req.body)
		        {
		        	if(Post.schema.tree.hasOwnProperty(key))
		        		item[key] = req.body[key];
		        }
	        	
	        	item.published_date = new Date();
		 
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
	
	app.delete('/api/posts/:id', checkLogin(function(req, res, next)
	{
		Post.findById(req.params.id, function(err, item)
		{
			if(req.session.user.username == item.author)
	        {
			    Post.remove({ _id: req.params.id }, function(err, output)
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