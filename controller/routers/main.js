module.exports = function(app)
{
	var Post = require(_path.controller + '/model/Post');
	
	app.get('/', function(req, res, next)
	{
		res.render('index');
	});
	
	app.get('/api/posts', function(req, res, next)
	{
		Post.find(function(err, posts)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        res.status(200).send(posts);
	    });
	});
	
	app.get('/api/posts/:id', function(req, res, next)
	{
		Book.findOne({_id: req.params.id}, function(err, post)
		{
	        if(err)
	        	return res.status(500).send({error: err});
	        
	        if(!book)
	        	return res.status(404);
	        
	        res.status(200).send(post);
	    })
	});
	
	app.post('/api/posts', function(req, res, next)
	{
		var post = new Post();
	    book.content = req.body.content;
	    book.author = req.body.author;
	 
	    book.save(function(err)
	    {
            if(err)
            	return res.status(500).send({error: err});
            
	        res.status(201).end();
	    });
	});
	
	app.put('/api/posts/:id', function(req, res, next)
	{
		Post.findById(req.params.id, function(err, post)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!post)
	        	return res.status(404);
	 
	        if(req.body.content)
	        	book.content = req.body.content;
	        
	        if(req.body.author)
	        	book.author = req.body.author;
	 
	        post.save(function(err)
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
	    })
	});
};