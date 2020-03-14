import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
 
function NotesList(props) {

    console.log(props.notes)
    return (
            <div className="container">
                    <h2> Listing Notes </h2>
                
                    <ul>
                        {
                            props.notes.map(note => {
                                return <li key={note._id}>{note.title}<Link to={`/notes/${note._id}`}> Show</Link></li>
                            })
                        }
                    </ul>
                    <Link to='/notes/new'> Add new note</Link>
            </div>
        )       

}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        notes: state.notes
    }
}


export default connect(mapStateToProps)(NotesList)