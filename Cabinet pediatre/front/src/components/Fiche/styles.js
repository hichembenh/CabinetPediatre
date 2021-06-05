import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
    },
    paper: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        maxHeight: "calc(100vh - 2rem)",
        overflowY: "auto",
        border: '2px solid #000',
        justifyContent: 'center',
        alignItems: 'center',
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
