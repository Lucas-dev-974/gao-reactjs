import React from "react";
import { green } from '@mui/material/colors';
import {  Dialog, DialogTitle, DialogContent,  Button, IconButton, 
         Icon, TextField, DialogActions, Card, CardHeader, CardContent, CardActions, Autocomplete } from '@mui/material';
import ApiService from "../Services/ApiService";


export default class AddAttribution extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            dialog: false,
            computer: this.props.computer,
            date: this.props.date,
            horraire: this.props.horraire,
            clients: [],
            client: {}

        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.searchClients   = this.searchClients.bind(this)
        this.handleAutoComplete = this.handleAutoComplete.bind(this)
        this.AddAttribution     = this.AddAttribution.bind(this)
    }
 

    handleClickOpen(){
        this.setState({ dialog: !this.state.dialog })
    }

    searchClients(value){
        ApiService.patch('/api/clients/' + value.target.value)
        .then(({data}) => {
            this.setState({
                clients: data.clients
            })
        })
    }

    handleAutoComplete(event, value){
        this.setState({
            client: value
        })
    }

    AddAttribution(){
        if(Object.entries(this.state.client).length > 0){
            let data = {
                clientID: this.state.client.id,
                computerID: this.state.computer.id,
                date: this.state.date,
                horraire: this.state.horraire.index
            }
            ApiService.post('/api/attributions/', data)
            .then(({data}) => {
                console.log(data);
                this.props.pushAttribution(data.attribution)
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <div>
                <IconButton onClick={this.handleClickOpen} edge="end" aria-label="delete"><Icon  sx={{ color: green[500] }}>add</Icon></IconButton>
                <Dialog open={this.state.dialog} onClose={this.handleClickOpen}>
                    <Card style={{minWidth: '400px'}}>
                        <CardHeader title="Ajout d'une attribution" className="bg-dark" />
                        <CardContent>
                            <Autocomplete
                                value={this.state.client}
                                onChange={this.handleAutoComplete}
                                className='w-100'
                                options={this.state.clients}
                                getOptionLabel={(option) => option.name || ""}
                                sx={{ width: 300 }}
                               
                                renderInput={(params) => <TextField {...params} className="w-100" label="Client" variant="standard" onChange={e => this.searchClients(e)}/>}
                                
                            />
                        </CardContent>
                        <CardActions className='w-100' style={{display: "flex", justifyContent: 'center'}}>
                            <Button variant="outlined" className="w-50" color="success" onClick={this.AddAttribution} >
                                Ajouter
                            </Button>
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        )
    }
}