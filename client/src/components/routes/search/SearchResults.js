import React from 'react';

import SearchItem from './SearchItem'

import axios from 'axios';
import querySearch from 'stringquery';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { getCurrentSearchQueryObject } from '../../../redux/selectors';

import {updateSearchOptions }from '../../../redux/actions/search'

class SearchResults extends React.Component{
    constructor(props){
        super(props);
        this.state = {query: null, results: null}
    }
    async getSearchResults({name, minPrice, maxPrice}){
        const {data} = await axios.get('/api/search', {params:{name, minPrice, maxPrice}});
        this.setState(state=>({
            ...state,
            results: data.results
        }));
    }
    componentDidMount(){
        const query = querySearch(this.props.location.search);
        if(query && query !== this.state.query){
            this.setState(state=>({...state, query}));
            this.getSearchResults(query);
        }
    }
    render(){
        const {results} = this.state;
        return results ?
        this.state.results.map((item, i)=>(<SearchItem 
            key={i} name={item.name} description={item.description} price={item.price} amount={item.amount}
            />))
        :<div>No results</div>
    }
}
const mapStateToProps = state=> ({
    query: getCurrentSearchQueryObject(state)
})
const mapDispatchToProps = ()=>({
    updateSearchObject: updateSearchOptions
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));