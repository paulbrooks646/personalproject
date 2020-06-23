
const initialState = {
    attractions: []
}

const GET_ATTRACTIONS = 'GET_ATTRACTIONS'

export function getAttractions(data) {
    return {
        type: GET_ATTRACTIONS,
        payload: data
    }
}


export default function(state = initialState, action) {
    switch(action.type) {
            case GET_ATTRACTIONS:
                return {...state, attractions: action.payload}

            default: 
                return state
    }
}