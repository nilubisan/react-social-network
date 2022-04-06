import React, { FC } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChangeFollowingStatusAC,
  SwitchUserPageAC,
  ToggleIsLoadingAC,
} from '../../redux/reducers/user-reducer';
// import { setProfileAC, toggleIsLoadingProfileAC } from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import { API_URL } from '../../helpers/api';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.users,
    isLoading: state.users.isLoading,
  }));

  let activePageNumber = useSelector(
    (state: any) => state.users.activePageNumber,
  );
  const totalAmount = useSelector((state: any) => state.users.totalAmount);
  const dispatch = useDispatch();
  const onChangeFollowStatus = (userID: string) => {
    dispatch(ChangeFollowingStatusAC(userID));
  };

  const onPageSwitch = (activePageNum: number) => {
    dispatch(ToggleIsLoadingAC(true));
    axios.get(`${API_URL}/users?page=${activePageNum}`).then((response) => {
      dispatch(ToggleIsLoadingAC(false));
      dispatch(SwitchUserPageAC(response.data.items, activePageNum));
    });
  };

  const onPageBack = () => {
    if (+activePageNumber > 1) {
      activePageNumber -= 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
        )
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  const onPageForward = () => {
    if (+activePageNumber !== Math.ceil(totalAmount / 10)) {
      activePageNumber += 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
        )
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  // const onSetProfile = (id: string) => {
  //   // dispatch(toggleIsLoadingProfileAC(true));
  //   // axios.get(`${API_URL}/profile/${id}`).then((respone: any) => {
  //   //   dispatch(setProfileAC(respone.data));
  //   //   dispatch(toggleIsLoadingProfileAC(false));
  //   // });
  //   console.log(id);
  // };

  return usersProps.isLoading ? (
    <Preloader />
  ) : (
    <Users
      usersProps={usersProps.users}
      onChangeFollowStatus={onChangeFollowStatus}
      onPageSwitch={onPageSwitch}
      onPageForward={onPageForward}
      onPageBack={onPageBack}
    />
  );
};

export default UsersContainer;
