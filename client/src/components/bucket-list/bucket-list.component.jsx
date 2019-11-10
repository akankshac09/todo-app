import React from 'react';
import { List } from 'antd';
import { withRouter } from 'react-router-dom';

import './bucket-list.styles.scss';

const BucketList = ({ history, data }) => {
  return (
    <div className='bucket-list-container'>
      <h3 className='title'> Existing Buckets</h3>
      <List
        dataSource={data}
        renderItem={({name, id}) => (
          <List.Item className="list-item" onClick={()=>history.push(`/todos/${id}`)}>
            {name}
          </List.Item>
        )}
      />
    </div>
  )
}

export default withRouter(BucketList);