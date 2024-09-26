// import './App.css'
// import { Route, Routes } from 'react-router-dom'
// import Details from './components/Details'
// import CheckDetails from './components/CheckDetails'
// import DashboardDetails from './components/DashboardDetails'
// import { useEffect } from 'react'

// function App() {

 

//   return (
//     <>
//     <Routes>
//       <Route path='/' element={<Details/>}/>
//       <Route path='check' element={<CheckDetails/>}/>
//       <Route path='/dashboard' element={<DashboardDetails/>}/>
//     </Routes>
//     </>
//   )
// }

// export default App


import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import CheckDetails from './components/CheckDetails';
import DashboardDetails from './components/DashboardDetails';
import './App.css';

function App() {
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/sw.js')
  //         .then((registration) => {
  //           console.log('Service Worker registered: ', registration);
  //         })
  //         .catch((registrationError) => {
  //           console.log('Service Worker registration failed: ', registrationError);
  //         });
  //     });
  //   }
  // }, []);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        // console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Details />} />
        <Route path='check' element={<CheckDetails />} />
        <Route path='/dashboard' element={<DashboardDetails />} />
      </Routes>
    </>
  );
}

export default App;

