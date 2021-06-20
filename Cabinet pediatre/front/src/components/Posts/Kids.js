import React, {useState} from 'react';
import {CircularProgress, Container, Grid, Paper} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Kid from './Post/Kid';
import useStyles from './styles';

const Kids = ({ setCurrentId }) => {
    const [search,setSearch] = useState('')
    const kids = useSelector((state) => state.kids);
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles();
    const myKids = kids.filter(kid =>(kid.parent === localStorage.getItem('userId')))


    console.log(kids)
    return (
        !kids.length ? <CircularProgress /> : (
            <>
                <Container>
                    <div>
                        <label htmlFor="search" className={classes.input}>
                            <input
                                type="text"
                                placeholder="Chercher par nom"
                                onChange={(event)=>{
                                    setSearch(event.target.value)
                                }}
                            />

                        </label>
                    </div>
                    <Grid className={classes.container} elevation={0} spacing={1}
                          container
                          direction="row"
                          justify="center"
                          alignItems="center">
                        {user.result.isSec || user.result.isAdmin ? (
                            kids.filter((val)=>{
                                if(search === ""){
                                    return val
                                }else if(val.name.toLowerCase().includes(search.toLowerCase())){
                                    return val
                                }
                            }).map((kid) => (
                                <>
                                    <Grid key={kid._id}
                                          item
                                    >
                                        <Kid kid={kid} setCurrentId={setCurrentId} />
                                    </Grid>
                                </>
                            ))
                        ):(
                            myKids.filter((val)=>{
                                if(search === ""){
                                    return val
                                }else if(val.name.toLowerCase().includes(search.toLowerCase())){
                                    return val
                                }
                            }).map((kid) => (
                                <>
                                    <Paper key={kid._id} spacing={3}>
                                        <Kid kid={kid} setCurrentId={setCurrentId} />
                                    </Paper>
                                </>
                            ))
                        )}
                    </Grid>
                </Container>

            </>
        )
    );
};

export default Kids;
