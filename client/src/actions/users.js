import axios from 'axios'
import {setCategories} from './category'
import {setNotes} from './notes'

export const setUser=(user)=> {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const startRegister = (formData,redirect) => {
    console.log('inside startRegister')
    return(
        dispatch => {
               axios.post('http://localhost:3015/users/register',formData)
            .then(response => {
                console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    redirect()
                    console.log('successfully logged in')
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    )
}

export const startGetUser =(formData, redirect) => {
    return(dispatch => {
        axios.post('http://localhost:3015/users/login',formData)
            .then(response => {
                console.log('user logging in',response)
                if(response.data.hasOwnProperty('error')) {
                    alert(response.data.error)
                } else {
                    const user = response.data.user
                    const token = response.data.token
                    localStorage.setItem('authToken',token)
                    dispatch(setUser(user))
                    const req1 = axios.get('http://localhost:3015/notes',{ headers: {'x-auth': token }})
                    const req2 = axios.get('http://localhost:3015/categories',{ headers: { 'x-auth' : token } })
                    return Promise.all([req1,req2])
                            .then(responses => {
                                const [notes,categories] = responses
                                console.log('notes',notes)
                                console.log('notes-data',notes.data)
                                dispatch(setNotes(notes.data))
                                dispatch(setCategories(categories.data))
                                
                                redirect()
                            })
                            .catch(err => {
                                console.log(err)
                            }) 

                        
                }
        })
    })     
}