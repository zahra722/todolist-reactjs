import { Typography,Box , TableContainer  ,Table, TableBody , TableCell, TableHead,TableRow, Paper, 
    IconButton , Tooltip } from "@mui/material"
   import { orange  } from "@mui/material/colors"
   import VisibilityIcon from '@mui/icons-material/Visibility';
   import EditIcon from '@mui/icons-material/Edit';
   import DeleteIcon from '@mui/icons-material/Delete';
   import {  makeStyles } from '@material-ui/core/styles';
   import { fontWeight } from "@mui/system";
   import { Link } from "react-router-dom";
   import axios from "axios";
   import { useState,useEffect } from "react";


   const useStyles = makeStyles({
   listColor:{
       backgroundColor: orange[400],
       color: "white"
   },
   tableHeadCell: {
       fontWeight: "bold",
       fontSize:20,
       color: "White"
   },
   
   })



const List = () => {
    const classes = useStyles();
    const [students, setStudents]= useState([]);
    useEffect(()=>{
        async function getAllStudent(){
            try{
                const students = await axios.get("http://localhost:3333/students")
                // console.log(students.data)
                setStudents(students.data);
             
            }catch(error){
                console.log("404")
            }
    
        }
        getAllStudent();

    },[])

    const handleDelete = async id =>{
        await axios.delete(`http://localhost:3333/students/${id}`);
        var newstudent = students.filter((item)=>{
            // console.log(item.id);
            return item.id !==id;
        })
        setStudents(newstudent);
    }

    
    return(
        <>
        <Box textAlign="center" p={2} className={classes.listColor}>
                    <Typography variant="h4">View Details</Typography>

                </Box>
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161"}}>
                            <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>


                        </TableRow>
                    </TableHead>
                    </Table>
                    <TableBody>
                        {
                            students.map((student,i) =>{
                                return(
                                    <TableRow key={i}>
                                    <TableCell align="center">{i+1}</TableCell>
                                    <TableCell align="center">{student.stuname}</TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View">
                                            <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary"/></Link></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton><Link to={`/edit/${student.id}`}><EditIcon/></Link></IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete">
                                            <IconButton onClick={()=> handleDelete(student.id)}><DeleteIcon color="secondary"/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
        
                                </TableRow>
                                )
                            })
                        }
                        
                    </TableBody>

                </TableContainer>

        </>
    )
}


export default List