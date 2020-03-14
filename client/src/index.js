import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/Configstore'
import 'bootstrap/dist/css/bootstrap.css'
import { startSetCategories } from './actions/category'
import { startSetNotes } from './actions/notes'


const store = configureStore()


store.subscribe(() => {
    console.log('store Subscribe',store.getState())
})

if(localStorage.getItem('authToken')) {
    store.dispatch(startSetCategories())
    store.dispatch(startSetNotes())
}
const ele = (
    <Provider store = {store}>
        <App />
    </Provider>
)




ReactDOM.render(ele, document.getElementById('root'))