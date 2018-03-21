
import React from 'react'
import { Button} from 'reactstrap'

import { clientActions } from '../../../_actions'
import { connect } from 'react-redux'

class ActionBar extends React.Component {
    handelClick = (event) => {
        const { dispatch,clientArray } = this.props
        dispatch(clientActions.deleteClients(clientArray))
    }
    render() {
        const { clientArray } = this.props
        return(
            <div>
                <Button outline color="primary" onClick={this.handelClick} disabled={clientArray.length ? false : true}>Delete</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { clientArray } = state.selectedClients
    return {  clientArray }
}

const connectedActionBar = connect(mapStateToProps)(ActionBar)

export { connectedActionBar as ActionBar}