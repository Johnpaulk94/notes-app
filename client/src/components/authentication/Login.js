import React from 'react'
import {connect} from 'react-redux'
import { startGetUser } from '../../actions/users'


class Login extends React.Component  {
    constructor() {
        super()
        this.state = {
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
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            this.props.history.push('/')
        }
        this.props.dispatch(startGetUser(formData, redirect))
    }

    render() {
        return (
            <div className="container">
                <h1>Login to the notes app</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <input type="text" placeholder="email" name="email" className="form-control"
                            value ={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="password" name="password" className="form-control"
                            value ={this.state.password} onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        )
    }
}

export default connect()(Login)