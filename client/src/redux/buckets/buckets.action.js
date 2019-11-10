import axios from 'axios';

import { GET_ALL_BUCKETS, CREATE_NEW_BUCKET } from './buckets.types';

const fetchAllBuckets = () => (dispatch) => {
  axios({
    url: 'http://localhost:5000/api/buckets',
    method: 'get',
  }).then((res) => {
    dispatch({
      type: GET_ALL_BUCKETS,
      payload: res.data
    })
  })

}

const createNewBucket = (bucketName) => (dispatch) => {
  axios({
    url: 'buckets',
    method: 'post',
    data: {
      name: bucketName
    }
  }).then((res) => {
    dispatch({
      type: CREATE_NEW_BUCKET,
      payload: res.data
    })
  })
}

export {
  fetchAllBuckets,
  createNewBucket
}