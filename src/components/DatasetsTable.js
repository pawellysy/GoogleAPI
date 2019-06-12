import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


class DatasetsTable extends Component{
    

    handleClick = (index) => {
      this.props.callbackFromParent(index);

    }
  
    

    render(){
    return(

    <div id="table">
             
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name of the place Place</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Button</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {this.props.dataset.map((place, index) => (
            
       
            <TableRow key={place.info.id}>
              <TableCell component="th" scope="row">{place.info.address}   </TableCell>
              <TableCell align="right">             {place.info.location.lat() } </TableCell>
              <TableCell align="right">             {place.info.location.lng()}</TableCell>
              <TableCell>
                <Button onClick={() => this.handleClick(index)} variant="outlined">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          
          ))}
        </TableBody>
      </Table>
     
    </div>
    )
            
        
    }
    
}
export default DatasetsTable;