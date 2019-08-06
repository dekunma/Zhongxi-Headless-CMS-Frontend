import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
class PageAdd extends React.Component{
    constructor(props){
        super(props);
        this.addPairNum = this.addPairNum.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.sendModel = this.sendModel.bind(this)
        this.state = {
            Key     :   [],
            Value   :   [],
            Name    :   "",
            pairNum :   0,
            pairIDs :   []
        }
    }
    
    valueNames = [
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

    sendModel(){
        const URL = "http://localhost:3030/models"
        const data = {
            Keys   : this.state.Key,
            Values : this.state.Value,
            Name   : this.state.Name
        }
        axios.post(URL, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
    }


    addPairNum(){
        this.setState({pairNum:this.state.pairNum + 1});
        this.state.pairIDs.push(this.state.pairNum);

    }

    handleChangeKey = id =>event => {
            var currentKey = this.state.Key[id];
            currentKey = event.target.value;
            var currentArray = this.state.Key;
            currentArray[id] = currentKey;
            this.setState({Key:currentArray})
      };

    handleChangeValue = id =>event => {
        var currentValue = this.state.Value[id];
        currentValue = event.target.value;
        var currentArray = this.state.Value;
        currentArray[id] = currentValue;
        this.setState({Value:currentArray})
  };
    handleChangeName = e =>{
        this.setState({Name:e.target.value})
    }
    render(){
        return(
            <div>   

                    <TextField
                                    label="Name"
                                    value={this.state.Name}
                                    onChange={this.handleChangeName}
                                    margin="normal"
                                    variant="outlined"
                    />

                    <Grid container spacing = {3}>
                    {   
                        this.state.pairIDs.map(id => (
                            <div key = {id}>
                                
                                
                                <Grid item lg={6}>
                                <TextField
                                    label={"Key "+ (id+1)}
                                    value={this.state.Key[id]}
                                    onChange={this.handleChangeKey(id)}
                                    margin="normal"
                                    variant="outlined"
                                />
                                </Grid>

                                <Grid item lg={6}>
                                    <TextField
                                        select
                                        variant="outlined"
                                        label={"Value "+(id+1)}
                                        value={this.state.Value[id]}
                                        onChange={this.handleChangeValue(id)}
                                    >
                                        {this.valueNames.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </div>
                    ))
                    }
                    </Grid>
                    
                    <Fab color="primary" aria-label="add" onClick={this.addPairNum} >
                        <AddIcon />
                    </Fab>
                    <Button variant="contained" color="primary" onClick={this.sendModel}>
                        Primary
                    </Button>
                
                </div>
        )
    }
        
    

}

export default PageAdd;