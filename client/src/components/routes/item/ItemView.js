import React from 'react';

import axios from 'axios';

import Item from './Item';

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: false,
      error: null
    };
  }
  async getItem(id) {
    this.setState(state => ({ ...state, loading: true }));
    try {
      return { result: await axios.get(`/api/item?_id=${id}`) };
    } catch (error) {
      return { error };
    }
  }
  async componentDidMount() {
    const { match } = this.props;
    const { result, error } = await this.getItem(match.params.id);
    if (result) {
      this.setState(state => ({
        ...state,
        item: result.data.item,
        error: null,
        loading: false
      }));
    } else {
      console.log(error);
      this.setState(state => ({
        ...state,
        item: null,
        error: {status: error.response.status, statusText: error.response.statusText},
        loading: false
      }));
    }
  }
  render() {
    const { loading, item, error } = this.state;
    return loading ? (
      <div>Loading...</div>
    ) : item ? (
      <Item {...item}/>
    ) : error? (<div>{JSON.stringify(error)}</div>):
      <div>no item</div>
    ;
  }
}

export default ItemView;
