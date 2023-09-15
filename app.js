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
const port = 3000;
app.use(express.json());
app.get('/', (req, res) =>{
   res.send("Hello World");
});

app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
});