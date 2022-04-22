import React, { FC } from 'react';

const Auth: FC<{ onSubmitAuthForm: () => void }> = ({ onSubmitAuthForm }) => (
  <div>
    <button onClick={onSubmitAuthForm} type="button">
      AUTH ME
    </button>
  </div>
);

export default Auth;
