import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import style from './SearchFilters.module.css';
import {
  ALL_USERS,
  FOLLOWED_ONLY,
  UNFOLLOWED_ONLY,
} from '../../../redux/reducers/user-reducer';

const UsersSearchForm: FC<{
  searchUsersWithFilters: (_term: string, _count: number, _friend: string) => void;
  keyword: string;
  pageSize: number;
  displayedUsersCategory: string;
  pageSizeOptions: any[];
}> = ({
  keyword,
  pageSize,
  displayedUsersCategory,
  pageSizeOptions,
  searchUsersWithFilters,
}) => (
  <Formik
    initialValues={{
      keywordValue: keyword,
      pageSizeValue: pageSize,
      usersDisplayingCategoryValue: displayedUsersCategory,
    }}
    onSubmit={({ keywordValue, pageSizeValue, usersDisplayingCategoryValue }) => {
      searchUsersWithFilters(
        keywordValue,
        pageSizeValue,
        usersDisplayingCategoryValue,
      )
    }
    }
  >

    {(_props: any) => (
      <Form>
        <div className={style['search-block__by-name']}>
            <Field
              type="text"
              name='keywordValue'
              maxLength={20}
            />
        </div>
        <div className={style['search-block__items-amount']}>
          <label htmlFor="pageSizeValue">
            <Field as="select" name="pageSizeValue" id="pageSizeValue">
              {pageSizeOptions.map((opt: number, i) => (
                <option value={opt} key={`${opt}${i + 1}`}>
                  {opt}
                </option>
              ))}
            </Field>
            Amount of users on page
          </label>
        </div>
        <div>
          <label htmlFor={FOLLOWED_ONLY}>
            <Field
              id={FOLLOWED_ONLY}
              type="radio"
              name="usersDisplayingCategoryValue"
              value={FOLLOWED_ONLY}
            />
            Only followed users
          </label>
          <label htmlFor={UNFOLLOWED_ONLY}>
            <Field
              id={UNFOLLOWED_ONLY}
              type="radio"
              name="usersDisplayingCategoryValue"
              value={UNFOLLOWED_ONLY}
            />
            Only unfollowed users
          </label>
          <label htmlFor={ALL_USERS}>
            <Field
              id={ALL_USERS}
              type="radio"
              name="usersDisplayingCategoryValue"
              value={ALL_USERS}
            />
            All users
          </label>
        </div>
        <button type='submit'>Search</button>
      </Form>
    )}
  </Formik>
);

export default UsersSearchForm;
