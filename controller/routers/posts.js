module.exports = function(app)
{
	var Post = require(_path.controller + '/model/Post');
	app.get('/api/posts', function(req, res, next)
	{
		Post.find(function(err, list)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        res.status(200).send(list);
	    });
	});
	
	app.get('/api/posts/:id', function(req, res, next)
	{
		Post.findOne({_id: req.params.id}, function(err, item)
		{
	        if(err)
	        	return res.status(500).send({error: err});
	        
	        if(!post)
	        	return res.status(404);
	        
	        res.status(200).send(item);
	    });
	});
	
	app.post('/api/posts', function(req, res, next)
	{
		var post = new Post(req.body);
		post.save(function(err)
	    {
            if(err)
            	return res.status(500).send({error: err});
            
	        res.status(201).send(post);
	    });
	});
	
	app.put('/api/posts/:id', function(req, res, next)
	{
		Post.findById(req.params.id, function(err, item)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!item)
	        	return res.status(404);
	        
	        for(var key in req.body)
	        {
	        	if(Post.schema.tree.hasOwnProperty(key))
	        		item[key] = req.body[key];
	        }
	 
	        item.save(function(err)
	        {
	        	if(err)
	        		return res.status(500).send({error: err});
	        	
	            res.status(200).end();
	        });
	    });
	});
	
	app.delete('/api/posts/:id', function(req, res, next)
	{
	    Post.remove({ _id: req.params.id }, function(err, output)
	    {
	    	if(err)
        		return res.status(500).send({error: err});
	    	
	        res.status(204).end();
	    });
	});
};