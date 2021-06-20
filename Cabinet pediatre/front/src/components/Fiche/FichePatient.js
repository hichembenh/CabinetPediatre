import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles, {getModalStyle} from "./styles";
import {Checkbox, FormControl, Grid, Modal, TextField} from "@material-ui/core";
import {updateKid} from "../../actions/kids";
import {useDispatch} from "react-redux";
import AlertNotification from "../Confirm/alert";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {StyledTableCell, StyledTableRow} from "../Table/styles";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment/moment";
import 'moment/locale/fr'
import {updateKidVaccin} from "../../api";
import {createOrd, deleteOrd} from "../../actions/ordonnance";
import {OrdonnancePdf} from "../Pdf/PatientPdf";
import {PDFViewer} from '@react-pdf/renderer';


export default function ImgMediaCard({kid}) {
    const [modifier, setModifier] = useState(false)
    const [activeOrdonance, setActiveOrdonance] = useState()
    const [newKid, setNewKid] = useState(kid)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: ''
    })
    const [vaccins, setVaccins] = useState(kid.vaccins)
    console.log(vaccins)

    const [openPDF, setOpenPDF] = React.useState(false);

    const myOrds = kid.ordonnances
    console.log(kid.ordonnances)
    const dispatch = useDispatch()
    console.log(newKid)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [modalStyle] = useState(getModalStyle())
    const classes = useStyles();

    const handleChangeModifier = () => {
        setModifier(!modifier)
    }
    const handleSubmit = () => {
        dispatch(updateKid(newKid._id, newKid));
        setNotify({
            isOpen: true,
            message: 'Fiche patient modifié',
            type: 'success'
        })
    }

    const handleSubmitVacc = (vacc) => {
        dispatch(updateKidVaccin(vacc.id, vacc))
    }

    const handleDeleteOrd = (id) => {
        if (window.confirm('supprimer ?')) {
            console.log(id)
            dispatch(deleteOrd(id))
        }
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
                                        disabled={!modifier}
                                        value={newKid.poid}
                                        onChange={(e) => setNewKid({...newKid, poid: e.target.value})}
                                    />
                                    <TextField
                                        name="lastName"
                                        variant="outlined"
                                        label='Taille'
                                        disabled={!modifier}
                                        value={newKid.taille}
                                        onChange={(e) => setNewKid({...newKid, taille: e.target.value})}
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
                                        {vaccins.map((vaccin) => (
                                            <StyledTableRow key={vaccin.id}>
                                                <StyledTableCell>{vaccin.vaccin.title}</StyledTableCell>
                                                <StyledTableCell>{moment(kid.age).add(vaccin.vaccin.ageDedie, 'M').format("Do MMM YYYY")}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Checkbox
                                                        disabled={!modifier}
                                                        inputProps={{'aria-label': 'disabled checked checkbox'}}
                                                        onChange={(e) => {
                                                            const existantVaciin = vaccins.filter(v => v.id !== vaccin.id)
                                                            setVaccins([...existantVaciin, {
                                                                ...vaccin,
                                                                affected: e.target.value
                                                            }])
                                                        }}
                                                    />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </form>
                        </>
                        {modifier ? (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Enregistrer
                            </Button>
                        ) : null}
                        <Typography variant="h6" color="textPrimary" component="p">
                            Les rendez-vous:{kid.rdvs.map((rdv) => (
                            <Typography variant='h6'
                                        color="textSecondary">{new Date(rdv.dateDebut).toLocaleString()}</Typography>
                        ))}
                        </Typography>
                        <Typography variant='h6' color="textPrimary" component="p">
                            Les ordonnances:
                        </Typography>
                        <Typography>
                            {myOrds.map(ord =>
                                <>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="center"
                                    >
                                        <Typography align={'center'}>Ordonnance crée
                                            le {new Date(ord.createdAt).toLocaleDateString()}</Typography>
                                        <Button color="primary" onClick={() => {
                                            setActiveOrdonance(ord)
                                            setOpenPDF(true)
                                        }}>Imprimer</Button>
                                        <Button color="secondary" onClick={() => {
                                            console.log(ord)
                                            handleDeleteOrd(ord._id)
                                        }}>Supprimer</Button>
                                    </Grid>

                                    <Table>
                                        <TableHead>
                                            <StyledTableCell>Date du traitement</StyledTableCell>
                                            <StyledTableCell>Medicament</StyledTableCell>
                                            <StyledTableCell>Dosage</StyledTableCell>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                ord.traitements.map(trait => {
                                                    return <>
                                                        <StyledTableRow trait={trait.id}>
                                                            <StyledTableCell>{new Date(trait.createdAt).toLocaleString()}</StyledTableCell>
                                                            <StyledTableCell>{trait.med}</StyledTableCell>
                                                            <StyledTableCell>{trait.dosage}</StyledTableCell>
                                                        </StyledTableRow>
                                                    </>
                                                })

                                            }
                                        </TableBody>
                                    </Table>
                                </>)
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {user.result.isAdmin &&
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <Button size="small" color="primary" onClick={handleChangeModifier}>
                            Modifier
                        </Button>
                        <Button size="small" color="primary" onClick={() => {
                            setActiveOrdonance({traitements: []})
                        }}>
                            Ajouter ordonnance
                        </Button>
                    </Grid>
                    }
                </CardActions>
            </Card>
            {
                activeOrdonance &&
                <Modal
                    open={activeOrdonance}
                    onClose={() => {
                        setActiveOrdonance(undefined)
                        setOpenPDF(false)
                    }}
                >
                    {
                        openPDF ?
                            <div style={{overflowY: 'scroll'}}>
                                <Button
                                    onClick={() => {
                                        setActiveOrdonance(undefined)
                                        setOpenPDF(!openPDF)
                                    }}>

                                </Button>
                                <PDFViewer style={{marginLeft: 400, width: 800, height: 1400}}>
                                    <OrdonnancePdf
                                        ordonance={activeOrdonance}
                                    />
                                </PDFViewer>
                            </div>
                            : <OrdonnanceForm ordonance={activeOrdonance} kid={kid}/>
                    }
                </Modal>
            }
            <AlertNotification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
}

const OrdonnanceForm = ({ordonnance, kid}) => {
    const [formTraitements, setFormTraitements] = useState([{
        id: 0,
        med: '',
        dosage: '',
    }])
    console.log(kid)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: ''
    })
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(createOrd({
            kid: kid,
            traitements: formTraitements
        }))
        setNotify({
            isOpen: true,
            message: 'Ordonnance crée',
            type: 'success'
        })

    }


    console.log(formTraitements)


    return <div style={{backgroundColor: "#fff", margin: 100, padding: 20}}>

        <Typography align={'center'}>Ajout d'ordonnance</Typography>
        {formTraitements?.map(trait => {
            return <>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <Grid item>
                        <TextField
                            defaultValue={trait.med}
                            variant="outlined"
                            label='Medicament'
                            value={trait.med || ''}
                            onChange={v => {
                                const newFormTraitements = formTraitements.map(t => {
                                        if (t.id === trait.id) {
                                            return {
                                                ...t, med: v.target.value
                                            }
                                        }
                                        return t
                                    }
                                )
                                setFormTraitements(newFormTraitements)

                            }}
                        /></Grid>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        label='dosage'
                        onChange={v => {
                            const newFormTraitements = formTraitements.map(t => {
                                    if (t.id === trait.id) {
                                        return {
                                            ...t, dosage: v.target.value
                                        }
                                    }
                                    return t
                                }
                            )
                            setFormTraitements(newFormTraitements)
                        }}
                        value={trait.dosage || ''}
                    />
                    </Grid>
                </Grid>

            </>
        })}
        <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{margin:10}}
        >
            <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                    setFormTraitements([...formTraitements, {med: "", dosage: "", id: formTraitements.length}])
                }}>
                Ajouter un medicament
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Enregistrer
            </Button>
        </Grid>
        <AlertNotification
            notify={notify}
            setNotify={setNotify}
        />
    </div>
}
