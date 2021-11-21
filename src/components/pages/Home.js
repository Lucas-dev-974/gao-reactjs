import React from "react";
import axios from "axios";

import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Computer from '../Computer';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            computers: [
                {id: 1, name: 'Ordinateur 1', attributions: [
                    {id: 1, horraire: 8, client: {id: 1, name: 'test'}}
                ]},
                {id: 2, name: 'Ordinateur 1', attributions: [
                    {id: 1, horraire: 9, client: {id: 1, name: 'test'}}
                ]},
                {id: 3, name: 'Ordinateur 1', attributions: [
                    {id: 1, horraire: 10, client: {id: 1, name: 'test'}}
                ]},
            ],

            date: ''
        }
    }
    
    componentDidMount(){
        this.isLoggedIn()
    }

    initComputers(){
        // console.log(this.state.computers);
        var computers = this.state.computers.map(function(computer){
            return <Grid key={computer.id} item xs={4}>  <Computer computer={computer}></Computer> </Grid>
        })
        return computers
    }

    isLoggedIn(){
        if(!window.localStorage.getItem('AccessToken'))  window.location.href = '/login'
        else{
            axios.get('/api/auth/test-token')
            .then(({data}) => {
                if(!data.success) window.location.href = '/login'
                else{

                }
            })
        }
    }

    render(){
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" component="div"  style={{ align: "center" }}>
                                Scroll to Hide App Bar
                            </Typography>
                        </Toolbar>
                    </AppBar>                    
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        { this.initComputers() }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}