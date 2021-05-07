import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    }
}))
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

export function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `2%`,
        left: `20%`,
        transform: `translate(-50}%, -50%)`,
    };
}