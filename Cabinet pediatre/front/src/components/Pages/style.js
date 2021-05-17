import { makeStyles } from '@material-ui/core/styles';

export default makeStyles ( (theme)=>({
    buttons:{
        marginTop:'2%',
    },
    root: {
        marginTop:'5%',
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}))