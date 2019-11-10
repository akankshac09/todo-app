import { GET_ALL_BUCKETS, CREATE_NEW_BUCKET } from './buckets.types';

const INITIAL_STATE = {
  bucketList: [],
  activeBucket: '',
}

const bucketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_BUCKETS:
      return{
        ...state,
        bucketList: action.payload
      }
    case CREATE_NEW_BUCKET:
      return{
        ...state,
        bucketList: [
          action.payload,
          ...state.bucketList,
        ]
      }
    default:
      return state;
  }
}

export default bucketReducer;