import React from 'react'
import { Dialog, IconButton, Container, Icon, Card, CardHeader, CardActions, Button, Grid } from '@mui/material'
import ApiService from '../Services/ApiService'

export default class ConfirmDelete extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dialog: false
        }

        this.handleDialog = this.handleDialog.bind(this)
        this.remove       = this.remove.bind(this)
    }

    handleDialog(){
        this.setState({
            dialog: !this.state.dialog
        })
    }
    
    remove(){
        console.log("remove");
        if(!this.props.url || !this.props.id){
            console.log('Une erreur est survenue');
        }else{
            ApiService.delete(this.props.url + this.props.id)
            .then(({data}) => {
                console.log(data);
                this.props.removeComputer(this.props.id)
            }).catch(err => {
                console.log(err);
            })
        }
    }
    
    render(){
        return(
            <Container>
                <IconButton onClick={this.handleDialog} sx={{color: 'red'}}>
                    <Icon>remove</Icon>
                </IconButton>
                <Dialog open={this.state.dialog} onClose={this.handleDialog}>
                    <Card>
                        <CardHeader title="Confirmé la suppression" />
                        <CardActions>
                            <Grid container justifyContent="space-around">
                                <Button>Annuler</Button>
                                <Button onClick={this.remove}>Supprimer</Button>
                            </Grid>
                        </CardActions>
                    </Card>
                </Dialog>
            </Container>
        )
    }
}