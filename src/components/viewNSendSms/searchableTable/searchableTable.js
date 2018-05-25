
import React from 'react'
import SearchBar from './searchBar'
import  MsgsTable from './msgsTable'

export default class SearchableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchText: ''}
    }
    handelSearchTextChange = (searchText) => {
        this.setState({
            searchText: searchText
        })
    }
    handelFetchChange = (fetchText) => {
        this.props.onFetchChange(fetchText)
        //alert('searchableTable=' + fetchText)
    }
    render() {
        const { msgs, fetchText,name } = this.props
        const { searchText } = this.state
        return(
            <div>
                <SearchBar searchText={searchText} 
                           onSearchTextChange={this.handelSearchTextChange}
                           fetchText={fetchText}
                           onFetchChange={this.handelFetchChange}
                           />
                <MsgsTable msgs={msgs} searchText={searchText} name={name}/>
            </div>
        )
    }
}