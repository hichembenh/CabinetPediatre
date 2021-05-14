import React, {useState} from 'react';
import {CircularProgress, Paper} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Kid from './Post/Kid';
import useStyles from './styles';

const Kids = ({ setCurrentId }) => {
    const [search,setSearch] = useState('')
    const kids = useSelector((state) => state.kids);
    const classes = useStyles();
    const myKids = kids.filter(kid =>{
        if (kid.parent === localStorage.getItem('userId')) return kid
    })

    return (
        !kids.length ? <CircularProgress /> : (
            <>
                <div>
                    <label htmlFor="search" className='form-label'>
                        <input
                            id="search"
                            type="text"
                            placeholder="Chercher par nom"
                            onChange={(event)=>{
                                setSearch(event.target.value)
                            }}
                            className={classes.input}
                        />

                    </label>
                </div>
            <Paper className={classes.container} elevation={0} spacing={3}>
                {myKids.filter((val)=>{
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
                    ))}
            </Paper>
            </>
        )
    );
};

export default Kids;
