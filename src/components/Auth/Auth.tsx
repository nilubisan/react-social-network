import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Auth: FC<{ onSubmitAuthForm: () => void }> = ({ onSubmitAuthForm }) => (
  <div>
    <Link to="/" onClick={onSubmitAuthForm} type="button">
      AUTH ME
    </Link>
  </div>
);

export default Auth;
