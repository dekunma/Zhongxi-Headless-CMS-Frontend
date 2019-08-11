import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    card: {
        maxWidth: 400,
        maxHeight: 400,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      white:{
          color:'rgba(255,255,255,0.5)',
      }
  });

class pageManage extends React.Component{
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            names       :   [],
            keys        :   [],
            values      :   []
        }
    }

    getData(){
        const URL = "http://localhost:3030/models";
        axios.get(URL)
        .then(response => {
            var nameArray   =   [];
            var keyArray   =   [];
            var valueArray  =   [];
            for(var ii=0; ii<response.data.data.length; ii++){
                nameArray.push(response.data.data[ii].Name);
                keyArray.push(response.data.data[ii].Keys);
                valueArray.push(response.data.data[ii].Values);
            }
            
            this.setState({
                names       :   nameArray,
                keys        :   keyArray,
                values      :   valueArray
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    componentWillMount(){
        this.getData();       
    }
    render(){
        const { classes }   =   this.props;
        var idCounter       =   0;
        return(
            <Grid container spacing={5}>
                
                {this.state.names.map(name => (
                    <Grid item xs={12} >
                        <Card key = {this.state.idCounter} className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Name:
                                </Typography>
                                <Typography variant="h5" component="h2">
                                {name}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        
                                        <Typography className={classes.pos} color="textSecondary">Keys:</Typography>
                                        <Typography variant="body2" component="p">
                                        <ul>
                                            {this.state.keys[idCounter].map(key=>(<li>{key}</li>))}
                                        </ul>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        
                                        <Typography className={classes.pos} color="textSecondary">Value Type:</Typography>
                                        <Typography variant="body2" component="p">
                                        <ul>
                                            {this.state.values[idCounter].map(value=>(<li>{value}</li>))}
                                        </ul>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            
                                
                            </CardContent>
                            <CardActions>
                                <Button size="small">Manage</Button>
                            </CardActions>
                            <div className={classes.white}>{idCounter++}</div>
                        </Card>
                    </Grid>
                ))}
                
            </Grid>
            
        )
    }


}

pageManage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(pageManage);

