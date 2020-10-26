import React from 'react';
import {Link} from "react-router-dom";
import './styles.css';

function Home() {
  return (
    <div class="pop-in">

      <nav class="navbar">
        <div class="home-title">igotwalls</div>
        <Link to={{ pathname: '/about'}}><button type="button" class="btn btn-dark">?</button></Link>
      </nav>
     
      <div class="img-grid">
        <div class="map-img">
            <Link to={{ pathname: '/map', state: { map_name: "ascent", map_num: 0 }}}><img src="images/maps/ascent_load.png"/></Link>
        </div>

        <div class="map-img">
          <Link to={{ pathname: '/map', state: { map_name: "bind", map_num: 1 }}}><img src="images/maps/bind_load.png"/></Link>
        </div>

        <div class="map-img">
          <Link to={{ pathname: '/map', state: { map_name: "haven", map_num: 2 }}}><img src="images/maps/haven_load.png"/></Link>
        </div>

        <div class="map-img">
          <Link to={{ pathname: '/map', state: { map_name: "split", map_num: 3 }}}><img src="images/maps/split_load.png"/></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;