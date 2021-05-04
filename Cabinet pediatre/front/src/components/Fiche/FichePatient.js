import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import useStyles from "./styles";

 const SimplePaper= ()=> {
//    const classes = useStyles();

    return (
        <div className={}>
            <Paper elevation={0} />
            <Paper />
            <Paper elevation={1} />
        </div>
    );
}

export default SimplePaper