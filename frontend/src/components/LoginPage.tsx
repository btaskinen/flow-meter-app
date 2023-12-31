import { FormEvent } from 'react';
import './LoginPage.css';

type Props = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleLogin: (event: FormEvent) => void;
};

const LoginPage = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}: Props) => {
  return (
    <div className="LoginPage">
      <p>Login to see the Flow Data</p>
      <form className="LoginPage_form" onSubmit={handleLogin}>
        <div className="LoginPage_inputField">
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="LoginPage_inputField">
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="LoginPage_loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
