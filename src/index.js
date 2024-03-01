import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from "./components/Shared/StarRating";

const messages = [
  "Terrible",
  "Bad",
  "Ok",
  "Good",
  "Amazing",
]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/*<StarRating maxRating={5} fontSize={24} messages={messages}/>*/}
    {/*<StarRating maxRating={10} color="#FF0000" defaultRaitings={3}/>*/}
  </React.StrictMode>
);

