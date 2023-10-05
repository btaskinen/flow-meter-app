import { FormEvent, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FlowHistory from './components/FlowHistory';
import Settings from './components/Settings';
import CurrentReading from './components/CurrentReading';
import { login } from './services/login';
import { Data, LoginData, User } from './types';
import './App.css';

const App = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedFlowMeterAppUser'
    );
    if (loggedUserJSON) {
      const user: User = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const currentData: Data = {
    flowRate: 0.75,
    energyFlowRate: 18.5,
    velocity: 0.63,
    fluidSoundSpeed: 1657.1,
    temperatureInlet: 7.1,
    temperatureOutlet: 10.8,
    date: new Date().toString(),
  };
  const navigate = useNavigate();

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const userCredentials: LoginData = {
      username,
      password,
    };

    const loggedInUser: User = await login(userCredentials);
    console.log(loggedInUser);
    setUser(loggedInUser);
    window.localStorage.setItem(
      'loggedFlowMeterAppUser',
      JSON.stringify(loggedInUser)
    );
    setUsername('');
    setPassword('');
    navigate('/');
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedFlowMeterAppUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <h1>Cooling Liquid Flow Rate</h1>
      {user && (
        <>
          <p>{user.name} is logged in</p>
          <nav className="App_navbar">
            <Link to="/">Current Reading</Link>
            <Link to="/flow-history">Flow History</Link>
            <Link to="/settings">Settings</Link>
            <button className="App_logoutButton" onClick={logoutHandler}>
              Logout
            </button>
          </nav>
        </>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginPage
                username={username}
                password={password}
                setPassword={setPassword}
                setUsername={setUsername}
                handleLogin={loginHandler}
              />
            )
          }
        />
        <Route
          path="/flow-history"
          element={user ? <FlowHistory /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/current-reading"
          element={
            user ? (
              <CurrentReading data={currentData} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/current-reading" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
