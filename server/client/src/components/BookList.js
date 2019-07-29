import React, { Component } from 'react'
import BookDetails from './BookDetails'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'


class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }


    dispalyBooks = () => {
        const { loading, books } = this.props.data;
        if (loading) {
            return (<img src="./img/spinner.gif" alt="loading" />)
        } else {
            return books.map(book => <li onClick={(e)=> this.setState({selected: book.id})} key={book.id}>{book.name}</li>)
        }
    }

    render() {
        return (
            <div>
                <ul className="book-list">
                    {this.dispalyBooks()}
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)