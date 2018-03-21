

import React from 'react'
import { connect } from 'react-redux'

class AppPage extends React.Component {
    render() {
        return(
                <div className="jumbotron text-center">
                    {this.props.loggedIn ? <h1>Welcome {this.props.user.username} to SMS application</h1>
                                          : <h1>Please login to SMS application</h1> }                     
                    <div className="container">
                        <p className="lead">Select the menu on top right and get started.</p> 
                    </div>   
                </div> 
        )
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state.authentication
    return { user, loggedIn }
}

const connectedAppPage = connect(mapStateToProps)(AppPage)

export {connectedAppPage as AppPage}