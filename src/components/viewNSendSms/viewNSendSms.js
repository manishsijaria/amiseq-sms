import React  from 'react'

import { Sms } from '../sms'
import { clientActions, candidateActions } from '../../_actions'
import { connect } from 'react-redux'
import SearchableTable from './searchableTable/searchableTable'

class ViewNSendSms extends React.Component {
    constructor(props) {
        super(props)
        this.state =  { name:'', msgs: [], fetchText: '7_DAYS'}
    }

    handelFetchChange = (fetchText) => {
        this.setState({ fetchText: fetchText})
        //alert('fetchText=' + fetchText)
        //this.setStateOnTimer()
    }

    componentWillMount() {
        this.setStateOnTimer()
        //The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
        //The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
        this.timerID = setInterval(() => this.setStateOnTimer(), 20000)
        //this.setStateOnTimer()
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
        //alert('componentWillUnmount')
    }

    setStateOnTimer = () => {
        const URL = this.props.match.url
        const { dispatch } = this.props
        let number = parseInt(this.props.match.params.number,10)
        
        if(URL.indexOf('/clients/viewnsend') !== -1) {
            this.setState({ name: this.props.match.params.clientname })
            //alert('setStateOnTimer=' + this.state.fetchText)    
            dispatch(clientActions.getClientMsgsCount(number, this.state.fetchText))
            setTimeout(() =>{
                if(this.state.msgs.length !== this.props.clientMsgsCount) {
                    dispatch(clientActions.getClientMsgs(number,this.state.fetchText))
                    setTimeout(()=>{
                        const { clientsMsgArray } = this.props
                        let msgs = clientsMsgArray[number]
                        this.setState({ msgs: msgs})
                    },1000)        
                }
            },1000)
        } else { // '/candidates/viewnsend'
            this.setState({ name: this.props.match.params.candidatename })
            
            dispatch(candidateActions.getCandidateMsgsCount(number, this.state.fetchText))
            setTimeout(() => {
                if(this.state.msgs.length !== this.props.candidateMsgsCount) {
                    dispatch(candidateActions.getCandidateMsgs(number,this.state.fetchText))
                    setTimeout(()=>{
                        const { candidatesMsgArray } = this.props
                        let msgs = candidatesMsgArray[number]
                        this.setState({ msgs: msgs})
                    },1000)
                }
            },1000)
        }        
    }

    /*
        componentWillReceiveProps is only called when the props have changed and when this 
        is not an initial rendering. componentWillReceiveProps enables to update the state 
        depending on the existing and upcoming props, without triggering another rendering.
    */
    componentWillReceiveProps() {
        //in sms.js It takes time to dispatch getClientMsg, get CandidateMsg for refreshing list,
        //after clicking Submit button in sms.js.

        //setTimeout(()=> {this.setStateOnTimer()},1000)
    }

    render() {
        return(
            <div  >
                <h6>{this.state.name}</h6>
                <SearchableTable msgs={this.state.msgs}
                                 fetchText={this.state.fetchText}
                                 onFetchChange={this.handelFetchChange}
                                 name={this.state.name}
                />
                <Sms match={this.props.match}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { clientsMsgArray } = state.clientsMsgs
    const { candidatesMsgArray } = state.candidatesMsgs
    const clientMsgsCount  = state.clientMsgsCount
    const candidateMsgsCount = state.candidateMsgsCount
    return { clientsMsgArray, clientMsgsCount, candidatesMsgArray,candidateMsgsCount }
}

const connectedViewNSendSms = connect(mapStateToProps)(ViewNSendSms)

export { connectedViewNSendSms as ViewNSendSms}