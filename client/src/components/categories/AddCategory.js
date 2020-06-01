import React from 'react'
import {connect} from 'react-redux'
import {startAddCategory} from '../../actions/category'

class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
        }
        console.log(formData)
        this.props.dispatch(startAddCategory(formData))
        this.props.history.push('/categories')
    }

    render() {
        console.log('adding category page')
        return (
            <div className="container">
                <h2>Add new category</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className = "form-group">
                        <input type="text" className = "form-control" onChange = { this.handleChange } name="name" value= { this.state.name } placeholder = "Category" />
                    </div>
                <button type="submit" className="btn btn-primary">Add category</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddCategory)