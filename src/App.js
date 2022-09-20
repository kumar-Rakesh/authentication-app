import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
// import Login from './components/Login'
// import Profile from './components/Profile'
import Registration from './components/Registration';

class App extends Component {
    render() {
        return (
            <div className="App">
                {/* <Navbar />
                <Landing /> */}
                <div className="container">
                    <Registration />
                </div>
            </div>
        )
    }
}

export default App
