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
    minWidth: '830px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    marginRight: '250px',
    alignItems: 'center'
  },
  notifications: {
    marginRight: '10px'
  }


}));