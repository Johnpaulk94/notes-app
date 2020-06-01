import React from 'react'
import { connect } from 'react-redux'
import { startEditNote} from '../../actions/notes'

class EditNote extends React.Component {
    constructor(props) {
        super(props)
        console.log('props',props)
        this.state = {
            title : props.note ? props.note.title : '' ,
            description : props.note ? props.note.description : '',
            category: props.category ? props.category._id : '',
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSelect = (e) => {
        console.log(e.target.id)
        this.setState({[e.target.id] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        console.log('state',this.state)
        const formData = {
            title: this.state.title,
            description: this.state.description,
            category : this.state.category
        }
        this.props.dispatch(startEditNote({formData,id}))
        this.props.history.push('/notes')
    }

    render() {
        return (
                <div className="container">
                <h2>Edit note</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className= "formgroup">
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className= "formgroup">
                        <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <label>Category:
                        <select className="form-control" id="category" onChange={this.handleSelect} >
                            <option value="select">Select</option>
                            {
                                this.props.categories.map(category => {
                                    if(category._id == this.state.category._id) {
                                    return <option key = {category._id} selected ="selected" value={category._id}>{category.name} </option>                                
                                    }
                                    return <option key={category._id} value={category._id}>{category.name}</option> 
                                })
                            }
                        </select>
                    </label>
                    <button type="submit" className='btn btn-primary'>submit</button>
                </form>
            </div>
        )
    } 
}

const mapStateToProps = (state,props) => {
    const note = state.notes.find(note => note._id === props.match.params.id)
    let category
    if(note) {
        category = state.categories.find(categy => categy._id === note.category._id)
    }
    return {
        note,
        category,
        categories : state.categories
    }
}

export default connect(mapStateToProps)(EditNote) 