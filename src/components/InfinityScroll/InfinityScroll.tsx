import React, { useEffect } from 'react';

interface InfiniteScrollProps {
  loadingRef: React.RefObject<HTMLDivElement>;
  onPageChange: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadingRef,
  onPageChange,
}) => {
  const handleIntersection = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      onPageChange();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    if (loadingRef.current) {
      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(loadingRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [loadingRef, onPageChange]);

  return <div ref={loadingRef}></div>;
};

export default InfiniteScroll;
