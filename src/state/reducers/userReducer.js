//reducer for User Info
export const initialState = {
  userName: '',
  avatar: '',
  comparison: [],
  profileIsOpen: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'OPEN_DRAWER':
      return {
        ...state,
        profileIsOpen: true,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        profileIsOpen: false,
      };
    case 'ADD_CITY':
      return {
        ...state,
        comparison: [...state.comparison, action.payload],
      };
  }
};
