import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/Configstore'

import 'bootstrap/dist/css/bootstrap.css'


const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})

const ele = (
    <Provider store = {store}>
        <App />
    </Provider>
)




ReactDOM.render(ele, document.getElementById('root'))