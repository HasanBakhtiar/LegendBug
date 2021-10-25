import React, { Component } from 'react';
import Nav from './Nav';
import Users from './Users';
import Search from './Search';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
        this.state={
            users: []
        }
    }

    searchUsers(keyword){
            axios
            .get(`https://api.github.com/search/users?q=${keyword}`)
            .then(res=>this.setState({users:res.data.items}))
    }


    render() {
        return (
            <div>
                <Nav title=" Github" icon="fab fa-github" url="https://github.com" />
                <Search searchUsers = {this.searchUsers}/>
                <Users users={this.state.users}/>
            </div>
        )
    }
}

export default App
