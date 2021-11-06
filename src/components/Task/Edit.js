import { Typography,Box, Grid ,TextField , Button } from "@mui/material"
import { deepPurple,green } from "@mui/material/colors"
   import {  makeStyles } from '@material-ui/core/styles';
   import {useState,useEffect} from 'react';
   import { useHistory,useParams } from "react-router";
import axios from "axios";
const useStyles = makeStyles({
    headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
},
addStuColor: {
    backgroundColor: green[400],
    color: "white"
},


})




const Edit = () => {
    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory();
    const [student,setStudent] = useState({
        stuname:"",
        email:""
    });
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
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        
    }
    async function onFormSubmit(e){
        e.preventDefault()
        try{
            await axios.put(`http://localhost:3333/students/${id}`, student)
            history.push('/')
         
        }catch(error){
            console.log("404")
        }

    }function handleClick(){
        history.push("/")
    }
    

    return(
        <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
            <Typography variant="h2">Todo-list</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                    <Typography variant="h4">Edit Task</Typography>

                </Box>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="id" name="id"
                            variant="outlined" required fullWidth id="id" autoFocus value={id}  label="ID" disabled />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="stuname" name="stuname"
                            variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} onChange={e=> onTextFieldChange(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" name="email"
                            variant="outlined" required fullWidth id="email" label="Email" value={student.email} onChange={e=> onTextFieldChange(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=> onFormSubmit(e)}>update</Button>

                    </Box>

                </form>
                <Box m={3} textAlign="center">
                        <Button  variant="contained" color="primary" fullWidth onClick={handleClick}>Back to Home</Button>

                    </Box>


            </Grid>
            


        </Grid>
        </>       
    )
}

export default Edit