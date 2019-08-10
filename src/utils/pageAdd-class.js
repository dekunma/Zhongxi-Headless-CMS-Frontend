import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import client from './feathers';
import Feathers from './FeathersModel';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    name:{
        maxWidth:300,
        margin:8,
    },
    keyvalue:{
        margin:20,
        minWidth:100,
    },
    add:{
        margin:10,
    },
    send:{
        margin:10,
    }
  });

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
        {value   :   "String"},
        {value   :   "Number"},
        {value   :   "Boolean"},
        {value   :   "Array"},
    ]

    sendModel = () =>{
        const URL   =   "http://localhost:3030/models"
        const data  =   {
            Keys   :    this.state.Key,
            Values :    this.state.Value,
            Name   :    this.state.Name
        };
        client.use(data.Name, new Feathers());
        this.setState({
            Keys    :   [],
            Values  :   [],
            Name    :   "",
            pairNum :   0,
            pairIDs :   []
        })
        axios.post(URL, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
    }


    addPairNum(){
        this.state.pairIDs.push(this.state.pairNum);
        this.setState({pairNum:this.state.pairNum + 1});
    }

    minusPairNum = ()=>{
        this.setState({pairNum:this.state.pairNum - 1});
        this.state.pairIDs.pop(this.state.pairNum);

    }

    handleChangeKey = id =>event => {
            var currentKey = event.target.value;
            var currentArray = this.state.Key;
            currentArray[id] = currentKey;
            this.setState({Key:currentArray})
      };

    handleChangeValue = id =>event => {
        var currentValue = event.target.value;
        var currentArray = this.state.Value;
        currentArray[id] = currentValue;
        this.setState({Value:currentArray})
  };
    handleChangeName = e =>{
        this.setState({Name:e.target.value})
    }
    
    render(){
        const {classes} = this.props;
        return(
            <div>   

                    <TextField
                                    label="Name of New Service"
                                    value={this.state.Name}
                                    onChange={this.handleChangeName}
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.name}
                    />

                    <Grid container spacing = {3}>
                    {   
                        this.state.pairIDs.map(id => (
                            <div key = {id}>
                                <Grid item xs={6}>
                                <TextField
                                    label={"Key "+ (id+1)}
                                    value={this.state.Key[id]}
                                    onChange={this.handleChangeKey(id)}
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.keyvalue}
                                />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        variant="outlined"
                                        label={"Value "+(id+1)}
                                        value={this.state.Value[id]}
                                        onChange={this.handleChangeValue(id)}
                                        className={classes.keyvalue}
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
                    
                    <Fab className={classes.add} color="primary" aria-label="add" onClick={this.addPairNum} >
                        <AddIcon />
                    </Fab>
                    {
                        this.state.pairNum > 0 ? <Fab className={classes.add} color="primary" aria-label="remove" onClick={this.minusPairNum} ><RemoveIcon /></Fab> : <div/>
                    }
                    <br/>
                    <Button className={classes.send} variant="contained" color="primary" onClick={this.sendModel}>
                        Send Data
                    </Button>
                </div>
        )
    }
}

PageAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PageAdd)