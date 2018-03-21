import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { history } from '../_helpers'

import thunk from 'redux-thunk'
import rootReducer from '../_reducers'

//react-router-redux@next
const redux_router_middleware = routerMiddleware(history);

export const store = createStore(rootReducer, 
                                applyMiddleware(thunk, redux_router_middleware))