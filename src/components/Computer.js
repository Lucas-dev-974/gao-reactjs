import React from "react";
import axios from "axios";

import { Card, CardHeader, CardContent, Typography, List, ListItem, IconButton, ListItemText, Icon } from '@mui/material';
import { green, red } from '@mui/material/colors';

import AddComputer from './AddComputer'

export default class Computer extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            attributions: [],
            computer: this.props.computer,
            horraires: [],
            listView: null
        }

        this.buildAttributions = this.buildAttributions.bind(this)
        this.buildHours        = this.buildHours.bind(this)
    }
    
    componentDidMount(){
        this.buildAttributions()
    }

    buildAttributions(){
        this.state.computer.attributions.forEach(attribution => {
            if(!isNaN(attribution.horraire)){
                let horraire = parseInt(attribution.horraire)
                this.state.attributions[horraire] = {
                    id:     attribution.id,
                    client: attribution.client.name
                }
            }
        })
        this.buildHours()
    }

    ItemListView(horraire){
        var ligne;
        if(horraire.attribution !== false){
            ligne = <ListItemText >{horraire.index + 'H'} {horraire.attribution.client}</ListItemText>  
        }else{
            ligne = <ListItemText primary={horraire.index}  />
        }

        return ligne
    }

    ItemListIcon(horraire){
        var icons
        if(horraire.attribution == false){
            // icons = <IconButton edge="end" aria-label="delete"><Icon  sx={{ color: green[500] }}>add_circle</Icon></IconButton>
            icons = <AddComputer ></AddComputer>
        }else{
            icons = <IconButton edge="end" aria-label="delete"><Icon sx={{ color: red[500] }}>remove_circle</Icon></IconButton>
        }

        return icons
    }

    buildListView(){
        var horraires = <Typography>No data</Typography>
        if(this.state.horraires.length > 0){
            horraires = this.state.horraires.map((horraire) => {
                return (
                <ListItem  key={horraire.index} secondaryAction={this.ItemListIcon(horraire)}>
                    {this.ItemListView(horraire)}
                   {/* {if(horraire.attribution != false){<ListItemText primary={horraire.index} secondary={horraire.client} />}} */}
                    
                </ListItem>

                )
            })
        }

        this.state.listView = horraires
        this.forceUpdate()
    }

    buildHours(){
        for(let i = 0; i < 11; i++){
            this.state.horraires.push({
                index: i + 8,
                attribution: (typeof this.state.attributions[i + 8] != 'undefined') ? this.state.attributions[i + 8] : false
            })
        }
        this.buildListView()
        console.log(this.state.horraires);
    }

    render(){
        return(
            <Card sx={{ maxWidth: 345 }} key={this.state.computer.id}>
                <CardHeader title={this.state.computer.name}/>
                <CardContent>
                    <List key={this.state.lisKey}>
                        {this.state.listView}
                    </List>
                </CardContent>
            </Card>
        )
    }
}