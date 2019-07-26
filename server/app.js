const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const  mongoose = require('mongoose')

mongoose.connect('mongodb://ben4code:ben4code@ds343217.mlab.com:43217/gql-bookapp', {useNewUrlParser: true})
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log(err))


const app = express();


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const port = 4000;
app.listen(port, ()=>{
    console.log(`App now listening on ${port}`)
});