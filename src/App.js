import React from 'react';
import './App.css';
import { tsIndexSignature } from '@babel/types';
import { __values } from 'tslib'
import DatasetsTable from './components/DatasetsTable'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));




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
        center: {lat: 50, lng: 10},
        zoom: 13
       
      });

      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: this.state.position
      });

      var infowindow = new window.google.maps.InfoWindow();
      var infowindowContent = document.getElementById("infowindow")
      infowindow.setContent(infowindowContent)
     

      
      this.autocomplete = new window.google.maps.places.Autocomplete( document.getElementById("pac-input"));
      this.autocomplete.addListener('place_changed', () => {
      var place = this.autocomplete.getPlace();
      this.places = place;
      infowindow.close();
      this.marker.setVisible(false);
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      var data = this.state.data;
      var info = {
        id: place.id,
        address: place.formatted_address,
        location: place.geometry.location
        //  place.geometry.location
        }


      data.push({info});
      console.log(info)
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
        <div id="infowindow-content">
  <img src="" width="16" height="16" id="place-icon"/>
  <span id="place-name"  className="title"></span>
  <span id="place-address"></span>
</div>

        <div id="table">
          <Paper>
          <Table >
        <TableHead>
          <TableRow>
            <TableCell>  Name of the place Place  </TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {this.state.data.map(place => (
       
            <TableRow key={place.info.id}>
              <TableCell component="th" scope="row">{place.info.address}   </TableCell>
              <TableCell align="right">             {place.info.location.lat() } </TableCell>
              <TableCell align="right">             {place.info.location.lng()}</TableCell>
            </TableRow>
          
          ))}
        </TableBody>
        </Table>
        </Paper>
        <DatasetsTable dataset = {this.state.data}/>
          

        </div>        
      </div>
    );
  }
  }
  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwTEDiXGiyN6KgHMgQruqPvASqVAitUU&callback=initMap"
  //   async defer></script>


  export default App;

