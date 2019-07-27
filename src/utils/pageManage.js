import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { keys } from '@material-ui/core/styles/createBreakpoints';
class pageManage extends React.Component{
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            names   :   [],
            keys    :   [],
            values  :   []
        }
        // this.useStyles = this.useStyles.bind(this)
    }
    getData(){
        const URL = "http://localhost:3030/models";
        axios.get(URL)
        .then(function (response) {
            console.log(response);
            var nameArray   =   [];
            var keyArrary   =   [];
            var valueArray  =   [];
            for(var ii=0; ii<response.data.data.length; ii++){
                nameArray.push(response.data.data[ii].Name);
                keyArrary.push(response.data.data[ii].Keys);
                valueArray.push(response.data.data[ii].Values);
            }
            this.setState({
                names   :   nameArray,
                keys    :   keyArrary,
                Values  :   valueArray
            })

        })
        .catch(function (response) {
            console.log(response);
        });
    }
    render(){
        return(
            <div>
                pageManage
                <Button variant="contained" onClick = {this.getData}>
                    Default
                </Button>
            </div>
        )
    }
    // useStyles = makeStyles({
    //     card: {
    //       minWidth: 275,
    //     },
    //     bullet: {
    //       display: 'inline-block',
    //       margin: '0 2px',
    //       transform: 'scale(0.8)',
    //     },
    //     title: {
    //       fontSize: 14,
    //     },
    //     pos: {
    //       marginBottom: 12,
    //     },
    //   });
    
    //   classes = this.useStyles();
    //   bull = <span className={this.classes.bullet}>•</span>;

}

export default pageManage;

