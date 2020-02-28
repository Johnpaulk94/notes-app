import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {startRegister} from '../../actions/users'

class Register extends React.Component  {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        console.log(formData)
        const redirect = () => {
            return this.props.history.push('/users/login')
        }
        
        this.props.dispatch(startRegister(formData,redirect))

    }

    render() {
        return (
            <div className="container">
                <h1>Register With Us</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="username" name="username" className="form-control"
                            value ={this.state.username} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="email" name="email" className="form-control"
                            value ={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="password" name="password" className="form-control"
                            value ={this.state.password} onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        )
    }
}

export default connect()(Register)