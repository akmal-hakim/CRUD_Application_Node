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
	* Description Root Route
	* method GET/
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

	---

*/


/*
	PART 11 API
	---
	INSIDE model CREATE ANOTHER FILE NAME model.js
	MAKE THIS CODE 

	const mongoose = require('mongoose');

	var scheme = new mongoose.Scheme({ //Allow to define a shape and content of the document	
		name : {
			type : String,
			required: true
		},
		email : {
			type: String,
			required: true,
			unique: true
		},
		gender : String,
		status : String
	})   
	
	const Userdb = mongoose.model('userdb', scheme);
	module.exports = Userdb;

*/

/*
	PART 12 CREATE A CONTROLLER
	---
	CREATE CONTROLLER INSIDE THE controller FOLDER AND NAME IT controller.js
	USE THIS CODE NEXT

	var Userdb = require('../model/model');

	//create and save new user
	exports.create = (req,res)=>{

	}

	// retrieve and return all users/ retrive and return a single user
	exports.find = (req, res)=>{

	}

	// Update a new idetified user by user id
	exports.update = (req, res)=>{
	
	}

	// Delete a user with specified user id in the request
	exports.delete = (req, res)=>{

	}

	---
	IN THE router.js TYPE THIS

	const controller = require('../controller/controller');
	.
	.
	. 

	AT THE BOTTOM TYPE THIS 
	//API
	route.post('/api/users', controller.create);
	route.get('/api/users', controller.find);
	route.put('/api/users/:id', controller.update);
	route.delete('/api/users/:id', controller.delete);

*/

/*
	PART 13 IMPLEMENT THE CONTROLLER
	---
	CREATE ALL THE CODING FOR THE CONTROLLER 

	GO CHECK AT THE controller.js 

*/

/*
	PART 14 POSTMAN
	---
	Download Postman 

	Create a new tab
	Choose post request TYPE
	Specify the url and the API link
	Specify the body, if not get errors just like in the create function in the controller.js
	button choose x-www-form-urlencoded
	At the key speciy name,email,gender etc and state its value
	Click send 
	Successful message if success

*/

/*
	PaRT 15 FIND&UPDATE&delete
	---
	All learn from controller.js
	
*/

/*
	PART 16 USING API 
	---
	GO TO render.js
	
*/

/*
	PART 17 Create New Users
	---
	IN THE _form.ejs INSIDE THE FORM ADD ACTION
	<form action="/api/users" ... >

	Look at controller.
	--
	Next step is to apply pop up message when already saved data
	
	JQuery cdnjs

	paste the code before the closing tab __footer.ejs
	<script src="https:// cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
	<script src="/js/index.js"></script>
	--
	Then create a js file inside the assets folder index.js

	$("#add_user").submit(function(event){ //must be the same with form id="add_user"
    alert("Data Inserted Successfully!");
})

*/

/*
	PART 18 UPDATE 
	---
	Update the code in render.js 

	exports.update_user = (req, res) =>{
    axios.get('http:// localhost: 3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
	}
	--
	IN __show.ejs INSERT THIS CODE
	--

	"/update-user?id=<%= users[i]._id%>"
	--
	INSIDE THE update_user.ejs INSERT THIS CODE 

	"<%= user._id %>"
	"<%= user.name %>"
	"<%= user.email%>"
	value="Male" <%= user.gender == 'Male' ? 'checked' : '' %>
	value="Female"  <%= user.gender == 'Female' ? 'checked' : '' %>
	--
	INSIDE THE index.js AT js FOLDER 
	INSERT THIS 

	$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

	})
	--


*/


/*
	PART 19 DELETE
	---
	INSIDE THE __show.ejs

	data-id=<%= users[i]._id%>
	--
	INSIDE index.js IN js FOLDER

	if(window.location.pathname == "/"){
		$ondelete = $(".table tbody td a.delete");
		$ondelete.click(function(){
			var id = $(this).attr("data-id")

			var request = {
				"url" : `http:// localhost: 3000/api/users/${id}`,
				"method" : "DELETE"
			}

			if(confirm("Do you really want to delete this record?")){
				$.ajax(request).done(function(response){
					alert("Data Deleted Successfully!");
					location.reload();
				})
			}

		})
	}
	--

*/
