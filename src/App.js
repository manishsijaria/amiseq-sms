import React, { Component } from 'react';

import { Header } from './components/header'
import Main from './components/main'

import { connect } from 'react-redux'
import { history } from './_helpers'
import { alertActions } from './_actions'


//https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
//react-router-redux@next
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props
    history.listen((location, action) => {
        dispatch(alertActions.clear())
    })
  }
  render() {
    const { alert } = this.props
    return (
      <div>
        <ConnectedRouter history={history}>
          <div>
            <Header/>
            <div className="container">
                  <div className="row" >  {/* Create a row to center the controls in this div*/}
                      <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                      <div className="col-md-4">  {/* Center the contents div with 4 col */} 
                          {alert.message &&
                              <div className={`alert ${alert.type}`}>{alert.message}</div>
                          }
                      </div>
                      <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                  </div>
            </div>
            <Main/>
          </div>
        </ConnectedRouter>       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state
  return { alert }
}
const connectedApp = connect(mapStateToProps)(App)

export {connectedApp as App}