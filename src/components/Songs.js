import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Songs() {
    const[name, setName]=useState('')
    const[username, setUsername]=useState('')
    const[password, setPassword]=useState('')
    const handleClick=(e)=>{
        e.preventDefault() 
        const user={name, username, password}
        console.log(user)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("username", username)
        formData.append("password", password)
        fetch("http://localhost:8080/api/myLogin", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log(response))
        // .then(function(response) {
        //   return response.text()
        // }).then(function(text) {
        //     //text is the server's response
        // })
        // .then(()=> {console.log("logged")})
        // .then(()=> {console.log("logged")})
        // .then(()=> {console.log("logged")})
        // .then((response) => response.json())
        // .then(json => console.log(json))
      };

    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      justifyContent="center"
    >
      <div>
      <TextField id="outlined-basic" label="Name" variant="outlined" sx={{width: '50ch'}} value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
      <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} sx={{width: '50ch'}}/>
      </div>
      <div>
      <TextField id="outlined-basic" label="Password" variant="outlined" value={password} sx={{width: '50ch'}} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <Button variant="contained" size="large" onClick={handleClick}>
          Login
        </Button>
    </Box>
    );
}
