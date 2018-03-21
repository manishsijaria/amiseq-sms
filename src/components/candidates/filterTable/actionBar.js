
import React from 'react'
import { Button} from 'reactstrap'

import { candidateActions } from '../../../_actions'
import { connect } from 'react-redux'

class ActionBar extends React.Component {
    handelClick = (event) => {
        const { dispatch,candidateArray } = this.props
        dispatch(candidateActions.deleteCandidates(candidateArray))
    }
    handelCheckboxChange = (event) => {

    }

    //<Input type="checkbox" value={false} onChange={this.handelCheckboxChange} checked={this.state.checked}/> {' '}
    render() {
        const { candidateArray } = this.props
        return(
        <div>
            <Button outline color="primary" onClick={this.handelClick} disabled={candidateArray.length ? false : true}>Delete</Button>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { candidateArray } = state.selectedCandidates
    return {  candidateArray }
}

const connectedActionBar = connect(mapStateToProps)(ActionBar)

export { connectedActionBar as ActionBar}