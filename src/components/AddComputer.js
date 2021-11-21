import React from "react";
import axios from "axios";

import { green, red } from '@mui/material/colors';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, Button, IconButton, Icon } from '@mui/material';


export default class Computer extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            dialog: false,
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
    }

    handleClickOpen(){
        this.setState({
            dialog: !this.state.dialog
        })
    }

    render(){
        return(
            <div>
                <IconButton onClick={this.handleClickOpen} edge="end" aria-label="delete"><Icon  sx={{ color: green[500] }}>add_circle</Icon></IconButton>
                <Dialog open={this.state.dialog} onClose={this.handleClickOpen}>
                    <DialogTitle>
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}