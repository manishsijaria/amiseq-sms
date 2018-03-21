
import React from 'react'
import SearchBar from './searchBar'
import  ClientTable from './clientTable'
import { ActionBar } from './actionBar'
export default class FilterableClientTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { filterText: ''}
    }
    handelFilterTextChange = (filterText) => {
        this.setState({
            filterText: filterText
        })
    }
    render() {
        const { clients } = this.props
        const { filterText } = this.state
        return(
            <div>
                <SearchBar filterText={filterText} onFilterTextChange={this.handelFilterTextChange}/>
                <ActionBar/>
                <ClientTable clients={clients} filterText={filterText}/>
            </div>
        )
    }
}