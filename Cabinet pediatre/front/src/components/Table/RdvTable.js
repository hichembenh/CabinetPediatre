import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {useStyles,StyledTableCell, StyledTableRow} from './styles'
import {deleteRdv, getRdvs} from "../../actions/rdv";
import AlertNotification from "../Confirm/alert";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CustomizedTables() {
    const [search,setSearch] = useState('')
    const classes = useStyles();
    const rdvs = useSelector((state) => state.rdv)
    const dispatch = useDispatch()
    const user= JSON.parse(localStorage.getItem('profile'))
    const [notify, setNotify] = useState({
        isOpen:false,
        message:'',
        type:''
    })

    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);

    function handleDelete (rdv){
        if (window.confirm('Vous voulez vraiment supprimer ?')) {
            dispatch(deleteRdv(rdv))
            setNotify({
                isOpen: true,
                message: 'rendez-vous supprimé',
                type: 'success'
            })
        }
    }

    console.log(rdvs)

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
                <h2>Table des rendez-vous</h2>
            </div>
            <Table className={classes.table} aria-label="customized table">
                    {user.result.isSec ? (
                        <>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Date du rendez-vous</StyledTableCell>
                                    <StyledTableCell align="left">Nom enfant</StyledTableCell>
                                    <StyledTableCell align="left">Prenom enfant</StyledTableCell>
                                    <StyledTableCell align="left">Prenom parent</StyledTableCell>
                                    <StyledTableCell align="left">Motif</StyledTableCell>
                                    <StyledTableCell align="left">Supprimer</StyledTableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {rdvs.filter((val)=>{
                                if(search === ""){
                                    return val
                                }else if(val.kid.lastName.toLowerCase().includes(search.toLowerCase())){
                                    return val
                                }
                            }).map((rdv) => (
                                <StyledTableRow key={rdv._id}>
                                    <StyledTableCell align="left">
                                        <div>{new Date(rdv.dateDebut).toLocaleString()}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left"><div>{rdv.kid.name}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{rdv.kid.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{rdv.kid.parent.firstName}</div></StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div>{rdv.vaccin ? ("Vaccin"):('Consultation')}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button size="small" color="secondary" onClick={()=>{handleDelete(rdv._id)}}><DeleteIcon fontSize="small" /></Button>
                                    </StyledTableCell>
                                </StyledTableRow>

                            ))}
                        </TableBody>

                        </>
                    ):(
                            <>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Date du rendez-vous</StyledTableCell>
                                    <StyledTableCell align="left">Nom enfant</StyledTableCell>
                                    <StyledTableCell align="left">Prenom enfant</StyledTableCell>
                                    {user.result.isSec &&
                                    <StyledTableCell align="left">Prenom parent</StyledTableCell>
                                    }
                                    <StyledTableCell align="left">Motif</StyledTableCell>
                                    <StyledTableCell align="left">Supprimer</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rdvs.filter(rdv=>{
                                if (rdv.parent===localStorage.getItem('userId')) return rdv
                            }).map((rdv) => (
                                <StyledTableRow key={rdv.dateDebut.toLocaleString()}>
                                    <StyledTableCell align="left">
                                        <div>{new Date(rdv.dateDebut).toLocaleString()}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left"><div>{rdv.kid.name}</div></StyledTableCell>
                                    <StyledTableCell align="left"><div>{rdv.kid.lastName}</div></StyledTableCell>
                                    <StyledTableCell align="left">{rdv.kid.vaccin ? (
                                        <div>Vaccin</div>
                                    ):(<div>Consultation</div>)}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button size="small" color="secondary" onClick={()=>{handleDelete(rdv._id)}}><DeleteIcon fontSize="small" /></Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                            </>
                    )}

            </Table>
            <AlertNotification
                notify={notify}
                setNotify={setNotify}
            />
        </TableContainer>
    );
}

