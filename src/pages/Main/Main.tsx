import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { useInfiniteQuery } from 'react-query';
import ImageList from '../../components/ImageList/ImageList';
import InfiniteScroll from '../../components/InfinityScroll/InfinityScroll';
import Navbar from '../../components/header/Navbar';
import Popular from '../Popular/Popular';
import './Main.css';


const fetchImages = async ({ pageParam = 1 }, searchTerm: string) => {
  const perPage = 20;
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?page=${pageParam}&per_page=${perPage}&query=${searchTerm}`,
    {
      headers: {
        Authorization: 'Client-ID sEdYYIA2IifWVlKGzg-tWntBNwqg1vvPvBGIGzJAxKs',
      },
    }
  );
  return { results: response.data.results, nextPage: pageParam + 1 };
};

const Main: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const loadingRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['images', debouncedSearchTerm],
    ({ pageParam = 1 }) => fetchImages({ pageParam }, debouncedSearchTerm),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
      enabled: !!debouncedSearchTerm,
    }
  );

  useEffect(() => {
    const saveSearchTerm = () => {
      if (debouncedSearchTerm.trim() !== '') {
        const savedWords = localStorage.getItem('searchWords');
        const searchWords = savedWords ? JSON.parse(savedWords) : [];
        if (!searchWords.includes(debouncedSearchTerm)) {
          const newSearchWords = [debouncedSearchTerm, ...searchWords].slice(0, 10);
          localStorage.setItem('searchWords', JSON.stringify(newSearchWords));
        }
      }
    };
    saveSearchTerm();
  }, [debouncedSearchTerm]);

  


  return (
    <>
      <Navbar />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for images"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {debouncedSearchTerm ? (
      <div>
        {isSuccess && <ImageList images={data.pages.flatMap((page) => page.results)} />}
        <InfiniteScroll
          loadingRef={loadingRef}
          onPageChange={() => {
            if (hasNextPage) fetchNextPage();
          }}
        />
      </div>
    ) : (
      <Popular />
    )}
    </>
  );
};

export default Main;
