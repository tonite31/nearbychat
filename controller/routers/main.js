module.exports = function(app)
{
	app.get('/', function(req, res, next)
	{
		if(req.session.user)
			res.redirect('/index');
		else
			res.redirect('/login');
	});
	
	app.get('/login', function(req, res, next)
	{
		res.render('login');
	});
	
	app.get('/index', function(req, res, next)
	{
		if(!req.session.user)
		{
			res.redirect('/login');
			return;
		}
		
		res.render('index');
	});
};