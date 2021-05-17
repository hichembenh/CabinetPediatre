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

export default function ImgMediaCard({kid}) {
    const [modalStyle] = useState(getModalStyle())
    const classes = useStyles();
    console.log({kid})

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
                        <Grid item>
                            <TextField
                                name="lastName"
                                variant="outlined"
                                label='Poid'
                                value={kid.lastName}
                                disabled
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="lastName"
                                variant="outlined"
                                label='Taille'
                                value={kid.lastName}
                                disabled
                            />
                        </Grid>
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
                <Button size="small" color="primary">
                    Modifier
                </Button>
            </CardActions>
        </Card>
        </div>
    );
}
