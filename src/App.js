import React from 'react';
import './App.css';
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
        center: {lat: 50.0590158	, lng: 19.938079700000003},
        zoom: 17
       
      });

      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: this.state.position
      });
      
      this.autocomplete = new window.google.maps.places.Autocomplete( document.getElementById("pac-input"));
      this.autocomplete.addListener('place_changed', () => {
      var place = this.autocomplete.getPlace();
      this.places = place;
      this.marker.setVisible(false);
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      var data = this.state.data;
      var info = {
        id: place.id,
        address: place.formatted_address,
        location: place.geometry.location
        
        }


      data.push({info}); 
      this.setState({data: data});
      
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17); 
      }
      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);
      })

    }

    deleteRow = (rowIndex) => {
      var data = this.state.data;
      data.splice(rowIndex, 1);
      this.setState({data: data})


    }
    
    
    render(){
     
      console.log(this.state);
    return (
      
      <div className="App">
        <div>
          <p>Autocomplete search</p>
          <input id="pac-input" type="text"
          placeholder="Enter a location"  />
       </div>

        <div id="map">  </div>
       

        <div id="table">
        
        <DatasetsTable dataset = {this.state.data} callbackFromParent={this.deleteRow}/>
          

        </div>        
      </div>
    );
  }
  }
  

  export default App;

