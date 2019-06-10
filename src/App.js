import React from 'react';
import './App.css';
import { tsIndexSignature } from '@babel/types';
import { __values } from 'tslib';
import DatasetsTable from './components/DatasetsTable'


function loadScript (url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  

}


  
  class App extends React.Component {

    constructor(props){
      super(props); 
      this.state = {
        position:{
        lat: 50.052453,
        lng:  19.941800
        },
        searchPlace: '',
        data: [
          {name: "Krakow", lat: 50.052453,lng:  19.941800}
        ]
      }
    }
    
    componentDidMount(){
      this.renderMap()
      
    }
    renderMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&libraries=places&callback=initMap")
      window.initMap = this.initMap
    }


     initMap = () => {
     this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: this.state.position.lat, lng: this.state.position.lng},
        zoom: 13
       
      });

      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: this.state.position
      });

      var infoWindow = new window.google.maps.InfoWindow();
      var infowindowContent = document.getElementById("infowindow")
      infoWindow.setContent(infowindowContent)
     

      
      this.autocomplete = new window.google.maps.places.Autocomplete( document.getElementById("pac-input"));
      this.autocomplete.addListener('place_changed', () => {
      var place = this.autocomplete.getPlace();
      infoWindow.close();
      this.marker.setVisible(false);
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);  // Why 17? Because it looks good.
      }
      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);
      

      
      


      })
      
     
    }
    
        
        
    

   

    render(){
     console.log(this.state.searchPlace)
    return (
      


      <div className="App">
       
        <div>
          <p>Autocomplete search</p>
          <input id="pac-input" type="text"
          placeholder="Enter a location"  />
      </div>

        <div id="map">  </div>
        <div id="infowindow-content">
  <img src="" width="16" height="16" id="place-icon"/>
  <span id="place-name"  className="title"></span>
  <span id="place-address"></span>
</div>

        

        <div id="table">
          <DatasetsTable dataset = {this.state.data}/>
          

        </div>        
      </div>
    );
  }
  }
  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&callback=initMap"
  //   async defer></script>


  export default App;

