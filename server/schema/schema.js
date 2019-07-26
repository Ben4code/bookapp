const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//Dummy db
const booksArray = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The final Empire', genre: 'Fantasy', id: '2', authorId: '3' },
    { name: 'The Hand of the King', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'Handmain of the Queen', genre: 'Romance', id: '4', authorId: '3' },
    { name: 'Becoming Nnaemeka', genre: 'Motivation', id: '5', authorId: '3' },
    { name: 'Hallow uprising', genre: 'Thriller', id: '6', authorId: '3' }
]


const authorsArray = [
    { name: 'Mike Winsdor', age: 39, id: '1' },
    { name: 'Tony Maguire', age: 44, id: '2' },
    { name: 'Sarah King', age: 23, id: '3' }
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authorsArray.filter(author => author.id === parent.authorId)[0]
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return booksArray.filter(book => book.authorId === parent.id)
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return booksArray.filter(book => book.id === args.id)[0]
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return authorsArray.filter(author => author.id === args.id)[0]
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return booksArray
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authorsArray  
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})