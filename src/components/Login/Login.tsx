import React, { FC } from 'react';
import { useFormik } from 'formik';
import validate from './validate';
import styles from './Login.module.css';
import { AuthParameters } from './LoginContainer';

const Auth: FC<{
  onSubmitAuthForm: (
    _authParameters: AuthParameters,
    _setStatus: (_status: { message: string }) => void,
  ) => void;
  error: { isError: boolean; message: string; captchaUrl: string };
}> = ({ onSubmitAuthForm, error }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      captchaInput: '',
      rememberMe: false,
    },
    validate,
    onSubmit: (values, actions) => {
      onSubmitAuthForm(values, actions.setStatus);
    },
  });

  return (
    <div className={styles['signup-form__container']}>
      <form className={styles['signup-form']} onSubmit={formik.handleSubmit}>
        <input
          className={styles['input-field']}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div className={styles['error-msg']}>{formik.errors.email}</div>
        ) : null}
        <input
          className={`${styles['input-field']} ${styles['mt-20']}`}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className={styles['error-msg']}>{formik.errors.password}</div>
        ) : null}
        {error.captchaUrl.length > 0 ? (
          <div>
            <p>Enter text from captcha</p>
            <img src={error.captchaUrl} alt="" />
            <input
              type="text"
              name="captchaInput"
              id="captchaInput"
              value={formik.values.captchaInput}
              onChange={formik.handleChange}
            />
          </div>
        ) : null}
        <label htmlFor="rememberMe" className={styles['mt-20']}>
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            value={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <span> Remember me </span>
        </label>

        {formik.status && (
          <div
            className={`${styles['error-msg']} ${styles['mt-20']} ${styles['center-text']}`}
          >
            {formik.status.message}
          </div>
        )}

        <button
          className={`${styles['submit-btn']} ${styles['mt-30']}`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
