
import React from 'react'
//import '../App.css'
import { Form, Label, FormGroup, Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { userActions } from '../_actions'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: { firstname: '', lastname: '', email: '', username: '', password: ''},
            submitted: false
        }
    }

    handelChange = (event) => {
        const { user } = this.state
        const { name, value } = event.target
        this.setState({
            user: { ...user,  [name]: value }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true})
        const { user } = this.state
        const { dispatch } = this.props
        if(user.firstname &&
           user.lastname &&
           user.email &&
           user.username &&
           user.password) {
               dispatch(userActions.register(user))
           }
    }

    render() {
        const { user, submitted } = this.state
        return(
            <div className="container">
                <div className="row" >  {/* Create a row to center the controls in this div*/}
                    <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                    <div className="col-md-4">  {/* Center the contents div with 4 col */} 
                        <h2>Register</h2>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstname">Firstname</Label>
                                <Input type="text"  name="firstname" placeholder="Enter your first name" value={user.firstname} onChange={this.handelChange}/>
                                { submitted && !user.firstname && <div className="text-danger">first name is required</div>}
                            </FormGroup> 
                            <FormGroup>
                                <Label for="lastname">Lastname</Label>
                                <Input type="text"  name="lastname" placeholder="Enter your last name" value={user.lastname} onChange={this.handelChange}/>
                                { submitted && !user.lastname && <div className="text-danger">last name is required</div>}
                            </FormGroup>                                          
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email"  name="email" placeholder="someone@gmail.com" value={user.email} onChange={this.handelChange}/>
                                { submitted && !user.email && <div className="text-danger">email is required</div>}
                            </FormGroup>                                         
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text"  name="username" placeholder="Enter your login username" value={user.username} onChange={this.handelChange}/>
                                { submitted && !user.username && <div className="text-danger">username is required</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"  name="password" value={user.password} onChange={this.handelChange}/>
                                { submitted && !user.password && <div className="text-danger">password is required</div>}
                            </FormGroup> 
                            <Button color="primary">Register</Button>
                        </Form>
                    </div>
                    <div className="col-md-4"/> {/* Create a blank div with 4 col for padding*/}
                </div>
            </div>            
        )
    }
}

const ConnectedRegister = connect()(Register)

export { ConnectedRegister as Register}