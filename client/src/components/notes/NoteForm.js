import React from 'react'

export default class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title = props.title ? props.title: '',
            description = props.description ? props.description : '',
            category = props.category ? props.category : '',
            categories = props.categories
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    
    render() {
        return(
            <div> 
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor="title"> Title 
                    <input type="text" id = "title" value = {this.state.title} onChange = {this.handleChange} /> <br/>
                    </label>
                    <label htmlFor="description"> Title 
                    <input type="text" id = "description" value = {this.state.description} onChange = {this.handleChange} /> <br/>
                    </label>

                    <select onChange = {this.handleSelect} >
                        <option value ="select"> Select</option>
                        {
                            this.state.categories.map(category => {
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