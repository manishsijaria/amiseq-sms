import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { FullCandidates } from './fullCandidates'
import { Candidate } from './candidate'
import { Sms } from '../sms'
import { ViewNSendSms }  from '../viewNSendSms/viewNSendSms'

export default class Candidates extends React.Component {
    render() {
        return(
          <div className="container">
                <div className="row" >  {/* Create a row to center the controls in this div*/}
                    <div className="col-md-1"/> {/* Create a blank div with 4 col for padding*/}
                    <div className="col-md-10">  {/* Center the contents div with 4 col */} 
                        <h4>Candidates </h4>
                        <Switch> 
                            <Route exact path='/candidates' component={FullCandidates}/>                { /* Full Candidates Screen */ }
                            <Route path='/candidates/addcandidate' component={Candidate} />             { /* Add Candidate Screen */   }
                            <Route path='/candidates/editcandidate/:number' component={Candidate} />    { /* Edit Candidate Screen */  }
                            <Route path='/candidates/smsall/:param?' component={Sms} />                  { /* Sms All Candidates */      }
                            <Route path='/candidates/smschecked' component={Sms} />
                            <Route path='/candidates/viewnsend/:number/:candidatename' component={ViewNSendSms}/>
                        </Switch>                   
                    </div>
                    <div className="col-md-1"/> {/* Create a blank div with 4 col for padding*/}
                </div>
            </div> 
        )       
    }
}