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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {getUsers, updateUser} from "../../actions/user";
import {getKids} from "../../actions/kids";

export default function CustomizedTables() {
    const [search,setSearch] = useState('')
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
        dispatch(getKids())
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
    function handleChangeSec(user){
        if (window.confirm(`Voulez vous vraiment rendre ${user.firstName} secretaire ?`)) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                numTel: user.numTel,
                email: user.email,
                password: user.password,
                isSec: true
            }
            dispatch(updateUser(user._id, userData))
            console.log(user._id)
            setNotify({
                isOpen: true,
                message: `${user.firstName} est secretaire`,
                type: 'success'
            })
        }
    }

    return (
        <TableContainer component={Paper}>
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
                            {users.filter((val)=>{
                                if(search === ""){
                                    return val
                                }else if(val.firstName.toLowerCase().includes(search.toLowerCase())){
                                    return val
                                }
                            }).map((user)=>(
                                <StyledTableRow key={user._id}>
                                    <StyledTableCell align="left"><div>{user.firstName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.kids.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{user.isSec? 'Secretaire':'Parent'}</div></StyledTableCell>
                                    <StyledTableCell>
                                        <Button size="small" color="secondary" ><DeleteIcon fontSize="small" /></Button>
                                        <Button size="small" color="primary" onClick={()=>handleChangeSec(user)}><HowToRegIcon/></Button>
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