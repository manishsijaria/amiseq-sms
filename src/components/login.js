
import React from 'react'
import '../App.css'
import { Form, Label, FormGroup, Input, Button } from 'reactstrap'
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../_actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }
    
    componentWillMount() {
        const URL = this.props.match.url
        const { dispatch, loggedIn, user } = this.props
        if(URL.indexOf('/logout') !== -1) {
            dispatch(userActions.logout())
        } else { //login page, when pressing back button goes to login page, set the username of loggedin user.
            if(loggedIn) {
                this.setState({username: user.username})
            }
        }
    }

    handelChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true})
        //TODO: goto / path, having projects on the left.
        //alert(this.state.username + ' ' + this.state.password)
        const { username, password } = this.state
        const { dispatch } = this.props
        if(username && password) {
            dispatch(userActions.login(username,password))
        }
    }

    render() {
        const { username, password } = this.state
        return(
            <div className="container">
                <div className="row" >  {/* Create a row to center the controls in this div*/}
                    <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                    <div className="col-md-4">  {/* Center the contents div with 4 col */} 
                        <h2>Login</h2>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" value={username} onChange={this.handelChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={password} onChange={this.handelChange}/>
                            </FormGroup> 
                            <Button color="primary">Login</Button>
                            {/*<Link to="/register"> Register </Link>*/ }
                        </Form>
                    </div>
                    <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, user } = state.authentication
    return { loggingIn,loggedIn, user }
}

const connectedLogin = connect(mapStateToProps)(Login)

export {connectedLogin as Login}