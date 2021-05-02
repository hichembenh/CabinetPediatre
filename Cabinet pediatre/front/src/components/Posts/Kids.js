import React from 'react';
import {CircularProgress, Paper} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Kid from './Post/Kid';
import useStyles from './styles';

const Kids = ({ setCurrentId }) => {
    const kids = useSelector((state) => state.kids);
    const classes = useStyles();

    return (
        !kids.length ? <CircularProgress /> : (
            <Paper className={classes.container} spacing={3}>
                {kids.map((kid) => (
                    <Paper key={kid._id} xs={12} sm={6} md={6} spacing={3}>
                        <Kid kid={kid} setCurrentId={setCurrentId} />
                    </Paper>
                ))}
            </Paper>
        )
    );
};

export default Kids;
