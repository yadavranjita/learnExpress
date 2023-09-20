// const calculate = require('./calculate');
// console.log(calculate.add(2,3));
// console.log(calculate.subtract(2,3));
// console.log(calculate.multiply(2,3));
// console.log(calculate.divide(2,3));

// const fs = require('fs');
// fs.readFile('document.text','utf8', (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
//import the express module bcs request and respose handle garnu xa
//port: thau jaha hami kehi herna sakxau, eg html 3000
//get : data dinxa.
//path '/'
//call back function 
const express = require('express');
const app = express();
const port = 5000;
const userRoutes = require("./Routes/userRoutes");
const connectDB = require("./config/db");

connectDB();
app.use(express.json());
app.use(userRoutes);
// app.get('/users', (req, res) =>{
//    const users = [
//     {id: 1, name: 'John'},
//     {id: 2, name: 'Jane'},
//     {id: 3, name: 'Bob'},
//    ];
//     // res.send("Hello World");
//     res.json(users);
// });
// app.get('/users/:name', (req, res) =>{
//     const user = (`Hello ${req.params.name}`);
//     res.json(user);
// });
// app.get('/users/:id', (req, res) =>{
//     const user = {id: req.params.id, name: 'John'};
//     res.json(user);
// });
// app.post('/users', (req, res) =>{
//     res.send('Post request sent');
// });
app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
});
