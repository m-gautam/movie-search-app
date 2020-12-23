const initialState = [];

const movieReducer = (state = initialState, action) => {
  if (action.type === 'SAVE') {
    state.push(action.payLoad);
    return state;
  } else if (action.type === 'UPDATE') {
    state.push(action.payLoad);
    return state;
  } else {
    return state;
  }
};

export default movieReducer;
