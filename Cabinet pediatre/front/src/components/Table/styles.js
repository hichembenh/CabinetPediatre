import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const useStyles = makeStyles((theme)=>({
    table: {
        minWidth: 500,
        marginTop: '2%'
    },
    input:{
        paddingRight:'10%',
        marginLeft:'70%',
        marginTop:'1%'
    },
    paper: {
        marginLeft:'33%',
        marginTop:'5%'
    },
}));
export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);