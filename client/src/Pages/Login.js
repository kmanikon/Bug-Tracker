import React, { useState, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem, Grid, InputAdornment, IconButton, CircularProgress } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { 
  ContainerOutlined,
  UserOutlined,

        
} 
from '@ant-design/icons';

import url from '../defs';


/*

  login form
    - sign in, sign up, forgot password, demo sign in

*/



const demoUser1 = {
  username: 'Demo Admin',
  email: 'demoEmail1@gmail.com',
  password: 'Password 1'
}

const demoUser2 = {
  username: 'Demo Developer',
  email: 'demoEmail2@gmail.com',
  password: 'Password 2'
}


const Login = ({user, setUser, init, setInit, setTotalNotifications}) => {

  setUser(null);

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //const [admin, setAdmin] = useState(false);
  var admin = false;

  // state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // toggle password visibility
  const handleShowPassword = () => setShowPassword(!showPassword);

  //const [user, setUser] = useState();

  const [loginState, setLoginState] = useState(0);

  const [signUp, setSignUp] = useState(0);

  const [demo, setDemo] = useState(false);


  let navigate = useNavigate(); 
  const routeChange = () =>{ 
      //hangeCount++;
      let path = `/home`; 
      navigate(path)//, //{state:{changeCount: changeCount}});
  }



  const makeAPICallCreateNotif = async (route, post) => {

    await fetch(url + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    .then(response => response.json())
    .then(response => {

        setInit(init + 1);

    })
    .catch((error) => {

    });


}




  const setInitialNotification = async (user) => {

      //const pid = 2;
      var pid = 1;

      if (admin == false){
        pid = 2;
      }
      //var assignedUid = 1;
      
      const post = {

        "actionId": 0, // doesn't matter
        "date": "2023-05-15T07:41:51.053Z", // doesn't matter
        "actionString": "Created Ticket",
        "userName": user.username,
        "userEmail": user.email,
        "userId": user.userId,
        "postId": 0, // doesn't matter
        "title": "Testing Notifications",
        "projectId": pid, // hard coded, user can't delete demo project (id = 2)
        "description": "This ticket you were assigned to got updated!",


        "asignedDev": user.username, //devList[asignedDev][2],
        "asignedDevEmail": user.email, //devList[asignedDev][1],
        "asignedDevUid": user.userId, //devList[asignedDev][0],

        "submitter": user.username,
        "submitterEmail": user.email,
        "submitterUid": user.userId,
        //devList[submitter][2],
        //"submitterEmail": devList[submitter][1],
        //"submitterUid": devList[submitter][0],
        
        "ticketPrio": "High", //prioList[prio],
        "ticketStatus": "closed", //ticketStatus,
        "ticketType": "Other",//ticketTypes[type],
        "ticketNumber": 1,//ticketNumber,

        "submitDate": new Date,//"2023-05-15T07:41:51.053Z", // doesn't matter
        "modifyDate": new Date,//"2023-05-15T07:41:51.053Z", // doesn't matter
        "readString": "0F"
        
      }

      await makeAPICallCreateNotif('create-or-update-post', post)
  }


  const makeAPICallReads = async (route, resuser) => {



    await fetch(url + route, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {

      //setReads(postsFromServer);

      var sum = Object.values(postsFromServer).reduce((acc, value) => acc + value, 0);

      //setTotalNotifications(sum)
      if (sum === 0){
        setInitialNotification(resuser)
        //setTotalNotifications(1);
      }


      
    });

}



  const makeAPICallGetUser = async (route, demo) => {

    setIsLoading(true)
    fetch(url + route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(response => {
        setIsLoading(false)
        localStorage.setItem( 'currentUser', JSON.stringify(response) );
        setUser(response);


        if (demo === 1){
          // create initial notification here
          //setInitialNotification(response)
          makeAPICallReads('get-unread-actions-by-user-id/' + response.userId, response).then(() => {
            
            
            localStorage.setItem( 'currentUser', JSON.stringify(response) );
            setUser(response);
            
            setLoginState(0);
            
            routeChange();
            
          })
        }

        else {
        

        setLoginState(0);
        routeChange();
        }
        
    })
    .catch((error) => {
      setIsLoading(false)
      setLoginState(1);
    });
  }

  const makeAPICallPost = async (route, post) => {




    fetch(url + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    .then(response => response.json())
    .then(response => {
        makeAPICallGetUser('get-user-by-credentials/' + post.email + '/' + post.password, 0)
    })
    .catch((error) => {
      setLoginState(2);
      //setLoginState(1);
    });

  //})
}


const makeAPICallPut = async (route, post) => {




  fetch(url + route, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
  })

  .then(response => response.json())
  .then(response => {
      makeAPICallGetUser('get-user-by-credentials/' + post.email + '/' + post.password, 0)
  })
  .catch((error) => {
    setLoginState(2);
    //setLoginState(1);
  });

//})
}



  const handleSignIn = () => {
    const form = {
      'Email': email,
      'Password': password
    }

    makeAPICallGetUser('get-user-by-credentials/' + email + '/' + password, 0);

  }

  const handleSignInDemoAdmin = () => {
    //setAdmin(true);
    admin = true;
    const form = {
      'Email': demoUser1.email,
      'Password': demoUser1.password
    }

    makeAPICallGetUser('get-user-by-credentials/' + demoUser1.email + '/' + demoUser1.password, 1);

  }

  const handleSignInDemoDev = () => {
    //setAdmin(false);
    admin = false;
    const form = {
      'Email': demoUser2.email,
      'Password': demoUser2.password
    }

    makeAPICallGetUser('get-user-by-credentials/' + demoUser2.email + '/' + demoUser2.password, 1);

  }

  const swapDemo = () => {
    setDemo(!demo);
  }

  const handleSignUp = async () => {
    const form = {
      'userName': username,
      'password': password,
      'email': email,
    }

    
    setIsLoading(true)
    await fetch(url + 'get-user-by-name/' + email + '/' + username, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
     })

    .then(response => response.json())
    .then(response => {
      //handleSignIn();
      setIsLoading(false)
      setLoginState(2);
    })
    .catch(response => {
        setIsLoading(false)
        makeAPICallPost('create-user', form);



    })
    
    //makeAPICallPost('create-user', form);

    
  

  }


  const handleForgotPassword = async () => {

    if (password !== repeatPassword){
      setLoginState(3);
      return
    }
    

    
    
    await fetch(url + 'get-user-by-name/' + email + '/' + username, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
     })

    .then(response => response.json())
    .then(response => {
      //handleSignIn();
      // update here
      const form = {
        'userId': response.userId,
        'userName': username,
        'password': password,
        'email': email,
      }

      makeAPICallPut('update-user', form)
      setLoginState(0);

    })
    .catch(response => {
        //makeAPICallPost('create-user', form);
        setLoginState(2);


    })
    
    //makeAPICallPost('create-user', form);

    
  

  }

  const handleSwap = () => {

    if (signUp == 1){
      setSignUp(0)
    }
    else if (signUp == 0){
      setSignUp(1)
    }
    else {
      setSignUp(0)
    }
    //setSignUp(!signUp);
    setLoginState(0);
  }

  const handleForgot = () => {
    setSignUp(3)
    setLoginState(0)
  }

  const handleForgotReturn = () => {
    setSignUp(0)
    setLoginState(0)
  }



  return (


    
    <div style={{ width: '100%', marginLeft: 0 }}>
      
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>

      <div style={{width: '85%', maxWidth: '450px', height: '400px'}}>

      {demo === false ?

      <>
      <div className={classes.projectInfo} style={{marginLeft: '10px'}}>
          <div className="projectsTitle" style={{textAlign: 'center'}}>{signUp === 1 ? 'Sign Up' : 'Sign In'}</div>
      </div>

      

      <Card className={classes.headerCard} style={{ marginLeft: '10px'}}>
        <div style={{marginLeft: '7.5%', marginTop: '20px'}}>


        {signUp === 1 || signUp === 3 ? 
        
        <TextField id="outlined-basic" variant="outlined" 
          style={{ width: '80%', marginLeft: '5%', marginTop: '10px', marginBottom: '5px'}}
          size="small"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}           
          fullWidth
          label={'Username'}
          required
        />
        :
        null}

        <TextField id="outlined-basic" variant="outlined" 
          style={{ width: '80%', marginLeft: '5%', marginTop: '10px'}}
          size="small"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}           
          fullWidth
          label={'Email'}
          required
        />


        <TextField id="outlined-basic" variant="outlined" 
          style={{ width: '80%', marginLeft: '5%', marginTop: '15px', marginBottom: '20px'}}
          size="small"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}    
          fullWidth
          label={signUp !== 3 ? 'Password' : 'New Password'}
          required    
          type={showPassword === false ? 'Password' : 'Text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword === false ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}   
        />

        {signUp === 3 ? 
        <TextField id="outlined-basic" variant="outlined" 
        style={{ width: '80%', marginLeft: '5%', marginTop: '0px', marginBottom: '20px'}}
        size="small"
        value={repeatPassword} 
        onChange={(e) => setRepeatPassword(e.target.value)}    
        fullWidth
        label={'Repeat Password'}
        required    
        type={showPassword === false ? 'Password' : 'Text'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {showPassword === false ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}   
      />
      :
      null  
      
      }

        

        {signUp === 1 ?
          <Button variant="outlined" style={{
            //width: '300px', 
            width: '80%', marginLeft: '5%',
            textAlign: 'center', 
            //marginLeft: '20px', 
            backgroundColor: '#D6EAF8',
            fontWeight: 'bold'
            }}
            onClick={handleSignUp}
            >
              {isLoading ? 
              <div>
              <CircularProgress size={15}/>
              </div>
              :
              <>
              {signUp === 1 ? 'Sign Up' : 'Sign In'}
              </>
              }
          </Button>
        
        : 

        <>
        {signUp === 3 ? 
        <Button variant="outlined" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          backgroundColor: '#D6EAF8',
          fontWeight: 'bold'
          }}
          onClick={handleForgotPassword}
          >
            {signUp === 1 ? 'Sign Up' : 'Sign In'}
        </Button>
        :
        <Button variant="outlined" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          backgroundColor: '#D6EAF8',
          fontWeight: 'bold'
          }}
          onClick={handleSignIn}
          >
            {signUp === 1 ? 'Sign Up' : 'Sign In'}
        </Button>
        }
        </>
        }

        {loginState === 1 ? 
          <Typography style={{
            width: '80%', marginLeft: '5%',
            textAlign: 'center', 
            //marginLeft: '20px',
            marginTop: '10px'
          }}>
            Incorrect Credentials. Try Again
          </Typography>
        : null}

      {loginState === 2 ? 
          <Typography style={{
            width: '80%', marginLeft: '5%',
            textAlign: 'center', 
            //marginLeft: '20px',
            marginTop: '10px'
          }}>
            Could Not {signUp === 3 ? <>Find</>: <>Create</>} User.
          </Typography>
        : null}

      {loginState === 3 ? 
          <Typography style={{
            width: '80%', marginLeft: '5%',
            textAlign: 'center', 
            //marginLeft: '20px',
            marginTop: '10px'
          }}>
            Passwords Do Not Match.
          </Typography>
        : null}



        {signUp !== 3 ?
        <Button variant="text" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          marginTop: '40px',
          textTransform: 'none',
          transition: 'none', 
          transform: 'none',
          }}
          onClick={() => handleSwap()}
          >
          
            
            {signUp === 0 ? 'Create an account? Sign Up' : 'Existing User? Sign In'}
            
        </Button>
        : 
        null
        }


        {signUp !== 3 ?
        <Button variant="text" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          marginTop: '0px',
          textTransform: 'none',
          transition: 'none', 
          transform: 'none',
          }}
          onClick={handleForgot}
          >
            
            Forgot your Password?
        </Button>
        :
        <Button variant="text" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          marginTop: '40px',
          marginBottom: '20px',
          textTransform: 'none',
          transition: 'none', 
          transform: 'none',
          }}
          onClick={handleForgotReturn}
          >
            
            Go Back
        </Button>
        }

        

        {signUp !== 3 ?
        <Button variant="text" style={{
          width: '80%', marginLeft: '5%',
          textAlign: 'center', 
          //marginLeft: '20px', 
          marginTop: '0px',
          marginBottom: '20px',
          textTransform: 'none',
          transition: 'none', 
          transform: 'none',
          }}
          //onClick={handleSignInDemoAdmin}
          onClick={swapDemo}
          >

              
            Sign in as a Demo User
        </Button>
        :
        null
        }

        {/*LoadingCircle*/}

       
        </div>

      </Card>
      </>

      : 
      
      <>
      <div className={classes.projectInfo} style={{ marginLeft: '10px'}}>
          <div className="projectsTitle" style={{textAlign: 'center'}}>{signUp === 1 ? 'Sign Up' : 'Sign In'}</div>
      </div>

      

      <Card className={classes.headerCard} style={{ marginLeft: '10px'}}>
        <div style={{marginTop: '20px'}}>

        

        <Grid container rowSpacing={1} columnSpacing={1} style={{
            marginLeft: '5%',
            marginTop: '5%',
            height: '75%',
            width: '92%',
            marginRight: '5%'
          }}
        >
        <Grid item xs={6}>
          <Button style={{
            width: '100%', 
            textAlign: 'left',
            height: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'large',
            flex: 0,
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'block',
            paddingTop: '15px',
            whiteSpace: 'nowrap'
          }}
          onClick={handleSignInDemoAdmin}              
          >
    
            <ContainerOutlined style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '90%', marginTop: '20px', color: 'grey'}}>
                Admin
              </div>
              
        </Button>

        </Grid>
        <Grid item xs={6}>
          <Button style={{
            width: '100%', 
            //display: 'block', 
            textAlign: 'left',
             
            //textTransform: 'none',
            height: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'large',

            flex: 0,
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'block',
            paddingTop: '15px',
            whiteSpace: 'nowrap'
          }}     
          onClick={handleSignInDemoDev}                  
          >
    
            <UserOutlined style={{ fontSize: '400%'}}/>
            <div style={{ fontSize: '90%', marginTop: '20px', color: 'grey'}}>
                Developer
            </div>
              
        </Button>

        </Grid>

        
        
      </Grid>



      {isLoading ? 
        <div style={{
          //width: '300px', 
          textAlign: 'center', 
          //marginLeft: '55px', 
          marginTop: '20px',
          marginBottom: '20px',
          textTransform: 'none'
          }}>
            <CircularProgress size={40}/>
        </div>
          :
        <>
            <Button variant="text" style={{
              width: '80%',
            //width: '300px', 
            textAlign: 'center', 
            marginLeft: '10%', 
            marginTop: '20px',
            marginBottom: '20px',
            textTransform: 'none',
            transition: 'none', 
            transform: 'none',
            }}
            //onClick={handleSignInDemoAdmin}
            onClick={swapDemo}
            >

                
              Go Back
          </Button>
        </>
      }

        


       

        </div>
      </Card>
      </>
      
      }




      
      
      </div>


      </div>

      

      
      
    </div>


  )
}

export default Login