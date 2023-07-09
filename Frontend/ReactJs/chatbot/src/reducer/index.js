const initialState = {
    name: '',
    age: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STUDENT_NAME':
        return {
          ...state,
          name: action.payload,
        };
      case 'SET_STUDENT_AGE':
        return {
          ...state,
          age: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  