import React from 'react'
import { Button } from 'reactstrap'
import  { Link } from 'react-router-dom' 
export default class FullBoth extends React.Component {

    render() {
        return(
            <div>

                {/* TODO: Back button removes the param, how to retain it*/}
                <Link to={`/both/smsall`}>
                    <Button outline color="primary">SMS All Clients and Candidates</Button>{' '}
                </Link>
            </div>
        )
    }
}