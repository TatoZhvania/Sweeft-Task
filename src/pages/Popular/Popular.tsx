import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from '../../components/InfinityScroll/InfinityScroll';
import ImageList from '../../components/ImageList/ImageList';

interface Image {
  id: string;
  description: string;
  urls: {
    regular: string;
  };
}

const Popular: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchPopularImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&order_by=popular`,
        {
          headers: {
            Authorization:
              'Client-ID sEdYYIA2IifWVlKGzg-tWntBNwqg1vvPvBGIGzJAxKs',
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching popular images:', error);
    }
  };


  const handlePageChange = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      fetchPopularImages();
    }, 2000);
  };

  useEffect(() => {
    fetchPopularImages();
  }, [page]);

  return (
    <div>
      <ImageList images={images} />
      <InfiniteScroll loadingRef={loadingRef} onPageChange={handlePageChange} />
    </div>
  );
};

export default Popular;
