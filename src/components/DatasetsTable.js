import React, {Component} from 'react';
import { directive } from '@babel/types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class DatasetsTable extends Component{
    constructor (props){
        super(props);
        
        
    }

    handleClick = (index) => {
      this.props.callbackFromParent(index);

    }
  
    

    render(){
        return(

            <div id="table">
             
          <Table >
        <TableHead>
          <TableRow>
            <TableCell>  Name of the place Place  </TableCell>
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
                <button onClick={this.handleClick}>
                Delete
                </button>
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