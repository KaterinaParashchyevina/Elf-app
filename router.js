module.exports = function(app, express, passport){
	var template = 'templates/template.ejs';
    

    var product_list = require('./config/product.js');

	app.use(express.static(__dirname + '/public'));

	app.get('/', function(req, res){
		res.render(template, {page:"main"});
	})
    
   
	app.get('/product:id',isLoggedIn, function(req, res){
        if(req.params.id == 1){   
            res.render(template,product_list.product1);
         }  else if (req.params.id == 2){
            res.render(template,product_list.product2);
         } else if (req.params.id == 3){
            res.render(template,product_list.product3);
         } else if (req.params.id == 4){
            res.render(template,product_list.product4);
         } else if (req.params.id == 5){
            res.render(template,product_list.product5);
         } else if (req.params.id == 6){
            res.render(template,product_list.product6);
         }
    	
	})
     
	app.get('/login', function(req, res){
		res.render(template, {page:"login", message: req.flash('loginMessage')});
	})

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.get('/signup', function(req, res, user){
		res.render(template, {page:"signup", message: req.flash('signupMessage')});
        // socket.emit("userSignup", user);
	})
	  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/guest', function(req, res){
        res.render(template,{page: "guest"})
    })
	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
  

    app.use(function (req, res, next) {
        res.locals.login = req.isAuthenticated();
        next();
    });
    app.use(function(req, res){
        res.status(404);
        res.render(template, {page: "404"});
    })

    app.use(function(req, res){
        res.status(500);
        res.render(template, {page: "500"});
    })


}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}