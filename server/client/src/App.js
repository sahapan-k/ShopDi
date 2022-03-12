import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AccountInfo from './structures/Body/AccountInfo';
import Checkout from './structures/Body/Checkout';
import Settings from './structures/Body/Settings';
import CreateNewListing from './structures/Body/CreateNewListing';
import SellListing from './structures/Body/SellListing';
import PurchaseHistory from './structures/Body/PurchaseHistory';
import ItemDetailPage from './pages/ItemDetailPage';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Profile />}>
            <Route path="account" element={<AccountInfo />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="settings" element={<Settings />} />
            <Route path="create-new-listing" element={<CreateNewListing />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="my-sell-listings" element={<SellListing />} />
          </Route>
          <Route path="/items/:itemId" element={<ItemDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
