import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '60px',
    marginBottom: '50px',
    position: 'fixed',
    width: '100%',
    justifyContent: 'flex-end',
    minWidth: '830px',
    marginLeft: '-20px',

    "&::after": {
      position: "absolute",
      content: '""',
      width: "10px",
      height: "60px",
      top: "48px",
      backgroundColor: 'white',
      marginLeft: '-5px',

      [theme.breakpoints.down("xs")]: {
        left: "0px"
      },
      "@media (orientation: landscape)": {
        left: "0px"
      },
      [theme.breakpoints.up("sm")]: {
        left: "0px",
        top: '0px'
      }
    }
    
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    //marginRight: '-120px'
  },
  profile: {
    display: 'flex',
    marginRight: '250px',
    alignItems: 'center'
  },
  notifications: {
    marginRight: '10px'
  },



}));