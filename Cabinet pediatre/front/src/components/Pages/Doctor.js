import React from 'react'
import {Button, Card, CardActions, CardContent, Container, Grid, Typography} from "@material-ui/core";
import useStyles from './style'
import UsersTable from '../Table/UsersTable'
import Kids from "../Posts/Kids";


const Doctor = () =>{
    const classes = useStyles()

    return(
        <>
            <Container>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <Grid item>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Vous avez 5 rendez-vous aujourd'hui
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Consulter le calendrier</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Votre dernier rendez-vous pour aujourd'hui est a 16h
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Les vaccins
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
                <UsersTable/>
                <Kids/>
            </Container>
        </>
    )
}

export default Doctor