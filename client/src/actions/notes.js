import axios from 'axios'

export const setNotes = (notes) => {
    console.log('action working')
    return {
        type: 'SET_NOTES',
        payload: notes
    }
}

export const startSetNotes = () => {
    return(dispatch) => {
        axios.get('http://localhost:3015/notes',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const notes = response.data
            console.log(notes)
            dispatch(setNotes(notes))
        })
        .catch(err => {
            console.log(err)
        })
    }
}
 

export const addNote =(note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const startAddNotes = (formData) => {
    console.log('formData inside action',formData)
    return ( dispatch => {
        axios.post('http://localhost:3015/notes',formData,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                const note = response.data
                dispatch(addNote(note))
                console.log('new note added')
            }
        })
    })
}


export const editNote = (note) => {
    return {
        type : 'EDIT_NOTE',
        payload : note
    }
}

export const startEditNote = (obj) => {
    return (dispatch => {
        console.log(obj)
        axios.put(`http://localhost:3015/notes/${obj.id}`,obj.formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response.data)
            const note = response.data
            dispatch(editNote(note))
        })
    })
}

export const deleteNote = (note) => {
    return {
        type : "DELETE_NOTE",
        payload : note
    }
}

export const startDeleteNote = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3015/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken'),
            }
        })
        .then(response => {
            const note = response.data
            dispatch(deleteNote(note))
        })
    }
}
