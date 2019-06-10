import React from 'react';
import './App.css';


function loadScript (url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  

}


  
  class App extends React.Component {

    componentDidMount(){
      this.renderMap()
      
    }
    
    state = {
      lat: 50.052453,
      lng:  19.941800,
      searchPlace: '',
      data: []
    }

    renderMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&libraries=places&callback=initMap")
      window.initMap = this.initMap
    }


     initMap = () => {
     var map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: this.state.lat, lng: this.state.lng},
        zoom: 13
       
        
      });
     
    }

    handleAutocomplete = () => {
      let input = document.getElementById("pac-input");
      var autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('places_changed', () => {
      var place = autocomplete.getPlace();
      console.log(place);
      

      
      
      })
      
    }


   
    
    render(){
     
    return (


      <div className="App">
       
        <div>
          <p>Autocomplete search</p>
          <input id="pac-input" type="text"
          placeholder="Enter a location" onChange={this.handleAutocomplete} />
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

