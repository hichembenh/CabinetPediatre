import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  input:{
    margin:'1%',
    height:'30px',
    fontSize:'30px',
    border: '1px solid grey',
    float: "left"
  }
}));
