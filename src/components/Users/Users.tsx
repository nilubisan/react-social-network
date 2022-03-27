import React, { FC } from 'react';
import User, { IUser } from './User/User';
import style from './Users.module.css';

interface IUsers {
  usersProps: {
    usersList: IUser[];
    activePageNumber: number;
    totalAmount: number;
  };
  onChangeFollowStatus: (_userID: string) => void;
  onPageSwitch: (_activePageNumber: number) => void;
  onPageBack: () => void;
  onPageForward: () => void;
}
const Users: FC<{
  usersProps: IUsers['usersProps'];
  onChangeFollowStatus: IUsers['onChangeFollowStatus'];
  onPageSwitch: IUsers['onPageSwitch'];
  onPageBack: IUsers['onPageBack'];
  onPageForward: IUsers['onPageForward'];
}> = ({
  usersProps,
  onChangeFollowStatus,
  onPageSwitch,
  onPageBack,
  onPageForward,
}) => {
  const { usersList, activePageNumber, totalAmount } = usersProps;
  const totalPagesAmount = Math.ceil(totalAmount / 10);

  const getRangeOfElements = (startValue: number, endValue: number) => {
    const elementsRangeArray = [];
    for (let i = startValue; i <= endValue; i++) {
      elementsRangeArray.push(i);
    }
    return elementsRangeArray;
  };

  const divideNumbersList = (
    pagesNumbersList: number[],
    activeNumberOfPage: number,
  ) => {
    const dividedNumbersList: Array<number | string> = [...pagesNumbersList];
    const lastThirdListElement =
      dividedNumbersList[dividedNumbersList.length - 3];
    const lastListElement = dividedNumbersList[
      dividedNumbersList.length - 1
    ] as number;

    if (activeNumberOfPage < 3 || activeNumberOfPage > lastThirdListElement) {
      dividedNumbersList.splice(3, 0, '...');
    } else if (activeNumberOfPage < 6) {
      dividedNumbersList.splice(activeNumberOfPage + 1, 0, '...');
    } else if (lastListElement - 5 < activeNumberOfPage) {
      dividedNumbersList.splice(
        dividedNumbersList.indexOf(activeNumberOfPage) - 1,
        0,
        '...',
      );
    } else {
      dividedNumbersList.splice(3, 0, '...');
      dividedNumbersList.splice(7, 0, '...');
    }
    return dividedNumbersList;
  };

  const pagesNumbersList =
    totalPagesAmount < 10
      ? getRangeOfElements(1, totalPagesAmount)
      : activePageNumber < 3 || activePageNumber > totalPagesAmount - 2
      ? [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ]
      : activePageNumber < 6
      ? [
          ...getRangeOfElements(1, activePageNumber + 1),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ]
      : activePageNumber > totalPagesAmount - 5
      ? [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(activePageNumber - 1, totalPagesAmount),
        ]
      : [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(activePageNumber - 1, activePageNumber + 1),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ];

  const pagesNumbersListDivided = divideNumbersList(
    pagesNumbersList,
    activePageNumber,
  );
  return (
    <>
      <ul className={style['users-list']}>
        {usersList.map((user: IUser) => (
          <li className={style['users-list__item']} key={user.id}>
            <User
              id={user.id}
              name={user.name}
              status={user.status}
              uniqueUrlName={user.uniqueUrlName}
              photos={user.photos}
              followed={user.followed}
              onChangeFollowStatus={onChangeFollowStatus}
            />
          </li>
        ))}
      </ul>
      <div className={style['users-pagination']}>
        <button type="button" onClick={onPageBack}>
          {'<'}
        </button>
        {pagesNumbersListDivided.map((item) => {
          const result =
            item === '...' ? (
              <span>{item}</span>
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
        <button type="button" onClick={onPageForward}>
          {'>'}
        </button>
      </div>
    </>
  );
};
export default Users;
