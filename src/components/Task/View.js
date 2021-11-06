import { Typography,Box , TableContainer  ,Table, TableBody , TableCell, TableHead,TableRow, Paper,Button } from "@mui/material"
   import { orange  } from "@mui/material/colors"
   import { makeStyles } from '@material-ui/core/styles';
   import {useParams, useHistory} from "react-router-dom";
   import {useState, useEffect} from "react";
   import axios from "axios";


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
 


const View = () => {
    const classes = useStyles();
    const {id} = useParams();
    const [student, setStudent] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        async function getStudent(){
            try{
                const student = await axios.get(`http://localhost:3333/students/${id}`)
               
                setStudent(student.data);
             
            }catch(error){
                console.log("404")
            }
        }
        getStudent();

    }, [id])

    
    function handleClick(){
        history.push("/")
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
                            <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>


                        </TableRow>
                    </TableHead>
                    </Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{student.id}</TableCell>
                            <TableCell align="center">{student.stuname}</TableCell>
                            <TableCell align="center">{student.email}</TableCell>
                            <TableCell align="center">
                                
                            </TableCell>

                        </TableRow>
                        
                    </TableBody>

                </TableContainer>
                <Box m={3} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>

                </Box>

        </>
        )
}

export default View