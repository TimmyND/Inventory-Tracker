import { useState } from 'react';
import { NavBar } from './components/NavBar.jsx';
import { Login as LoginPage } from './pages/Login.jsx';
import { Home as HomePage } from './pages/Home.jsx';
import { OrderList as OrderListPage } from './pages/OrderList.jsx';
import { PastOrders as PastOrdersPage } from './pages/PastOrders.jsx';
import { Products as ProductsPage } from './pages/Products.jsx';
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
  const [page, setPage] = useState(localStorage.getItem('page') || 'page');

  localStorage.setItem('page', page);

  function getCurrentPage(props) {
    if (page == 'HomePage') {
      return <HomePage {...props} />;
    }
    else if (page == 'LoginPage') {
      return <LoginPage {...props} />;
    }
    else if (page == 'OrderListPage') {
      return <OrderListPage {...props} />;
    }
    else if (page == 'PastOrdersPage') {
      return <PastOrdersPage {...props} />;
    }
    else if (page == 'ProductsPage') {
      return <ProductsPage {...props} />;
    }

    setPage('LoginPage');
    return <></>;
  }

  function handleLogin(loggedInUser) {
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
    handleLogin: handleLogin,
    setPage: setPage,
    user: user
  };

  // Handle logout if on logout page
  if (user !== null && page == "LogoutPage") {
    handleLogout();
  }

  // Go to login if unauthenticated
  if (user === null && page != "LoginPage") {
    setPage('LoginPage');
  }

  // Authenticated page layout (HomePage by default)
  else if (user !== null && (!page || page == 'LoginPage')) {
    setPage('HomePage');
  }

  // Handle authorized pages
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