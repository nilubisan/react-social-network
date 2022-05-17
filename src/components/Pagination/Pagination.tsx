import React, { FC, useState, useRef } from 'react';
import style from './Pagination.module.css';
import getPagesNumbersList from './helpers';

const Pagination: FC<{
  totalItemsAmount: number;
  activePageNumber: number;
  onPageSwitch: (
    _pageNumber: number,
    _pageSize: number,
    _keyword: string,
    _usersDisplayingStatusVal: string
  ) => void;
  searchByKeyword: (_value: string, _displayOnlyFollowed: string) => void;
  keyword: string;
  pageSize: number;
  displayedUsersCategory: string;
  pageSizeOptions: any[];
}> = ({
  totalItemsAmount,
  activePageNumber,
  onPageSwitch,
  searchByKeyword,
  keyword,
  pageSizeOptions,
  displayedUsersCategory,
  pageSize,
}) => {
  const pagesNumbersList = getPagesNumbersList(
    activePageNumber,
    totalItemsAmount,
    pageSize,
  );
  
  const [keywordValue, setKeywordValue] = useState(keyword);
  const [pageSizeValue, setPageSizeValue] = useState(pageSize);
  const [usersDisplayingCategoryValue, setUsersDisplayingCategoryValue] = useState(displayedUsersCategory);
  const pageNumberInputRef = useRef(null);
  const onSearchByPageNumberClick = () => {
    if (Number.isNaN(+pageNumberInputRef.current.value)) return null;
    return onPageSwitch(
      +pageNumberInputRef.current.value,
      pageSizeValue,
      keywordValue,
      usersDisplayingCategoryValue
    );
  };

  const onSearchByKeyword = () => {
    searchByKeyword(keywordValue, usersDisplayingCategoryValue);
  };

  const onChangePageSize = () => {
    onPageSwitch(activePageNumber, pageSizeValue, keyword, usersDisplayingCategoryValue);
  };

  const onToggleUsersDisplayingCategory = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setUsersDisplayingCategoryValue(e.currentTarget.value);
  }

  const handleSearchByKeywordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeywordValue(event.currentTarget.value);
  };

  const handleSelectPageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSizeValue(+event.target.value);
  };

  return (
    <div className={style['users-pagination']}>
      <button
        type="button"
        onClick={() =>
          onPageSwitch(activePageNumber - 1,  pageSizeValue, keywordValue, usersDisplayingCategoryValue)
        }
      >
        {'<'}
      </button>
      {pagesNumbersList.map((item, i) => {
        const result =
          item === '...' ? (
            <span key={`${item}${i+1}`}>{item}</span>
          ) : (
            <button
              key={item.toString()}
              type="button"
              className={
                item === activePageNumber
                  ? `${style['users__page-link']} ${style['users__page-link_active']}`
                  : style['users__page-link']
              }
              onClick={() =>
                onPageSwitch(item as number,  pageSizeValue, keywordValue, usersDisplayingCategoryValue)
              }
            >
              {item}
            </button>
          );
        return result;
      })}
      <button
        type="button"
        onClick={() => {
          onPageSwitch(activePageNumber + 1,  pageSizeValue, keywordValue, usersDisplayingCategoryValue);
        }}
      >
        {'>'}
      </button>
      <div className={style['search-block']}>
        <div className={style['search-block__by-page-number']}>
          <input
            type="text"
            id="page-number-search"
            ref={pageNumberInputRef}
            maxLength={6}
          />
          <button type="button" onClick={onSearchByPageNumberClick}>
            Search
          </button>
        </div>
        <div className={style['search-block__by-name']}>
          <input
            type="text"
            id="friend-name-search"
            maxLength={20}
            value={keywordValue || ''}
            onChange={handleSearchByKeywordInputChange}
          />
          <button type="button" onClick={onSearchByKeyword}>
            Search by name
          </button>
        </div>
        <div className={style['search-block__items-amount']}>
          <select
            onChange={handleSelectPageSizeChange}
            defaultValue={pageSizeValue}
          >
            {pageSizeOptions.map((opt: number, i) => (
              <option value={opt} key={`${opt}${i+1}`}>
                {opt}
              </option>
            ))}
          </select>
          <button type="button" onClick={onChangePageSize}>
            Search
          </button>
        </div>
        <div>
          <input type='radio' name="show_only_friends"  defaultChecked={usersDisplayingCategoryValue === 'followed-only'} value='followed-only' onClick={onToggleUsersDisplayingCategory} />
          <span>Only followed users</span>
          <input type='radio' name="show_only_friends" defaultChecked={usersDisplayingCategoryValue === 'unfollowed-only'} value='unfollowed-only' onClick={onToggleUsersDisplayingCategory} />
          <span>Only unfollowed users</span>
          <input type='radio' name="show_only_friends"  defaultChecked={usersDisplayingCategoryValue === 'all-users'} value='all-users' onClick={onToggleUsersDisplayingCategory} />
          <span>All users</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
