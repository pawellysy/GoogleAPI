import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class App extends React.Component {
  render(){
  return (
    <div className="App">
      <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&callback=initMap"
    async defer></script>
    </div>
  );
}
}
export default App;

