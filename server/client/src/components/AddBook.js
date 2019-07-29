import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries'

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    selectAutorOptions = () =>{
        const {loading, authors} = this.props.getAuthorsQuery;
        if(!loading){
            return authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    onChangeHandle = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }

    onSubmitHandle = (e) => {
        const {name, genre, authorId} = this.state;
        e.preventDefault();
        this.props.addBookMutation({
            variables:{ name: name, genre: genre, authorId: authorId },
            refetchQueries: [{query: getBooksQuery}]
        })
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Add New Book</h3>
                <form onSubmit={this.onSubmitHandle}>
                    <div className="field">
                        <label htmlFor="name">Book Name</label>
                        <input type="text" name="name" onChange={this.onChangeHandle} value={this.state.name} />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Book Genre</label>
                        <input type="text" name="genre" onChange={this.onChangeHandle} value={this.state.genre} />
                    </div>
                    <div className="field">
                        <select name="authorId" onChange={this.onChangeHandle} value={this.state.authorId}>
                            <option value="">Select Author</option>
                            {this.selectAutorOptions()}
                        </select>
                    </div>
                    <div className="field">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}),
)(AddBook)