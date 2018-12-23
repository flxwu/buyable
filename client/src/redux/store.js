import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import apiSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(apiSaga);

export default createStore(reducer, applyMiddleware(sagaMiddleware));
