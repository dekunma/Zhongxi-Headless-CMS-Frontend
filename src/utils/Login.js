import React, { Component } from 'react';
import client from './feathers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage'
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    title:{
        marginTop:200,
        marginBottom:15,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
          },
    text:{
        textAlign:'center',
        minWidth:250,
        marginBottom:15,
        marginTop:5
    },
    button:{
        minWidth:250,
        marginBottom:15,
        padding:12,
    }

  });


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {messageAppears:false};
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }


  login() {
    const { email, password } = this.state;
    
    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => {this.setState({ error });
                        this.setState({messageAppears:true})
                                        });
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }




  render() {
    const {classes} = this.props;
    return (
        <div>
          <ErrorMessage message={this.state.error && this.state.error.message} handleClick={this.state.messageAppears}></ErrorMessage>
            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4}><h1 className={classes.title}>WELCOME!</h1></Grid>
              <Grid item md={4}></Grid>
            </Grid>
            
            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4} className={classes.text}>
              <TextField
                                    label={"email"}
                                    onChange={ev => this.updateField('email', ev)}
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    className={classes.text}
            />
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
            
            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4} className={classes.text}>
              <TextField
                                    label={"password"}
                                    onChange={ev => this.updateField('password', ev)}
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    className={classes.text}
            />
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>

            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4} className={classes.text}>
                  <Button variant="contained" className={classes.button} color="primary"onClick={() => this.login()}>
                    Log in
                  </Button>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>

            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4} className={classes.text}>
                <Button variant="contained" className={classes.button} color="secondary" onClick={() => this.signup()}>
                Sign up
                </Button>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>

            
        </div>
    )
  }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login)