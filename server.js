const express = require('express'); // Help makes request handling easier by mapping requests to different requests handlers
const dotenv = require('dotenv'); // Allows to seperate your secret from your source code
const morgan = require('morgan');// Allows us to log a request on a console whenever we make a request
const bodyparser = require("body-parser"); //
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")

// must include const path. __dirname is the CRUD_APPLICATION_NODE (folder name)
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

/*
	PART 1 Old Ways to load page 
	---
	const express = require('express'); 
	const app = express();

	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(3000, ()=> { console.log(`Server is running on http://localhost:${3000}`)});

/*

/*
	PART 2 Old Ways to load page PART 2
	---

	const express = require('express'); 
	const app = express();
	const PORT = process.env.PORT || 8080  //8080 is the default value
	
	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

/*

/*
	PART 3 Old Ways to load page 
	---
	//Must create a config.env file and set its PORT
	PORT=3000

	---
	const express = require('express'); 
	const app = express();
	const dotenv = require('dotenv');
	const morgan = require('morgan');

	dotenv.config( {path:'config.env'})
	const PORT = process.env.PORT || 8080 
	
	//log requests
	app.use(morgan('tiny'));

	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

/*

/*
	PART 4 Adding body parse and module 
	---
	const express = require('express'); 
	const app = express();
	const dotenv = require('dotenv');
	const morgan = require('morgan');
	const bodyparser = require()

	const app = express();

	dotenv.config( {path:'config.env'})
	const PORT = process.env.PORT || 8080 

	//log requests
	app.use(morgan('tiny'));

	//parse requests to body-parser
	app.use(bodyparser.urlencoded({extended:true}))

	// Once already declare EJS - Embended Javascript 
	app.set("view engine","ejs") //can change ejs to html or pug view engine depend on ur project  

	app.get('/',(req,res)=>{
		res.render('Crud Application'); //respond render index
	})
	
	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

*/


/*
	PART 5
	---
	const express = require('express'); 
	const app = express();
	const dotenv = require('dotenv');
	const morgan = require('morgan');
	const bodyparser = require()

	const app = express();

	dotenv.config( {path:'config.env'})
	const PORT = process.env.PORT || 8080

	//log requests
	app.use(morgan('tiny'));

	//parse requests to body-parser
	app.use(bodyparser.urlencoded({extended:true}))
	
	//set view engine
	app.set("view engine","ejs")
	//app.set("views",path.resolve(__dirname, "views/ejs"))

	//load assets
	app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
	app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
	app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

	app.get('/',(req,res)=>{
		res.render('Crud Application'); //respond render index
	})
	
	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

*/

/*
	PART 6 CREATING VIEWS
	---
	// CREATE index.ejs AT views FOLDER 

	---
	THEN CHANGE THIS 

	app.get('/',(req,res)=>{
		res.render('index'); 
	})

	---
	THEN CREATE include FOLDER INSIDER THE views folder
	THEN CREATE A _header.ejs AND _footer.ejs 
	AND MAKE CODING FOR THE HEADER AND FOOTER IN THE EJS 
	---
	INSDIE THE index.ejs FILE CREATE THIS code

	<!-- include header -->
    <%- include('include/_header') %>
	<!-- /include header -->

	<!-- include footer -->
	<%- include('include/_footer') %>
	<!-- /include footer -->


*/

/*
	PART 7 JUST FOR DESIGN
	--- 
	CREATE index.html INSIDE THE views FOLDER

	--- 
	THEN DOWNLOAD AN EXTENSION FOR THE Visual Studio code AND INSTALL Live Server Extension 
	USING THE LIVE SERVER WILL LAUNCH A LOCAL SERVER WITH LIVE RELOAD FEATURE 
	WHEN EVER MADE CHANGES IN HTML FILE IT WILL AUTOMATICALLY RESTART WITHOUT RESTARTING THE SERVER MANUALLY 

	---
	THEN DESIGN THE VIEWS FOR FORM PAGE SHOW 

	---
	THEN DESIGN THE CSS FILE 

	---
	AFTER HAVE DONE EVERYTHING WITH THE HTML THE MAKE A NEW FILE INSIDE include FOLDER
	_form.ejs AND _show.ejs
	AND add_user.ejs update_user.ejs INSIDE views
	
	---
	DONT FORGET TO ADD ROUTE AT THE server.js FILE

	app.get('/',(req,res)=>{
		res.render('index'); 
	})

	app.get('/add-user',(req,res)=>{
		res.render('add_user'); 
	})

	app.get('/update-user',(req,res)=>{
		res.render('update_user'); 
	})

	---
	CLIENT SITE IS FINISH NOW THE SERVER SITE

*/

// SERVER SITE

/*
	PART 8 CREATING ROUTER
	---
	PASTE EVERY GET INTO THE router.js FILE 
	DON'T FORGET TO DECLARE THE METHOD

	const express = require('express');
	const route = express.Router()

	AND AT THE BOTTOM CREATE THIS CODE SO IT CAN BE USE AT server.js
	module.exports = route

	---
	IN THE server.ejs FILE INSERT THIS CODE 
	app.use('/', require('./server/routes/router'))

	---


*/

/*
	Part 9 CHANGE ROUTE
	--- 
	INSIDE router.js

	const express = require('express');
	const route = express.Router()

	const services = require('../services/render');

	/**
	* @Description Root Route
	* @method GET/
	* /
	route.get('/',services.homeRoutes);

	route.get('/add-user',services.add_user);

	route.get('/update-user',services.update_user);

	module.exports = route

	---
	CREATE A FILE INSIDE THE services FOLDER AND NAME IT 
	render.js

	exports.homeRoutes = (req,res) => {
		res.render('index');
	}

	exports.add_user = (req,res) => {
		res.render('add_user');
	}

	exports.update_user = (req,res) => {
		res.render('update_user');
	}

*/

/*
	PART 10 MongoDB DATABASE
	---
	SETUP MONGODB IN THE BROWSER 

	--- 
	IN THE FOLDER config.env 
	USE THE CODE FROM MONGODB
	
	MONGO_URI=mongodb+srv://admin:<password>@testing.frmzpqh.mongodb.net/?retryWrites=true&w=majority
	---
	CREATE ANOTHER FILE IN THE server/database FOLDER NAME
	connection.js

	WRITE THIS CODE

	const mongoose = require('mongoose');

	const connectDB = async () => {
		try{
			// mongodb connection string
			const con = await mongoose.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true
			})

			console.log(`MongoDB connected : ${con.connection.host}`);
		}catch(err){
			console.log(err);
			process.exit(1);
		}
	}

	module.exports = connectDB
	---
	IN THE server.js FOLDER ADD THIS 

	const connectDB = require('./server/database/connection');

	//mongodb connection
	connectDB();

*/
