export const ActionCreatorFactory = (type, payload=null) => {
	return {
		type: type,
		payload: payload
	}
}
