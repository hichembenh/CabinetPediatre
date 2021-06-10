import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles,{getModalStyle} from "./styles";
import {Checkbox, Grid, TextField} from "@material-ui/core";
import {updateKid} from "../../actions/kids";
import {useDispatch} from "react-redux";
import AlertNotification from "../Confirm/alert";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {StyledTableCell, StyledTableRow} from "../Table/styles";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment/moment";
import 'moment/locale/fr'

export default function ImgMediaCard({kid}) {
    const [modifier,setModifier]= useState(false)
    const [newKid,setNewKid]=useState(kid)
    const [notify,setNotify] = useState({
        isOpen:false,
        message:'',
        type:''
    })
    const dispatch = useDispatch()
    console.log(newKid)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [modalStyle] = useState(getModalStyle())
    const classes = useStyles();

    const handleChangeModifier = ()=>{
        setModifier(!modifier)
    }
    const handleSubmit=()=>{
        dispatch(updateKid(newKid._id, newKid));
        setNotify({
            isOpen: true,
            message: 'Fiche patient modifié',
            type: 'success'
        })
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={kid.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                    >
                        {kid.lastName} {kid.name}
                    </Typography>
                        {modifier ? (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                label='Poid'
                                                value={newKid.poid}
                                                onChange={(e)=>setNewKid({...newKid, poid: e.target.value})}
                                            />
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                label='Taille'
                                                value={newKid.taille}
                                                onChange={(e)=>setNewKid({...newKid, taille: e.target.value})}
                                            />
                                    </Grid>
                                <Typography variant='h6' color="textPrimary" component="p">
                                    Les vaccins:
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <StyledTableCell>Titre</StyledTableCell>
                                        <StyledTableCell>Date limite</StyledTableCell>
                                        <StyledTableCell>Injecté ?</StyledTableCell>
                                    </TableHead>
                                    <TableBody>
                                        {kid.vaccins.map((vaccin)=>(
                                            <StyledTableRow key={vaccin.id}>
                                                <StyledTableCell>{vaccin.vaccin.title}</StyledTableCell>
                                                <StyledTableCell>{moment(kid.age).lang('fr').add(vaccin.vaccin.ageDedie, 'M').format("Do MMM YYYY")}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Checkbox
                                                            inputProps={{ 'aria-label': 'disabled checked checkbox' }}
                                                            onChange={(e)=>setNewKid({...newKid.vaccins, affected: e.target.value})}
                                                        />
                                                    </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Enregistrer
                                    </Button>
                                </form>
                            </>
                        ):(
                            <form>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="center"
                                >
                                    <TextField
                                        name="lastName"
                                        variant="outlined"
                                        label='Poid'
                                        value={kid.poid}
                                        disabled
                                    />
                                    <TextField
                                    name="lastName"
                                    variant="outlined"
                                    label='Taille'
                                    value={kid.taille}
                                    disabled
                                />
                                </Grid>
                                <Typography variant='h6' color="textPrimary" component="p">
                                    Les vaccins:
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <StyledTableCell>Titre</StyledTableCell>
                                        <StyledTableCell>Date limite</StyledTableCell>
                                        <StyledTableCell>Injecté ?</StyledTableCell>
                                    </TableHead>
                                    <TableBody>
                                        {kid.vaccins.map((vaccin)=>(
                                            <StyledTableRow key={vaccin.id}>
                                                <StyledTableCell>{vaccin.vaccin.title}</StyledTableCell>
                                                <StyledTableCell>{moment(kid.age).lang('fr').add(vaccin.vaccin.ageDedie, 'M').format("Do MMM YYYY")}</StyledTableCell>
                                                {vaccin.affected ? (
                                                    <StyledTableCell>
                                                        <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                                    </StyledTableCell>
                                                ):(
                                                    <StyledTableCell>
                                                        <Checkbox disabled inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                                    </StyledTableCell>
                                                )}
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </form>
                        )}
                    <Typography variant="h6" color="textPrimary" component="p">
                        Les rendez-vous:{kid.rdvs.map((rdv)=>(
                        <Typography variant='h6' color="textSecondary">{new Date(rdv.dateDebut).toLocaleString()}</Typography>
                    ))}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Les notes:
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {user.result.isAdmin &&
                <Button size="small" color="primary" onClick={handleChangeModifier}>
                    Modifier
                </Button>
                }
            </CardActions>
        </Card>
            <AlertNotification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
}
