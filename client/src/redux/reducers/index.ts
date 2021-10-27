import { combineReducers } from 'redux';
import { places } from './places';

const rootReducer = combineReducers({ places });
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;