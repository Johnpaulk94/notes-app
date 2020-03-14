import React from 'react'
import NoteForm from './Form'
import {connect} from 'react-redux'

import {startAddNote} from '../../actions/notes'

class NoteNew extends React.Component {
    handleSubmit = (formData) => {
        console.log('new note', formData)
        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(formData,redirect)
    }

    render() {
        console.log('new note component')
        return (
            <div>
                <NoteForm handleSubmit = {this.handleSubmit} title = 'Add new Note' />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories : state.categories
    }
}

export default connect(mapStateToProps)(NoteNew)