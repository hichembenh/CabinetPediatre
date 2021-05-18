import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import {getModalStyle} from "./styles";
import {Grid, TextField} from "@material-ui/core";
import {updateKid} from "../../actions/kids";
import {useDispatch} from "react-redux";

export default function ImgMediaCard({kid}) {
    const [modifier,setModifier]= useState(false)
    const [newKid,setNewKid]=useState(kid)
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
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={kid.photo}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {kid.lastName} {kid.name}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        {modifier ? (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <Grid item>
                                        <TextField
                                            name="lastName"
                                            variant="outlined"
                                            label='Poid'
                                            value={newKid.poid}
                                            onChange={(e)=>setNewKid({...newKid, poid: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            name="lastName"
                                            variant="outlined"
                                            label='Taille'
                                            value={newKid.taille}
                                            onChange={(e)=>setNewKid({...newKid, taille: e.target.value})}
                                        />
                                    </Grid>
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
                            <>
                            <Grid item>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    label='Poid'
                                    value={kid.poid}
                                    disabled
                                />
                            </Grid>
                            <Grid item>
                            <TextField
                            name="lastName"
                            variant="outlined"
                            label='Taille'
                            value={kid.taille}
                            disabled
                            />
                            </Grid>
                            </>
                        )}
                    </Grid>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Les rendez-vous:{kid.rdvs.map((rdv)=>(
                        <Typography variant='h6' >{new Date(rdv.dateDebut).toLocaleString()}</Typography>
                    ))}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Les vaccins:
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
        </div>
    );
}
