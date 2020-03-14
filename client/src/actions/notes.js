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

export const startAddNotes = (note) => {
    return ( dispatch => {
        axios.post('http://localhost:3015/notes',note,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.errors)
            } else {
                const note = response.data
                dispatch(addNote(note))
            }
        })
    })
}
