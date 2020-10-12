//this file is the reducers for city state management
//the state will remember up to 3 cities for comparison, initializing at either empty or ask for a location and use nearest city (to be implemented)

export const initialState = {
  cities: {
    city1: {},
    city2: {},
    city3: {},
  },
  cityinfo: {
    city1: {},
    city2: {},
    city3: {},
  },
  isFetching: false,
  markers: [],
};

export const savedCityReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    default:
      return state;
    case 'SAVE_MARKER':
      return {
        ...state,
        markers: [
          ...state.markers,
          {
            lat: action.payload.lat,
            lng: action.payload.lng,
            cityName: action.payload.cityName,
          },
        ],
      };
    case 'FETCH_START': //when comparison data is requested, the state will now pull from the BE info for each city and save it
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_SUCCESS': //info from BE grabbed, saved in state
      return {
        ...state,
        isFetching: false,
        cityinfo: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetching: false,
      };
    case 'SAVE_CITY': //takes an input of city 1-3 and saves the city to the save spot
      return {
        ...state,
        cities: {
          ...state.cities, //the input requires city 1-3 to be designated, then the name of the city as the value
          // [action.payload.city]: action.payload.value,
        },
        //now to get the city info
      };
  }
};
