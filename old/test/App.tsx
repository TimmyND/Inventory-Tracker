import { useState } from 'react';
import { NavBar } from './components/NavBar.tsx';
import { Login as LoginPage } from './pages/Login.tsx';
import { Home as HomePage } from './pages/Home.tsx';
import './App.css';

function loadSavedUser() {
  const savedUser = localStorage.getItem('user');
  if (savedUser === null) {
    return null;
  }

  const user = JSON.parse(savedUser);
  if (user.token === undefined) {
    return null;
  }

  return user;
}

function App() {
  const [user, setUser] = useState(loadSavedUser());
  const [page, setPage] = useState('page');

  function getCurrentPage(props: any) {
    if (page == 'HomePage') {
      return <HomePage {...props} />;
    }
    else if (page == 'LoginPage') {
      return <LoginPage {...props} />;
    }

    setPage('LoginPage');
    return <LoginPage {...props} />
  }

  function handleLogin(loggedInUser: any) {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setPage('HomePage');
  }

  async function handleLogout() {
    try {
      await fetch('/logout/', {
        method: 'POST',
        headers: { Authorization: 'Token ' + user.token },
      });
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem('user');
    setUser(null);
    setPage('LoginPage');
  }

  // Unauthenticated page layout
  const props = {
    onLogin: handleLogin,
    user: user
  }

  // Go to login if unauthenticated
  if (user === null) {
    setPage('LoginPage');
  }

  // Authenticated page layout (HomePage by default)
  else if (!page || page == 'LoginPage') {
    setPage('HomePage');
  }

  if (page != 'LoginPage') {
    return (
      <>
        <NavBar page={page} setPage={setPage} handleLogout={handleLogout} />
        {getCurrentPage(props)}
      </>
    )
  }

  return getCurrentPage(props);
}

export default App;