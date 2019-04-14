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
        this.state = {query: null, results: null, loading: false, error: null}
    }
    async getSearchResults({name, minPrice, maxPrice}){
        this.setState(state=>({...state, loading: true}));
        try{
            return {result:await axios.get('/api/search', {params:{name, minPrice, maxPrice}})};
        }catch(error){
            return {error};
        }
    }
    async componentDidMount(){
        const query = querySearch(this.props.location.search);
        if(query && query !== this.props.query){
            this.props.updateSearchObject(query);
            const {result, error} = await this.getSearchResults(query);
            if(result){
                this.setState(state=>({
                    ...state,
                    results: result.data.results,
                    loading: false,
                    error: null
                }));
            }else{
                console.log(JSON.parse(JSON.stringify(error.response.status)));
                this.setState(state=>({
                    ...state,
                    results: null,
                    loading: false,
                    error: {status: error.response.status, statusText: error.response.statusText}
                }))
            }
        }
    }
    render(){
        const {results, loading, error} = this.state;
        return results ?
        this.state.results.map((item, i)=>(<SearchItem 
            key={i} name={item.name} description={item.description} price={item.price} amount={item.amount}
            />))
        :loading?<div>Loading..</div>:error?<div>{JSON.stringify(error)}</div>:<div>type something</div>
    }
}
const mapStateToProps = state=> ({
    query: getCurrentSearchQueryObject(state)
})
const mapDispatchToProps = ()=>({
    updateSearchObject: updateSearchOptions
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));