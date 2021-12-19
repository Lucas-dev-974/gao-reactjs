import React from 'react';
import Button       from '@mui/material/Button';
import CssBaseline  from '@mui/material/CssBaseline';
import TextField    from '@mui/material/TextField';
import Box          from '@mui/material/Box';
import Container    from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import APIService from '../../../Services/ApiService'


export default class Login extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            email: '_admin@gmail.com',
            password: 'admin_password',
            theme: createTheme(),
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.LoginFunction     = this.LoginFunction.bind(this)
    }
    
    componentDidMount(){
        console.log('login page');
    }

    handleInputChange(event){
        console.log(event);
        switch(event.target.id){
            case 'password':
                this.setState({password: event.target.value})
                break
            case 'email':
              this.setState({email: event.target.value})
        }
    }


    LoginFunction(){
      APIService.post('/api/auth', {email: this.state.email, password: this.state.password})
      .then(({data}) => {
        window.localStorage.setItem('AccessToken', data.access_token)
        window.location.href = '/'
      }).catch(error => {
        console.log(error);
      })
    }

    render(){
        return(
            <ThemeProvider theme={this.state.theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    onClick={this.LoginFunction}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )
    }
}