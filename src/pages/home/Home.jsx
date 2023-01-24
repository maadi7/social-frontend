import React from 'react';
import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

const Home = () => {
  return (
    <div className='home' >
     <Topbar />
     <div className="Container">
      <Leftbar/>
      <Feed/>
      <Rightbar />
     </div>
      </div>
  )
}

export default Home
