import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FullBoth from './fullBoth'
import { Sms } from '../sms'

export default class Both extends React.Component {
    render() {
        return(
          <div className="container">
                <div className="row" >  {/* Create a row to center the controls in this div*/}
                    <div className="col-md-2"/> {/* Create a blank div with 4 col for padding*/}
                    <div className="col-md-6">  {/* Center the contents div with 4 col */} 
                        <h4>Both </h4>
                        <Switch> 
                            <Route exact path='/both' component={FullBoth}/>          { /* Full Both Screen */ }
                            <Route path='/both/smsall' component={Sms} />             { /* SMS Both All   */   }
                        </Switch>                    
                    </div>
                    <div className="col-md-2"/> {/* Create a blank div with 4 col for padding*/}
                </div>
            </div>  
        )      
    }
}