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
    marginTop:'20px',
    width:'500px',
    height:'30px',
    fontSize:'30px',
    paddingLeft:'110px',
    marginLeft:'700px'
  }
}));
