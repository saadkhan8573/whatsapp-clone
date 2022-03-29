import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import Sidebar from './components/sidebar/Sidebar';
import { useStateValue } from './components/stateprovider/StateProvider';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      <div className="app">
        {
          !user ? <Login />
            :
            <div className="app_body">
              <Sidebar />
              <Switch>
                <Route exact path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route exact path="/">
                  <Chat />
                </Route>
              </Switch>

            </div>
        }
      </div>
    </>
  )
}

export default App;