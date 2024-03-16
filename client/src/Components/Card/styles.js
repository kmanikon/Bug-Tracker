import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({


  projectInfo: {
    marginLeft: '20px',
    backgroundColor: '#D6EAF8',
    minHeight: '40px',
    paddingTop: '15px',
    //marginRight: '20px',
    width: 'calc(93% - 20px)'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 'large',
    paddingTop: '10px',
    paddingLeft: '20px',
    //fontWeight: 'bold',
  },

  
  titleRight: {
    
    fontWeight: 'bold',
    fontSize: 'large',
    paddingTop: '10px',
    //paddingLeft: '20px',
    
    marginLeft: '45%',
    //fontWeight: 'bold',
  },
  

  subTitle: {
    fontSize: 'large',
    paddingTop: '10px',
    paddingLeft: '20px',
  },

  
  subTitleRight: {
    //fontWeight: 'bold',
    fontSize: 'large',
    paddingTop: '10px',
    //paddingLeft: '20px',
    marginLeft: '45%'
  },
  

  description: {
    marginLeft: '50vh'
  },

  headerCard: {
    marginLeft: '20px',
    width: 'calc(93% - 20px)'
  }




}));