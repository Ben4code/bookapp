const express = require('express');
const graphqlHTTp = require('express-graphql');


const app = express();




const port = 4000;
app.listen(port, ()=>{
    console.log(`App now listening on ${port}`)
})