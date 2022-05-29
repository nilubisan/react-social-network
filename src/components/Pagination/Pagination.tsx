import React, { FC, useState } from 'react';
import style from './Pagination.module.css';
import getPagesNumbersList from './helpers';

const Pagination: FC<{
  totalItemsAmount: number;
  activePageNumber: number;
  onPageSwitch: (_pageNumber: number) => void;
  pageSize: number;
}> = ({ totalItemsAmount, activePageNumber, onPageSwitch, pageSize }) => {
  const pagesNumbersList = getPagesNumbersList(
    activePageNumber,
    totalItemsAmount,
    pageSize,
  );
  const [pageNumberInput, setPageNumberInput] = useState(null);
  const pageNumberSwitchHandler = () => {
    if (Number.isNaN(pageNumberInput)) return null;
    return onPageSwitch(pageNumberInput);
  };

  return (
    <div className={style['users-pagination']}>
      <button type="button" onClick={() => onPageSwitch(activePageNumber - 1)}>
        {'<'}
      </button>
      {pagesNumbersList.map((item, i) => {
        const result =
          item === '...' ? (
            <span key={`${item}${i + 1}`}>{item}</span>
          ) : (
            <button
              key={item.toString()}
              type="button"
              className={
                item === activePageNumber
                  ? `${style['users__page-link']} ${style['users__page-link_active']}`
                  : style['users__page-link']
              }
              onClick={() => onPageSwitch(item as number)}
            >
              {item}
            </button>
          );
        return result;
      })}
      <button
        type="button"
        onClick={() => {
          onPageSwitch(activePageNumber + 1);
        }}
      >
        {'>'}
      </button>
      <div className={style['search-block__by-page-number']}>
        <input
          type="text"
          id="page-number-search"
          maxLength={6}
          onChange={(e) => setPageNumberInput(+e.target.value)}
        />
        <button type="button" onClick={pageNumberSwitchHandler}>
          Switch
        </button>
      </div>
    </div>
  );
};

export default Pagination;
