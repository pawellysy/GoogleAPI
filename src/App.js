import React from 'react';
import './App.css';
import { tsIndexSignature } from '@babel/types';
import { __values } from 'tslib';


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
        lat: 50.052453,
        lng:  19.941800,
        searchPlace: '',
        data: []
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
        center: {lat: this.state.lat, lng: this.state.lng},
        zoom: 13
       
      });
      
      this.autocomplete = new window.google.maps.places.Autocomplete( document.getElementById("pac-input"));
      this.autocomplete.addListener('place_changed', () => {
      var place = this.autocomplete.getPlace();
      this.setState({searchPlace: place})
      
      


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

        

        <div id="table">
          

        </div>        
      </div>
    );
  }
  }
  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&callback=initMap"
  //   async defer></script>


  export default App;

