import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({


  projectInfo: {
    marginLeft: '20px',
    backgroundColor: '#D6EAF8',
    height: '40px',
    paddingTop: '15px',
    //marginRight: '20px',
    width: '93%',
    minWidth: '0px',
  },

  title: {
    fontWeight: 'bold',
    //fontSize: 'large',
    paddingTop: '10px',
    paddingLeft: '20px',
    //fontWeight: 'bold',
    minWidth: '100px'
  },

  
  titleRight: {
    
    fontWeight: 'bold',
    //fontSize: 'large',
    paddingTop: '10px',
    //paddingLeft: '20px',
    
    marginLeft: '20px',
    //fontWeight: 'bold',
  },
  

  subTitle: {
    //fontSize: 'large',
    paddingTop: '10px',
    paddingLeft: '20px',
    maxWidth: '100%',
  },

  
  subTitleRight: {
    //fontWeight: 'bold',
    //fontSize: 'large',
    paddingTop: '10px',
    //paddingLeft: '20px',
    ///marginLeft: '15%',
    paddingLeft: '20px',
    maxWidth: '75%',

  },
  

  description: {
    marginLeft: '50vh'
  },

  headerCard: {
    marginLeft: '20px',
    width: '93%',
    fontSize: 'large',
    wordBreak: 'break-word'
  }




}));