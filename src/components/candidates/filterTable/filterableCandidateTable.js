
import React from 'react'
import SearchBar from './searchBar'
import  CandidateTable from './candidateTable'
import { ActionBar } from './actionBar'
export default class FilterableCandidateTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { filterText: '', option: 'All'}
    }
    handelFilterTextChange = (filterText) => {
        this.setState({
            filterText: filterText
        })
    }

    handelSelectRadio = (value) => {
        this.setState({
            option: value
        })
    }
    render() {
        const { candidates, candidates_msg } = this.props
        const { filterText, option } = this.state
        return(
            <div>
                <SearchBar filterText={filterText} 
                            onFilterTextChange={this.handelFilterTextChange} 
                            onSelectRadio={this.handelSelectRadio}
                            option={option}/>
                <ActionBar/>
                <CandidateTable candidates={candidates} 
                                candidates_msg={candidates_msg}
                                filterText={filterText}
                                option={option}/>
            </div>
        )
    }
}