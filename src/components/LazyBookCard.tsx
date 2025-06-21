import React, { Suspense } from 'react';

// Lazy load BookCard component
const BookCard = React.lazy(() => import('./BookCard'));

// Loading placeholder for BookCard
const BookCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-coffee-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-coffee-200 rounded w-3/4"></div>
      <div className="h-4 bg-coffee-200 rounded w-1/2"></div>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-coffee-200 rounded"></div>
        ))}
      </div>
      <div className="h-3 bg-coffee-200 rounded w-1/3"></div>
      <div className="h-16 bg-coffee-200 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-coffee-200 rounded w-20"></div>
        <div className="h-10 bg-coffee-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

interface LazyBookCardProps {
  book: any;
  showActions?: boolean;
  onEdit?: (book: any) => void;
  onDelete?: (bookId: string) => void;
}

const LazyBookCard: React.FC<LazyBookCardProps> = (props) => {
  return (
    <Suspense fallback={<BookCardSkeleton />}>
      <BookCard {...props} />
    </Suspense>
  );
};

export default LazyBookCard;