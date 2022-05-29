import React, { FC, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { setProfileStatus } from '../../../redux/reducers/profile-reducer';

const Status: FC<{
  statusText: string;
}> = ({ statusText }) => {
  const [status, setStatus] = useState(statusText);
  const [mode, editMode] = useState(false);
  const inputEl = useRef<HTMLInputElement>();
  useEffect(() => {
    if (mode && inputEl.current) inputEl.current.focus();
  }, [mode]);
  const dispatch = useDispatch();
  const onActionBtnClick = () => {
    if (mode) {
      dispatch(setProfileStatus(status));
    }
    editMode((modeValue) => !modeValue);
  };

  return (
    <div>
      <p className="profile__subtitle">
        {mode ? (
          <input
            ref={inputEl}
            type="text"
            value={status}
            onChange={(e) => setStatus(e.currentTarget.value)}
          />
        ) : (
          <span>{status}</span>
        )}
        <button type="button" onClick={onActionBtnClick}>
          <FontAwesomeIcon icon={mode ? faPaperPlane : faEdit} />
        </button>
      </p>
    </div>
  );
};

export default Status;
