module.exports = function(app)
{
	var Post = require(_path.controller + '/model/Post');
	var User = require(_path.controller + '/model/User');
	
	app.post('/auth/signin', function(req, res, next)
	{
		if(req.body.signup)
		{
			var user = new User(req.body);
			user.location = JSON.stringify({lat : '37.4987974', lng : '127.0274636'});
			user.save(function(err)
		    {
	            if(err)
	            	return res.status(500).send({error: err});
	            
	            delete user.password;
	            req.session.user = user;
	            
		        res.status(201).end('created');
		    });
		}
		else
		{
			User.findOne({username : req.body.username}, function(err, item)
			{
				if(err)
					return res.status(500).send({error: err});
				
				if(!item)
					return res.status(404).end('not_found');
				
				if(item.password != req.body.password)
					return res.status(200).end('not_authorized');
				
				delete item.password;
				req.session.user = item;
				
				res.status(200).end('ok');
			});
		}
	});
	
	app.get('/api/me', function(req, res, next)
	{
		if(req.session.user)
		{
			return res.status(200).send(req.session.user);
		}
		
		res.status(404).end();
	});
	
	app.get('/auth/users', function(req, res, next)
	{
		User.find(function(err, list)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        res.status(200).send(list);
	    });
	});
	
	app.get('/auth/users/:id', function(req, res, next)
	{
		User.findOne({_id: req.params.id}, function(err, item)
		{
	        if(err)
	        	return res.status(500).send({error: err});
	        
	        if(!post)
	        	return res.status(404);
	        
	        res.status(200).send(item);
	    });
	});
	
	app.put('/auth/users/:id', function(req, res, next)
	{
		User.findById(req.params.id, function(err, item)
		{
			if(err)
				return res.status(500).send({error: err});
			
	        if(!item)
	        	return res.status(404);
	 
	        for(var key in req.body)
	        {
	        	if(User.schema.tree.hasOwnProperty(key))
	        		item[key] = req.body[key];
	        }
	 
	        //게시글의 작성자를 모두 바꿔줘야 한다.
	        user.save(function(err)
	        {
	        	if(err)
	        		return res.status(500).send({error: err});
	        	
	            res.status(200).end();
	        });
	    });
	});
	
	app.delete('/auth/users/:id', function(req, res, next)
	{
		User.remove({ _id: req.params.id }, function(err, output)
	    {
	    	if(err)
        		return res.status(500).send({error: err});
	    	
	        res.status(204).end();
	    });
	});
};