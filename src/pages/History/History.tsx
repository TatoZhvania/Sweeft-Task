import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "../../components/InfinityScroll/InfinityScroll";
import ImageList from "../../components/ImageList/ImageList";
import "./History.css";
import Navbar from "../../components/header/Navbar";
import { QueryFunctionContext } from 'react-query';

type QueryKey = [string, string | null];

const fetchImages = async ({ pageParam = 1, queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_key, word] = queryKey;
  if (!word) {
    throw new Error("Search word is not provided");
  }

  const perPage = 20;
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?page=${pageParam}&per_page=${perPage}&query=${word}`,
    {
      headers: {
        Authorization: 'Client-ID sEdYYIA2IifWVlKGzg-tWntBNwqg1vvPvBGIGzJAxKs',
      },
    }
  );
  return { results: response.data.results, nextPage: pageParam + 1 };
};

const History: React.FC = () => {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedWords = localStorage.getItem("searchWords");
    if (savedWords) {
      setSearchWords(JSON.parse(savedWords));
    }
  }, []);

  const { data, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["images", selectedWord],
    fetchImages,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!selectedWord,
    }
  );

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handlePageChange = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-words-container">
      <div className="history-list">
        <div>
          <h2>Searched Words:</h2>
        </div>
        <ul>
          {searchWords.map((word) => (
            <li
              key={word}
              onClick={() => handleWordClick(word)}
              className="search-word"
            >
              {word}
            </li>
          ))}
        </ul>
        </div>
      </div>

      {selectedWord && isSuccess && (
        <div>
          <ImageList images={data.pages.flatMap((page) => page.results)} />
          <InfiniteScroll
            loadingRef={loadingRef}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default History;
