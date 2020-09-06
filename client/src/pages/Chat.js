import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getMyChat, setChatWith,addMessage,newMessageOtherUser } from './../flux/actions/chatAction'
import ChatRoom from './ChatRoom'
import './Chat.css'
import socket from './../utils/socket'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer,CssBaseline,List,Typography, Divider, Grid, Avatar,IconButton,ListItem,ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import dayjs from 'dayjs';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
      display:'flex',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



function Chat({auth, chat,getMyChat,setChatWith,newMessageOtherUser }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const chats = chat.allChats
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
   
   
   
    useEffect(() => {    
        getMyChat()
            }, [getMyChat])


    useEffect(() => {
      const socket = require('./../utils/socket').init();
      console.log(socket)
        chats.forEach(async (chat) => { 
                socket.on(chat._id,data =>{
                    if(data.action === "newmessage")
                        newMessageOtherUser(chat._id,data.chat.message)
            })
            
        })
        return () => {
          socket.disconnect()
       }
        
        },[chat.allChats])


        // useEffect(() => {    
        // ,[])


    const renderChatUsers = () =>{
        
        let displayChats = (chats.map((chat, i) => {
        let lastMsg
        let user = chat.user.filter(c => c._id !== auth.user._id)
        if(chat.message)
            lastMsg = chat.message[chat.message.length -1]

  
        return(
            <ListItem button key={chat._id}>
                <Grid  container direction="row" onClick={()=>setChatWith(user[0])}>
                    <Grid container item xs={3} style={{alignItems:'center',display:'flex'}}>
                        <Grid item xs={12} ><Avatar style={{marginRight:'10px'}}/></Grid>
                    </Grid>

                    <Grid container item xs={5}  direction="column">
                        <Grid item xs={12} fontWeight="fontWeightBold"><ListItemText  primary={<Typography >{user[0].name}</Typography>} /></Grid>
                        {lastMsg ? <Grid container item xs={12}><ListItemText primary={<Typography variant="subtitle2" ><b>{lastMsg.text}</b></Typography>} /></Grid> : null}
                    </Grid>
                    <Grid container item xs={4}  direction="column">
                    {lastMsg ?<Grid item xs={12}><ListItemText primary={<Typography variant="caption" >{dayjs(lastMsg.created).format('DD/MM/YYYY')}</Typography>} /></Grid>:null}
                    </Grid>
                    
                </Grid>
            </ListItem>
        )}))

        return displayChats

    }


    const iconBtn = (
      <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      className={clsx(classes.menuButton, open && classes.hide)}
    >
      <MenuIcon />
    </IconButton>
    )
        


    return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
 
            {renderChatUsers()}
          </List> 
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <ChatRoom/>
        </main>
      </div>


    )



 }


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth,
    chat: state.chat

})

export default connect(mapStateToProps, {getMyChat,setChatWith,addMessage,newMessageOtherUser })(Chat)


