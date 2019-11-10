import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import { connect } from 'react-redux';

import BucketList from '../../components/bucket-list/bucket-list.component';
import { fetchAllBuckets, createNewBucket } from '../../redux/buckets/buckets.action';

import './homepage.styles.scss';

const Homepage = (props) => {
  const { onFetchAllBuckets, bucketList, onCreateNewBucket } = props;
  const [bucketName, setBucketName] = useState('')

  useEffect(() => {
    onFetchAllBuckets()
  }, [onFetchAllBuckets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!bucketName){
      return;
    }
    onCreateNewBucket(bucketName);
    setBucketName('');
    message.success('Saved!', 0.15)
  }

  return (
    <div className='container'>
      <Form className='bucket-input-container' onSubmit={(e) => handleSubmit(e)}>
        <Input
          placeholder='Bucket Title'
          onChange={(e) => setBucketName(e.target.value)}
          value={bucketName}
          autoFocus
        />
        <Button
          className='add-bucket'
          type='primary'
          htmlType='submit'
        >
          Add
        </Button>
      </Form>
      <BucketList data={bucketList} />
    </div>
  )
}

const mapDispatchToProps = {
  onFetchAllBuckets: fetchAllBuckets,
  onCreateNewBucket: createNewBucket
}

const mapStateToProps = ({ buckets }) => {
  const { bucketList } = buckets;
  return {
    bucketList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);