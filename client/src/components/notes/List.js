import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
 
function NotesList(props) {

    console.log(props.notes)
    return (
            <div className="container">
                    <h2> Listing Notes </h2>
                    <div className="row">
                        {
                            props.notes.map(note => {
                                return (<div className="col-sm-6" key={note._id}>
                                            <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{note.title}</h5>
                                                <p className="card-text">{note.description}</p>
                                                <button className='btn btn-primary' onClick={() => { props.history.push(`/notes/edit/${note._id}`)}}>Edit</button>
                                            </div> 
                                            </div>
                                        </div>)
                            })
                        }
                    </div>
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