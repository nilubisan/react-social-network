import React, { FC, useState, useRef } from 'react';
import style from './Pagination.module.css';
import getPagesNumbersList from './helpers';

const Pagination: FC<{
  totalItemsAmount: number;
  activePageNumber: number;
  onPageSwitch: (_pageNumber: number, _keyword: string) => void;
  searchByString: (_value: string) => void;
  keyword: string
}> = ({ totalItemsAmount, activePageNumber, onPageSwitch, searchByString, keyword }) => {
  const pagesNumbersList = getPagesNumbersList(
    activePageNumber,
    totalItemsAmount
  );
  const [keywordValue, setKeywordValue] = useState(keyword);
  const pageNumberInputRef = useRef(null);
  const onSearchByPageNumberClick = () => {
    if (Number.isNaN(+pageNumberInputRef.current.value)) return null;
    return onPageSwitch(+pageNumberInputRef.current.value, keywordValue);
  };
  const onSearchByName = () => {
    searchByString(keywordValue);
  }

  const handleSearchByKeywordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setKeywordValue(event.currentTarget.value)
  return (
    <div className={style['users-pagination']}>
      <button type="button" onClick={() => onPageSwitch(activePageNumber - 1, keywordValue)}>
        {'<'}
      </button>
      {pagesNumbersList.map((item) => {
        const result =
          item === '...' ? (
            <span key={item}>{item}</span>
          ) : (
            <button
              key={item.toString()}
              type="button"
              className={
                item === activePageNumber
                  ? `${style['users__page-link']} ${style['users__page-link_active']}`
                  : style['users__page-link']
              }
              onClick={() => onPageSwitch(item as number, keywordValue)}
            >
              {item}
            </button>
          );
        return result;
      })}
      <button type="button" onClick={() => {
        onPageSwitch(activePageNumber + 1, keywordValue)}
        }>
        {'>'}
      </button>
      <div className={style['search-block']}>
        <div className={style['search-block__by-page-number']}>
          <input type="text" id='page-number-search' ref={pageNumberInputRef} maxLength={6} />
          <button type="button" onClick={onSearchByPageNumberClick}>
            Search
          </button>
        </div>
        <div className={style['search-block__by-name']}>
          <input type="text" id='friend-name-search' maxLength={20} value={keywordValue || ''} onChange={handleSearchByKeywordInputChange}/>
          <button type="button" onClick={onSearchByName}>
            Search by name
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
