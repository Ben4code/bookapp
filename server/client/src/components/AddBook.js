import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
{
    authors {
        name
        id
    }
}
`

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book_name: '',
            genre: '',
            author: ''
        }
    }

    selectAutorOptions = () =>{
        const {loading, authors} = this.props.data;
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
        e.preventDefault();
        console.log(this.state);
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandle}>
                    <div className="field">
                        <label htmlFor="name">Book Name</label>
                        <input type="text" name="book_name" onChange={this.onChangeHandle} value={this.state.book_name} />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Book Genre</label>
                        <input type="text" name="genre" onChange={this.onChangeHandle} value={this.state.genre} />
                    </div>
                    <div className="field">
                        <select name="author" onChange={this.onChangeHandle} value={this.state.author}>
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

export default graphql(getAuthorsQuery)(AddBook)