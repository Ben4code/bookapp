const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const  mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect('mongodb://ben4code:ben4code@ds343217.mlab.com:43217/gql-bookapp', {useNewUrlParser: true})
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log(err))


const app = express();

//Allow cross origin requests
app.use(cors());



app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const port = 4000;
app.listen(port, ()=>{
    console.log(`App now listening on ${port}`)
});