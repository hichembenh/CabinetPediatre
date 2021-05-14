import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {getMyRdvs, getRdvs} from "../../actions/rdv";
import {useStyles,StyledTableCell, StyledTableRow} from './styles'
import {useGoogleLogin} from "react-google-login";
import {getKids} from "../../actions/kids";



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



export default function CustomizedTables() {
    const classes = useStyles();
    const rdvs = useSelector((state) => state.rdv)
    const kids = useSelector((state) => state.kids)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);
    console.log(rdvs.filter(rdv=>{
        if (rdv.parent===localStorage.getItem('userId')) return rdv
    }))
    const findKid = () =>{
        const {kid} = kids.filter().map((kid)=>{

        })

        return kid
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Date du rendez-vous</StyledTableCell>
                        <StyledTableCell align="left">Nom enfant</StyledTableCell>
                        <StyledTableCell align="left">Prenom enfant</StyledTableCell>
                        <StyledTableCell align="left">Motif</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rdvs.filter(rdv=>{
                        if (rdv.parent===localStorage.getItem('userId')) return rdv
                    }).map((rdv) => (
                        <StyledTableRow key={rdv.dateDebut.toLocaleString()}>
                            <StyledTableCell align="left">
                                {new Date(rdv.dateDebut).toLocaleString()}
                            </StyledTableCell>
                            <StyledTableCell align="left">{rdv.kid.firstName}{console.log(rdv.kid)}</StyledTableCell>
                            <StyledTableCell align="left">{rdv.kid.lastName}</StyledTableCell>
                            <StyledTableCell align="left">{rdv.vaccin}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}