import React, { lazy, Suspense } from 'react';

const LazyAlbums = lazy(() => import('./Albums'));

const Albums = props => (
  <Suspense fallback={null}>
    <LazyAlbums {...props} />
  </Suspense>
);

export default Albums;
