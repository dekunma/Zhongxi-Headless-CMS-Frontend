import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import PageAdd from './pageAdd';
import BuildIcon from '@material-ui/icons/Build';
import PageManage from './pageManage';
import Login from './Login';
import client from './feathers'
import { BrowserRouter, Route, Link } from 'react-router-dom'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        open: false,
        page: "Manage"
      };
  }
  componentDidMount(){
    client.authenticate().catch(() => this.setState({ login: null }));
    try {
      // First try to log in with an existing JWT
     client.reAuthenticate();
     this.setState({login:true})
    } catch (error) {
      // If that errors, log in with email/password
      // Here we would normally show a login page
      // to get the login information
      this.setState({login:false})
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    if(this.state.login === undefined) {
        return <main className="container text-center">
          <h1>Loading...</h1>
        </main>;
      } else if(this.state.login) {
        return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar disableGutters={!open}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" noWrap>
                  Headless CMS | Beta
                  </Typography>
                </Toolbar>
              </AppBar>
              <BrowserRouter>
                <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                      <List>
                        <Link to="add">
                          <ListItem button key='1' as={Link} to="add" name="PageAdd">
                            <ListItemIcon><AddIcon/></ListItemIcon>
                            <ListItemText primary="Add a New Service" />
                          </ListItem>
                        </Link>
                      </List>
                      <Divider />
                      <List>
                        <Link to="manage">
                          <ListItem button key='2' as={Link} to="manage" name="PageManage" >
                            <ListItemIcon><BuildIcon/></ListItemIcon>
                            <ListItemText primary="Manage All Services" />
                          </ListItem>
                        </Link>
                      </List>
                </Drawer>
              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <div className={classes.drawerHeader} />
                <Route path = "/add" exact={true} component={PageAdd} />
                <Route path = "/manage" exact={true} component={PageManage} />
              </main>
              </BrowserRouter>
            </div>
          );
      }
      return <Login />;
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainPage);