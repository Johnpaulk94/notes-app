import React from 'react'
import axios from 'axios'

export default class NoteShow extends React.Component {
    constructor() {
        super()
        this.state = {
            note : {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`)
            .then(response => {
                const note = response.data
                this.setState({note})
            })
    }

    handleDelete = () => {
        const id = this.props.match.params.id
        axios.delete(`http://localhost:3015/notes/${id}`)
            .then(response => {
                if(response.data._id) {
                    this.props.history.push('/notes')
                }
            })
            .catch(err => {
                alert(err)
            })
    }
    handleClick= () => {
        
    }
    render() {
        return (
            <div>
                <h3> Note Title : {this.state.note.title} </h3>
                <p> Body: {this.state.note.description}</p>
                <p> Category: {Object.keys(this.state.note).length === 0 ? '' : this.state.note.category.name}</p>
                <button onClick = {this.handleClick}> Edit </button>
                <button onClick = {this.handleDelete}> Delete</button>
            </div>
        )
    }
}