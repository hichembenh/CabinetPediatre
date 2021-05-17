import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    }
}));

export default useStyles
export function getModalStyle() {
    return {
        top: `5%`,
        left: '40%',
        transform: `translate(50}%, 50%)`,
    };
}