import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { FullClients } from './fullClients'
import { Client } from './client'
import { Sms } from '../sms'
import { ViewNSendSms }  from '../viewNSendSms/viewNSendSms'

class Clients extends React.Component {
    render() {
        return(
          <div className="container">
                <div className="row" >  {/* Create a row to center the controls in this div*/}
                    <div className="col-md-1"/> {/* Create a blank div with 4 col for padding*/}
                    <div className="col-md-10">  {/* Center the contents div with 4 col */} 
                        <h4>Clients</h4>
                        <Switch> 
                            <Route exact path='/clients' component={FullClients}/>              { /* Full Clients Screen */ }
                            <Route path='/clients/addclient' component={Client} />              { /* Add Client Screen */   }
                            <Route path='/clients/editclient/:number' component={Client} />     { /* Edit Client Screen */  }
                            <Route path='/clients/smsall/:param' component={Sms} />             { /* Sms All Client */      }
                            <Route path='/clients/smschecked/:param' component={Sms} />
                            <Route path='/clients/viewnsend/:number/:clientname' component={ViewNSendSms}/>
                        </Switch>
                    </div>
                    <div className="col-md-1"/> {/* Create a blank div with 4 col for padding*/}
                </div>
            </div>
        )        
    }
}



const connectedClients = connect()(Clients)

export { connectedClients as Clients }