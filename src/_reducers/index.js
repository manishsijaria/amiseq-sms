import { combineReducers } from 'redux'

import { alert } from './alert.reducer'
import { clientsGet,selectedClients , clientsMsgs, clientMsgsCount } from './client.reducer'
import { candidatesGet, selectedCandidates,candidatesMsgs,candidateMsgsCount} from './candidate.reducer'
import { authentication } from './authentication.reducer'
//react-router-redux@next
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    alert,
    clientsGet,
    selectedClients,
    candidatesGet,
    selectedCandidates,
    clientsMsgs,
    clientMsgsCount,
    candidatesMsgs,
    candidateMsgsCount,
    authentication,
    router: routerReducer //react-router-redux@next
})

export default rootReducer