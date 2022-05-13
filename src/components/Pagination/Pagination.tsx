import React, { FC } from 'react';
import style from './Pagination.module.css';
import getPagesNumbersList from './helpers';

const Pagination: FC<{
  totalItemsAmount: number;
  activePageNumber: number;
  onPageSwitch: (_pageNumber: number) => void;
}> = ({ totalItemsAmount, activePageNumber, onPageSwitch }) => {
  const pagesNumbersList = getPagesNumbersList(
    activePageNumber,
    totalItemsAmount,
  );
  return (
    <div className={style['users-pagination']}>
      <button type="button" onClick={() => onPageSwitch(activePageNumber - 1)}>
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
              onClick={() => onPageSwitch(item as number)}
            >
              {item}
            </button>
          );
        return result;
      })}
      <button type="button" onClick={() => onPageSwitch(activePageNumber + 1)}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
