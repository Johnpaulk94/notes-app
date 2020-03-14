import React from 'react'
import {connect} from 'react-redux'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title :  '',
            description :  '',
            category :  ''
        }
    }


    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        const formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('category',this.state.category)
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    
    render() {
        console.log('note form render')
        console.log('note in props',this.props)
        return(
            <div>
                <h2> Add New Note</h2>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor="title"> Title 
                    <input type="text" id = "title" value = {this.state.title} onChange = {this.handleChange} /> <br/>
                    </label>
                    <label htmlFor="description"> description 
                    <input type="text" id = "description" value = {this.state.description} onChange = {this.handleChange} /> <br/>
                    </label>

                    <select onChange = {this.handleSelect} >
                        <option value ="select"> select category</option>
                        {
                            this.props.categories.map(category => {
                            return <option name = "category" value ={category._id} key = {category._id} > {category.name}</option> 
                            })
                        }
                    </select>
                    <input type="Submit" name="" value="Create Note"/>
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

export default connect(mapStateToProps)(NoteForm)