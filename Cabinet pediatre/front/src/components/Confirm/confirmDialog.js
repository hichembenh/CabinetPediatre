import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";

export default function ConfirmDialog(props){
    const { confirmDialog,setConfirmDialog} = props

    const handleClose = () =>{
        setConfirmDialog(...confirmDialog,confirmDialog.isOpen=false)
    }
    
    return(
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography variant={"h6"}>
                    {confirmDialog.title}
                </Typography>
                <Typography variant={"subtitle2"}>
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Non
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Oui
                </Button>
            </DialogActions>
        </Dialog>
    )
}