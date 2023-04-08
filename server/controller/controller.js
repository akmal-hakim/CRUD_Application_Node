var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    
    //PART 14
    
    // validate request
    if(!req.body){ //If user make a post request without a body this error will occur
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //Once already check above it will create an instance of this user db model.
    // new user 
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data) //send data if got error will go to catch.
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

    /*
        OLD CODE 
        // validate request
        if(!req.body){ 
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }

        // new user 
        const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
        })

        // save user in the database
        user
            .save(user)
            .then(data => {
                res.send(data)
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Some error occurred while creating a create operation"
                });
            });

    */


}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    //PART 15

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    /*
        OLD CODE 
        // validate request
         Userdb.findById()
         .then(user =>{
            res.send(user)
         })
         .catch(err=>{
              res.status(500).send({ message : err.message || "Error Occurec while retriving user information" })
         })

    */



}

// Update a new idetified user by user id
exports.update = (req, res)=>{

    
    //PART 15
    //IN ROUTER USES PUT REQUEST

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    //THE PUT REQUEST IN THE ROUTER WILL PASS TO THIS 
    const id = req.params.id; //REQUEST WITH PARAMATER ID VALUE
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}