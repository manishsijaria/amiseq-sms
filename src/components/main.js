import React from 'react'
import { Route, Switch} from 'react-router-dom'

import { Login } from './login'
import { Register }  from './register'
import { Clients } from './clients/clients'
import Candidates from './candidates/candidates'
import Both from './both/both'
import { AppPage } from './appPage'
//const AppPage = () => <h1> App Page </h1>
//const Login = () => <h1>Login Page !</h1>
//const Register = () => <h1> Register Page </h1>
//const About = () => <h1>About Us</h1>
//const Contact = () => <h1>Contact Page !</h1>

export default class Main extends React.Component {
    render() {
        return(
            <div>  
                <Switch>
                    <Route path="/" exact component={AppPage} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/candidates" component={Candidates} />
                    <Route path="/both" component={Both}/>
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Login} />
                    <Route path="/register@1234" component={Register} />
                </Switch>
            </div>
        )
    }
}