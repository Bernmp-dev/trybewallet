import { SAVE_EMAIL } from '../actions/saveEmail';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state.user.email,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
