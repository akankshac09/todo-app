import { combineReducers } from 'redux';

import todosReducer from './todos/todos.reducer';
import bucketsReducer from './buckets/buckets.reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  buckets: bucketsReducer
});

export default rootReducer;
