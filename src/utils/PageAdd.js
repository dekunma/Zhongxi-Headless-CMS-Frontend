import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import feathers from '@feathersjs/feathers';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
function PageAdd(){
    const [values, setValues] = React.useState({
        page    :   "default",
        Key     :   [],
        Value   :   [],
        pairNum :   0,
        pairIDs :   [1,2,3],
      });
    
    const valueNames = [
        {
            value   :   "String"
        },
        {
            value   :   "Number"
        },
        {

            value   :   "Boolean"
        },
    ]
    function addService(serviceName){
        const url = "http://localhost:3030";
        const newService = {
            async find(params) {
              return [];
            },
            async get(id, params) {},
            async create(data, params) {},
            async update(id, data, params) {},
            async patch(id, data, params) {},
            async remove(id, params) {}
          }
        feathers().use(serviceName,newService) 
    }

    function addPairNum(){
        values.pairNum++;
        values.pairIDs.push(values.pairNum);

    }

      const handleChange = (name,id) =>{
            
        setValues({[name[id]]:id.target.value})
      }
      const handleChangeValue = name => event => {
        values.Value.push(event.target.value);
      };
    
    
        return(
                <div>
                        <Fab color="primary" aria-label="add" onClick={addPairNum} >
                            <AddIcon />
                        </Fab>
                        {   
                            values.pairIDs.map(id => (
                                <Grid key="id">
                                   {id}  
                                </Grid>
                        ))
                        }

                    
                </div>
            )
    

}

export default PageAdd;