import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {hideAdditionalScreen, renderMainScreen, showAdditionalScreen} from './actions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {ComponentA, ComponentB, ComponentC} from './components';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    grid: {
        height: '100%',
    },
    gridItem: {
        height: '100%',
    },
    paper: {
        height: '100%',
        padding: 20,
        position: 'relative',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        flexGrow: 1,
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0
    }
}));

const components = {
    ComponentA,
    ComponentB,
    ComponentC,
};

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mainScreenComponent = useSelector(state => state.app.mainScreenComponent);
    const additionalScreenComponent = useSelector(state => state.app.additionalScreenComponent);

    function handleClick(event, component) {
        event.preventDefault();

        if (event.type === 'click') {
            dispatch(renderMainScreen(component));
        } else if (event.type === 'contextmenu') {
            dispatch(showAdditionalScreen(component));
        }
    }

    const renderAdditionComponent = () => {
        const ComponentTag = components[additionalScreenComponent];
        return (
            <>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <IconButton
                            aria-label="delete"
                            className={classes.closeBtn}
                            onClick={() => dispatch(hideAdditionalScreen())}>
                            <CloseIcon />
                        </IconButton>
                        <ComponentTag />
                    </Paper>
                </Grid>
            </>
        );
    }
    const renderMainScreenComponent = () => {
        const ComponentTag = components[mainScreenComponent];

        return (
            <Paper className={classes.paper}>
                <ComponentTag />
            </Paper>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        POC App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {Object.keys(components).map((component, index) => {
                            return(
                                <ListItem
                                    button
                                    key={component}
                                    onClick={(e) => handleClick(e, component)}
                                    onContextMenu={(e) => handleClick(e, component)}
                                >
                                    <ListItemText primary={component} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item className={classes.gridItem} xs={additionalScreenComponent ? 7 : 12}>
                        { mainScreenComponent && renderMainScreenComponent()}
                    </Grid>
                    {
                        additionalScreenComponent && renderAdditionComponent()
                    }
                </Grid>
            </main>
        </div>
    );
}

export default App;
