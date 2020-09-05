import React, {useEffect} from 'react'
import {getAllUsers} from '../flux/actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer, TableHead ,TableRow ,Paper,Avatar} from '@material-ui/core';
import {connect} from 'react-redux'


const useStyles = makeStyles({
    table: {
      width: 200
    },
  });

function Users({getAllUsers,user}) {
    const classes = useStyles();
    const {allUsers} = user
    useEffect(() => {
        getAllUsers()

            
      }   , [getAllUsers])






    return(
        <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Profile Pic</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row">
                <Avatar/>
              </TableCell>
              <TableCell component="th" scope="row">
               <a href={`/user/${user._id}`}> {user.name}</a>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    user: state.user

  
  })
  
  export default connect(mapStateToProps, {getAllUsers})(Users)