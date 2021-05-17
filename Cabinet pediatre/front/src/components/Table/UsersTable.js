import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {useStyles,StyledTableCell, StyledTableRow} from './styles'
import AlertNotification from "../Confirm/alert";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {getUsers} from "../../actions/user";

export default function CustomizedTables() {
    const classes = useStyles();
    const users = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const user= JSON.parse(localStorage.getItem('profile'))
    const [notify, setNotify] = useState({
        isOpen:false,
        message:'',
        type:''
    })

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

/*    function handleDelete (rdv){
        if (window.confirm('Vous voulez vraiment supprimer ?')) {
            dispatch(deleteUser(rdv))
            setNotify({
                isOpen: true,
                message: 'rendez-vous supprimé',
                type: 'success'
            })
        }
    }*/

    console.log(users)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                    <>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Nom de l'utilisateur</StyledTableCell>
                                <StyledTableCell align="left">Prenom de l'utilisateur</StyledTableCell>
                                <StyledTableCell align="left">Nombre enfant</StyledTableCell>
                                <StyledTableCell align="left">Role</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user)=>(
                                <StyledTableRow key={user._id}>
                                    <StyledTableCell align="left"><div>{user.firstName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.kids.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.isSec? 'Secretaire':'Parent'}</div></StyledTableCell>
                                    <StyledTableCell>
                                        <Button size="small" color="secondary" ><DeleteIcon fontSize="small" /></Button>
                                        <Button size="small" color="primary">Sec</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>

                    </>

            </Table>
            <AlertNotification
                notify={notify}
                setNotify={setNotify}
            />
        </TableContainer>
    );
}

/*<StyledTableCell align="left">
    <Button size="small" color="secondary" onClick={()=>{handleDelete(rdv._id)}}><DeleteIcon fontSize="small" /></Button>
</StyledTableCell>*/