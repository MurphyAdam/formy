import { ACTIONS } from '../constants/places';
import { fetchPlacesService } from '../../services/places-api';
import { ActionCreatorFactory } from '../methods';


const fetchPlacesAction = () => ActionCreatorFactory(ACTIONS.FETCH_PLACES);
const fetchPlacesSuccessAction = data => ActionCreatorFactory(ACTIONS.FETCH_PLACES_SUCCESS, data);
const fetchPlacesErrorAction = error => ActionCreatorFactory(ACTIONS.FETCH_PLACES_FAILURE, error);

export function getPlaces(params) {
	return (dispatch) => {
		dispatch(fetchPlacesAction());
		fetchPlacesService(params)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchPlacesErrorAction(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(fetchPlacesSuccessAction(response.data))
		})
		.catch((error) => {
			dispatch(fetchPlacesErrorAction(error));
		})
	};
}
