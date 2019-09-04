import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles, Divider } from '@material-ui/core';
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
        this.sendData = this.sendData.bind(this)
        this.state = {
            key     :   [],
            value   :   [],
            name    :   "",
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

    sendData = () =>{
        const servicesURL   =   "http://localhost:3030/services";
        const dataURL       =   "http://localhost:3030/data"
        const data  =   {
            keys   :    this.state.key,
            values :    this.state.value,
            name   :    this.state.name
        };


        this.setState({
            keys    :   [],
            values  :   [],
            name    :   "",
            pairNum :   0,
            pairIDs :   []
        })
        axios.post(servicesURL, data)
        axios.post(dataURL, data)
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
            var currentArray = this.state.key;
            currentArray[id] = currentKey;
            this.setState({key:currentArray})
      };

    handleChangeValue = id =>event => {
        var currentValue = event.target.value;
        var currentArray = this.state.value;
        currentArray[id] = currentValue;
        this.setState({value:currentArray})
  };
    handleChangeName = e =>{
        this.setState({name:e.target.value})
    }
    
    render(){
        const {classes} = this.props;
        return(
            <div>   

                    <TextField
                                    label="Name of New Service"
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.name}
                    />
                    <Fab className={classes.add} color="primary" aria-label="add" onClick={this.addPairNum} >
                        <AddIcon />
                    </Fab>
                    {
                        this.state.pairNum > 0 ? <Fab className={classes.add} color="primary" aria-label="remove" onClick={this.minusPairNum} ><RemoveIcon /></Fab> : <div/>
                    }
                    <Divider/>
                    <Grid container spacing = {3}>
                    {   
                        this.state.pairIDs.map(id => (
                            <div key = {id}>
                                <Grid item xs={6}>
                                <TextField
                                    label={"Key "+ (id+1)}
                                    value={this.state.key[id]}
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
                                        value={this.state.value[id]}
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
                                <Divider/>
                            </div>
                    ))
                    }
                   
                    </Grid>
                    
                  
                    <br/>
                    <Button className={classes.send} variant="contained" color="primary" onClick={this.sendData}>
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