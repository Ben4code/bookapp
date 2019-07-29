import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
    
    displayBookDetails = () =>{
        const {book} = this.props.data;
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>Genre: <span>{book.genre}</span></p>
                    <p>By: <span>{book.author.name}</span></p>
                    <ul className="other-books">
                        <p>Other books written by {book.author.name}:</p>
                        {
                            book.author.books.map(item => <li key={item.id}>{item.name}</li>)
                        }
                    </ul>
                </div>
            )
        }else{
            return (<h3>Click on any book to diaplay book details</h3>)
        }
    }


    render() {
        console.log(this.props);
        return (
            <div className="book-details">
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props)=>{
        return{
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)