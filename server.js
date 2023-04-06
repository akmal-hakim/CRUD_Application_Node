const express = require('express'); 
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
	Old Ways to load page PART 1
	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(3000, ()=> { console.log(`Server is running on http://localhost:${3000}`)});
/*

/*
	Old Ways to load page PART 2
	const PORT = process.env.PORT || 8080 
	//8080 is the default value
	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
/*

/*
	Old Ways to load page PART 3
	//Must create a config.env file and set its PORT
	const dotenv = require('dotenv');
	
	dotenv.config( {path:'config.env'})
	const PORT = process.env.PORT || 8080 
	//8080 is the default value

	app.get('/',(req,res)=>{
		res.send("Crud Application");
	})

	app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
/*

/*
	PART 4
	// Once already declare EJS - Embended Javascript 
	app.set("view engine","ejs")

	app.get('/',(req,res)=>{
		res.render('index'); //respond render index
	})
	
*/