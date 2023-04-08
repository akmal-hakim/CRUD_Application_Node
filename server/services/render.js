const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            //console.log(response.data) will show the log of data and other objects
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


/*
    PART 16 Render.js
    ---
    Old Code at PART 9

    exports.homeRoutes = (req,res) => {
		res.render('index');
	}

	exports.add_user = (req,res) => {
		res.render('add_user');
	}

	exports.update_user = (req,res) => {
		res.render('update_user');
	}
    
    ----
    After that 

    Inside the render.js
    exports.homeRoutes = (req,res) => {
		res.render('index',(users: "New Data");
	}
    --
    Inside the index.ejs
    <%= users %>
    //You will notice that it will appear a string "New Data"
    //This is how you display it from render.js to index.ejs

    --
    After that
    Inside the render.js

    const axios = require('axios'); //This module will allow us to make a request
    
    and look at the 
    console.log(response.data) on top
    THATS JUST FOR AN EXAMPLE ONLY
    --
    Next 
    at show.ejs
    //this will output all the data
    <% for(var i = 0; i < users.length; i++) { %>
    <tr>
        <td><%= i + 1 %></td>
        <td><%= users[i].name %></td>
        <td><%= users[i].email %></td>
        <td><%= users[i].gender %></td>
        <td><%= users[i].status %></td>
        <td>
            <a href="/update-user?id=<%= users[i]._id%>" class="btn border-shadow update">
                <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
            </a>
            <a class="btn border-shadow delete" data-id=<%= users[i]._id%> >
                <span class="text-gradient"><i class="fas fa-times"></i></span>
            </a>
        </td>
    </tr>
    <% } %>


*/