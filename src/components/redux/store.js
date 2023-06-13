import { createStore } from 'redux';
import rootReducer from './reducers'; // You need to define your reducers

const store = createStore(rootReducer);

export default store;