export const addMovie = (movie) => {
  return {
    type: 'SAVE',
    payLoad: movie,
  };
};

export const updateList = (data) => {
  return {
    type: 'UPDATE',
    payLoad: data,
  };
};
