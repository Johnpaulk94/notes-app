import React from 'react'
import {connect} from 'react-redux'
import {startGetCategories} from '../../actions/category'
import {startAddNotes} from '../../actions/notes'

class NewNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title :  '',
            description :  '',
            category :  ''
        }
    }

    handleChange = (e) => {
        this.setState( {[e.target.name]: e.target.value})
    }

    handleSelect = (e) => {
        this.setState({[e.target.id] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            category : this.state.category
        }
        console.log('handleSubmit formData',formData)
        this.props.dispatch(startAddNotes(formData))
        this.props.history.push('/notes')
    }
    
    fetchCategories = () => {
        this.props.dispatch(startGetCategories())
    }

    render() {
        if(this.props.categories.length === 0) {
            this.fetchCategories()
        }
        return(
            <div className="container">
                <h2> Add a New Note</h2>
                <form onSubmit = {this.handleSubmit}>
                    <div className="formgroup">
                        <input type="text" className = "form-control" placeholder = "title" name="title" value={ this.state.title} onChange = { this.handleChange }/>
                    </div>
                    <div className="formgroup">
                        <input type="text" className = "form-control" placeholder = "description" name="description" value={ this.state.description} onChange = { this.handleChange }/>
                    </div>
                    <label>Category :
                        <select className = "form-control" id = "category" onChange = { this.handleSelect }>
                            <option value="select">Select</option>
                            {
                                this.props.categories.map(category => {
                                    return <option key = {category._id} value= {category._id}>{ category.name }</option>
                                })
                            }
                        </select>
                    </label>
                    <button type="Submit" className="btn btn-primary">Create Note</button>
                </form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(NewNote)