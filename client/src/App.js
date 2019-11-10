import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import NotFound from './components/not-found/not-found.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const TodoPage = lazy(()=>import('./pages/todopage/todopage.component'));

axios.defaults.baseURL = 'http://localhost:5000/api';

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/todos/:bucketId' component={TodoPage}/>
        <Route path='*' component={NotFound} />
      </Switch>
    </Suspense>
  </ErrorBoundary>
);


export default App;