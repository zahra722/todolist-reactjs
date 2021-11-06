import { Typography,Box, Grid ,TextField , Button } from "@mui/material"
import { deepPurple,green  } from "@mui/material/colors"
import List from "../Task/List";
import {  makeStyles } from '@material-ui/core/styles';
import axios  from "axios";
import { useState } from "react";

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

const Home = () =>{
    const classes = useStyles();
    const [student, setStudent] = useState({
        stuname: "",
        email: ""
    });
    const [status, setStatus] = useState();

    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        
    }
    async function onFormSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`http://localhost:3333/students`, student)
            setStatus(true);
         
        }catch(error){
            console.log("404")
        }

    }
    if(status){
        return <Home/>
    }
    return(
        <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
            <Typography variant="h2">Todo-list</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                    <Typography variant="h4">Add Task</Typography>

                </Box>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="stuname" name="stuname"
                            variant="outlined" required fullWidth id="stuname" label="name" 
                            onChange={e => onTextFieldChange(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" name="email"
                            variant="outlined" required fullWidth id="email" label="email"
                            onChange={e => onTextFieldChange(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit" variant="contained" color="primary" fullWidth onClick={e =>onFormSubmit(e)}>Add</Button>

                    </Box>

                </form>
            </Grid>
            <Grid item md={6} xs={12}>
                <List/>
                

                
</Grid>


        </Grid>
        </>
    )
}

export default Home