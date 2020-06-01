import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Home from './Home'
import NotesList from './components/notes/List'
import CategoriesList from './components/categories/CategoriesList'
import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import EditNote from './components/notes/Edit'
import NewNote from './components/notes/New'
import AddCategory from './components/categories/AddCategory'


function App(props) {
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    window.location.reload()
  }
  return (
    <BrowserRouter>
      {
        localStorage.getItem('authToken') ? (
          <div>
            <Link to ='/'> Home </Link>
            <Link to ='/notes'> Notes </Link>
            <Link to ='/categories' > Categories </Link>
            <Link to ='/logout' onClick={handleLogout}> Logout</Link>
          </div>
        ) : (
          <div>
            <Link to ='/'> Home |</Link>
            <Link to ='/users/register'>  Register  |</Link>
            <Link to='/users/login'>  Login</Link>
          </div>
        )
      }
      
      <Switch>
        
        <Route exact path = '/' component ={Home} />
        <Route path='/users/register' component={Register} />
        <Route path='/users/login' component ={Login} />
        <Route exact path ='/notes' component ={NotesList}/>
        <Route exact path='/notes/new' component={NewNote} />
        <Route path='/notes/edit/:id' component={EditNote} />

        <Route exact path ='/categories' component ={CategoriesList} />
        <Route path ='/categories/new' component={AddCategory} />
        
      </Switch>
   </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
