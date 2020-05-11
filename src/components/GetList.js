import React, { Component } from 'react'
import axios from 'axios'
class GetList extends Component {

constructor(props) {
    super(props)

    this.state = {
         posts: [],
         error: ''
    }
}

componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then(
        response => {
            console.log(response)
            this.setState({posts: response.data})
        }).catch(error => {
            console.log(error)
            this.setState({errorMsg: 'Error retrieving Data'})
        })
}

    render() {
        const {posts, errorMsg} = this.state
        return (
            <div>
                <h1>List Of Posts</h1>
                {
                    posts.length ?
                posts.map(post => <div key = {post.id}>Title = {post.title} <br></br>Body = {post.body}</div>) : 
                null

                }{
                    errorMsg ? <div>{errorMsg}</div> : null
                }
            </div>
        )
    }
}

export default GetList
