import React, {Component} from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBooksQuery = gql`
{
    books {
        name
        id
        author{
            name
            age
        }
    }
}
`

 class BookList extends Component {
    dispalyBooks = () => {
        const {loading, books} = this.props.data;
        if(loading){
            return( <img src="./img/spinner.gif" alt="loading"/> )
        }else{
            return books.map(book => <li key={book.id}>{book.name}</li>)
        }
    }
     
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.dispalyBooks()}
                </ul>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)