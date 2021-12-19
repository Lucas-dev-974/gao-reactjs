import React from "react";

import { Card, CardHeader, CardContent, ListItem, IconButton, ListItemText, Icon } from '@mui/material';
import { red } from '@mui/material/colors';

import AddAttribution from './AddAttribution'
import ConfirmDelete from "./ConfirmDelete"
import ApiService from '../Services/ApiService'

export default class Computer extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            attributions: [],
            computer: this.props.computer,
            date: this.props.date,
            horraires: [],
            listView: null
        }

        this.buildAttributions = this.buildAttributions.bind(this)
        this.buildHours        = this.buildHours.bind(this)
        this.pushAttribution   = this.pushAttribution.bind(this)
        this.removeAttribitution = this.removeAttribitution.bind(this)
    }
    
    componentDidMount(){
        this.buildAttributions()
    }

    async buildAttributions(){
        console.log('in build attributions: ', this.state.computer.attributions);
        this.state.computer.attributions.forEach(async attribution => {
            if(!isNaN(attribution.horraire)){
                let horraire = parseInt(attribution.horraire)
                this.state.attributions[horraire] = {
                    id:     attribution.id,
                    client: attribution.client.name
                }
            }
        })
        // console.log(this.state.attributions);
        this.buildHours()
    }

    pushAttribution(attribution){
        this.setState(prevState => ({
            computer:{
                ...prevState.computer,
                attributions: [...this.state.computer.attributions, attribution]
            } 
        }))
        this.buildAttributions()
    }

    removeAttribitution(attribution){
        console.log(this.state.computer.attributions);
        ApiService.delete('/api/attributions/' + attribution.id)
        .then( async (data) => {
            

            new Promise((resolve, reject) => {
                let attributions = this.state.attributions.filter(attr => {
                    if(attribution.id != attr.id) return attr
                })

                resolve(attributions)
            }).then((data) => {
                console.log('in promise');
                console.log(data);
                // this.setState(prevState => ({
                //     computer: {
                //         ...prevState.computer,
                //         attributions: data
                //     }
                // }))

                this.setState({
                    attributions: data
                })
                this.buildAttributions()
            })
        })
    }

    async buildHours(){
        console.log('in build houres');
        console.log(this.state.attributions)
        let horraires = []
        for(let i = 0; i < 11; i++){
            horraires.push({
                index: i + 8,
                attribution: (typeof this.state.attributions[i + 8] !== 'undefined') ? this.state.attributions[i + 8] : false
            })
        }
        await this.setState({ horraires: horraires })
        this.renderAttributionsList()
    }

    // -----------  RENDER FUNCTIONS -------------

    renderAttributionsList(){
        let horraires = null
        console.log('in render list');
        console.log(this.state.horraires);
        if(this.state.horraires.length > 0){
            horraires = this.state.horraires.map((horraire) => {
                return (
                    <ListItem  key={horraire.index} secondaryAction={this.ItemListIcon(horraire)}>
                        {this.ItemListView(horraire)}
                    </ListItem>
                )
            })
        }
        
        this.setState({ listView: horraires })
        this.forceUpdate()
    }

    ItemListView(horraire){
        if(horraire.attribution !== false) return <ListItemText >{horraire.index + 'H'} {horraire.attribution.client}</ListItemText>  
        else return <ListItemText primary={horraire.index}  />
    }

    ItemListIcon(horraire){
        if(horraire.attribution == false) return <AddAttribution computer={this.state.computer} date={this.state.date} horraire={horraire} pushAttribution={this.pushAttribution}></AddAttribution>
        else return <IconButton edge="end" onClick={() => this.removeAttribitution(horraire.attribution)} aria-label="delete"><Icon sx={{ color: red[500] }}>remove</Icon></IconButton>    
    }

    render(){
        return(
            <Card  sx={{minWidth: '300px'}} md={{minWidth: '400px'}} key={this.state.computer.id}>
                <CardHeader className="bg-dark" title={this.state.computer.name} 
                    action={
                        <ConfirmDelete url='/api/computers/'  id={this.props.computer.id} removeComputer={this.props.removeComputer} />
                    }
                />

                <CardContent>
                    {this.state.listView}
                </CardContent>
            </Card>
        )
    }
}