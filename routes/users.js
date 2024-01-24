const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users},null,4));                           //send every user
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;                                       //store the specified email
  let specific_users = users.filter(
    (user) => user.email == email                                       //check which users have the email
  );
  res.send(specific_users)                                              //send the found users
});

//GET request: Get all users with a particular last name
router.get("/lastName/:lastName",(req,res)=>{
  const lastName = req.params.lastName;                                 //store the specified lastName
  let specific_lastname = users.filter(                                  
    (user) => user.lastName === lastName                                //check which users have the lastName
  );
  res.send(specific_lastname);                                          //send the found users
});

//function to support GET request for sorting users by DOB
function getDateFromString(strDate) {       
  let [dd, mm, yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}//getDateFromString

//GET request: Sort all users by DOB
router.get("/sort",(req,res)=>{
  let sorted_users = user.sort( function(a,b){                          //use function to sort users
    let d1 = getDateFromString(a.DOB);                                  
    let d2 = getDateFromString(b.DOB);
    return d1-d2;
});
  res.send(sorted_users);                                               //send sorted users
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,                          //push the new user into list of users
            "lastName":req.query.lastName,
            "email":req.query.email,
            "DOB":req.query.DOB});
  res.send("Added new user " + (req.query.firstName) + "!");            //send complete message
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;                                     //store given email
    let filtered_users = users.filter((user) => user.email === email);  //filter user by email
    if (filtered_users.length > 0) {                                    //if a user was found
        let filtered_user = filtered_users[0];                          //pick the actual user
        let DOB = req.query.DOB;                                        //store given DOB
        let firstName = req.query.firstName;                            //store given firstName
        let lastName = req.query.lastName;                              //store given lastName
        if(DOB) {                                                       
            filtered_user.DOB = DOB                                     //DOB has changed, change the it for user
        }//if
        if(firstName) {                                                 
            filtered_user.firstName = firstName                         //firstName has changed, change it for user
        }//if
        if(lastName) {                                                  
            filtered_user.lastName = lastName                           //lastName has changed, change it for user
        }//if
        
        users = users.filter((user) => user.email != email);            //get rest of users by filtered email
        users.push(filtered_user);                                      //put changed user back in
        res.send(`User with the email ${email} updated.`);             //send update message confirmation
    }
    else{
        res.send("Unable to find user!");                               //send error message
    }
  });


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;                                     //store the given email
    users = users.filter((user) => user.email != email);                //filter users to not include given email
    res.send(`User with the email ${email} deleted.`);                  //send confirmation message that user is gone
  });

module.exports=router;
