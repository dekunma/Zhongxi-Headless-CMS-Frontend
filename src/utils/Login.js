import React, { Component } from 'react';
import client from './feathers';
import TextField from '@material-ui/core/TextField';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }


  login() {
    const { email, password } = this.state;

    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
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
            <h1 className="font-100">Log in or signup</h1>
            <p>{this.state.error && this.state.error.message}</p>
            <Divider/>
            <TextField
                                    label={"email"}
                                    onChange={ev => this.updateField('email', ev)}
                                    margin="normal"
                                    variant="outlined"
                                    className="block"
                                    type="email"
                                    name="email"
            />
            <Divider/>
            <TextField
                                    label={"password"}
                                    onChange={ev => this.updateField('password', ev)}
                                    margin="normal"
                                    variant="outlined"
                                    className="block"
                                    type="password"
                                    name="password"
            />
            <Divider/>
            <Button type="button" className="button button-primary block signup" onClick={() => this.login()}>
              Log in
            </Button>
            <Button type="button" className="button button-primary block signup" onClick={() => this.signup()}>
              Sign up
            </Button>
        </div>
    )
  }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login)