//this file is the reducers for city state management
//the state will remember up to 3 cities for comparison, initializing at either empty or ask for a location and use nearest city (to be implemented)

export const initialState = {
  cities: ['san diego', 'san francisco', 'norfolk', 'madison'],
  cityinfo: [],
  isFetching: false,
};

const cityReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'FETCH_START': //when comparison data is requested, the state will now pull from the BE info for each city and save it
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_SUCCESS': //info from BE grabbed, saved in state
      //axios call goes here
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
    case 'SAVE_CITY': //add cities to the array of cities to be compared
      let newList = state.cities;
      newList.append(action.payload.city);

      return {
        ...state,
        cities: newList,
      };
    case 'REMOVE_CITY':
      let firstHalf = state.cities;
      let secondHalf = state.cities;
      firstHalf.slice(0, action.payload.saveID - 1); //takes in a cityID which is the array index of the city. slices it out
      secondHalf.slice(action.payload.saveID); //slicing starts at deleted city
      newList = firstHalf.concat(secondHalf); //combines each half of the list using concatenating

      return {
        ...state,
        cities: newList,
      };
  }
};

export default cityReducer;
