import { Reducer } from "redux";
import IAction from "../types";
import { ACTIONS } from '../constants/places';
import AppState from "./AppState";


const INITIAL_STATE: AppState = {
	places: [],
	count: 0,
	isLoading: false,
	isLoaded: false,
	isError: false,
};


export const places: Reducer<AppState> = (
	state: AppState = INITIAL_STATE,
	action: IAction
  ): AppState => {

	switch (action.type) {
		case ACTIONS.FETCH_PLACES: {
			return {...INITIAL_STATE, 
						isLoading: true,
					}
				}
		case ACTIONS.FETCH_PLACES_SUCCESS: {
			const { results } = action.payload;
			return {
					places: results,
					count: results.length,
					isLoading: false,
					isLoaded: true, 
				}
			}
		case ACTIONS.FETCH_PLACES_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
					isError: true,
				}
			}
		case ACTIONS.RESET_STATE: {
			return INITIAL_STATE;
		}	
		default:
			return state;
	}
}
