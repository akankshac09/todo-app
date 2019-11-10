import React from 'react';

import '../error-boundary/error-boundary.styles.scss';

const NotFound = () => (
  <div className='error-image-overlay'>
    <div className='error-image-container' />
    <div className='error-image-text'>A Dog Ate this Page</div>
  </div>
);

export default NotFound;