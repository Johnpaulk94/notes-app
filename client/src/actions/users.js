import axios from 'axios'
import {setCategories} from './category'
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
                console.log(response)
                if(response.data.hasOwnProperty('error')) {
                    alert(response.data.error)
                } else {
                    const user = response.data.user
                    const authToken = response.data.token
                    localStorage.setItem('authToken',authToken)
                    dispatch(setUser(user))
                    redirect()
                }
            })
    })
}