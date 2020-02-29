import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NotesList extends React.Component {
    constructor() {
        super()
        this.state = {
            notes: []
        }
    }
    
    render() {
        return (
            <div>
                    <h2> Listing Notes </h2>
                    <ul>
                        {
                            this.state.notes.map(note => {
                                return <li key={note._id}>{note.title}<Link to={`/notes/${note._id}`}> Show</Link></li>
                            })
                        }
                    </ul>
                    <Link to='/notes/new'> Add new note</Link>
            </div>
        )
    }
}

export default NotesList