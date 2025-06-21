import React, { Suspense } from 'react';

// Lazy load NewsletterSubscription component
const NewsletterSubscription = React.lazy(() => import('./NewsletterSubscription'));

// Loading placeholder for NewsletterSubscription
const NewsletterSkeleton = () => (
  <div className="max-w-md mx-auto text-center animate-pulse">
    <div className="h-6 bg-coffee-600 rounded w-3/4 mx-auto mb-4"></div>
    <div className="flex space-x-2">
      <div className="flex-1 h-12 bg-coffee-700 rounded-lg"></div>
      <div className="h-12 w-24 bg-coffee-600 rounded-lg"></div>
    </div>
    <div className="h-3 bg-coffee-600 rounded w-2/3 mx-auto mt-3"></div>
  </div>
);

const LazyNewsletterSubscription: React.FC = () => {
  return (
    <Suspense fallback={<NewsletterSkeleton />}>
      <NewsletterSubscription />
    </Suspense>
  );
};

export default LazyNewsletterSubscription;