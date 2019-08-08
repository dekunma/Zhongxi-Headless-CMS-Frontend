import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin:50,
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
  });

class pageManage extends React.Component{
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            names   :   [],
            keys    :   [],
            values  :   []
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
                values      :   valueArray,
                idCounter   :   0,
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
        const { classes } = this.props;
        return(
            <div>
                {this.state.names.map(name => (
                    <Card key = {name} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Model Name:
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {name}
                            </Typography>
                            
                            <Typography className={classes.pos} color="textSecondary">
                            Keys:
                            </Typography>
                            <Typography variant="body2" component="p">
                            
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                            Format:
                            </Typography>
                            <Typography variant="body2" component="p">
                            
                            </Typography>
                            
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                ))}
                
            </div>
        )
    }


}

pageManage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(pageManage);

