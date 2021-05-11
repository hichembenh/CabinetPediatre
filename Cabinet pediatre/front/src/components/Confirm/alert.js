import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme =>({
    root:{
        top:theme.spacing(11)
    }
}))

export default function AlertNotification(props){
    const { notify,setNotify} = props;
    const classes = useStyle()
    const handleClose = ()=>{
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return(
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical:'top',
                horizontal:'right'
            }}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}