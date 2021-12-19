import React from "react";

import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default class Header extends React.Component{
    render(){
        return(
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: '#09151E'}}>
                    <Toolbar variant="dense" style={{align: 'center'}} >
                        <Typography variant="h6"  style={{ textAlign: "center", width: '100% ' }}>
                        GAO - Gestion D'ordinateur
                        </Typography>
                    </Toolbar>
                </AppBar>                    
            </Grid>
        )
    }
}