import { Button, CardActions, CardContent, CardHeader, Dialog, Icon, IconButton, TextField, Card } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'
import ApiService from '../Services/ApiService'


export default class AddComputer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            dialog: false
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleTextField = this.handleTextField.bind(this)
        this.addComputer = this.addComputer.bind(this)
    }

    addComputer(){
        ApiService.post('/api/computers/', {name: this.state.name})
        .then(({data}) => {
            data.computer.attributions = (data.computer.attributions) ? data.computer.attributions : []
            this.props.pushComputer(data.computer)
            this.setState({ dialog: false })
        }).catch(err => {
            console.log(err);
        })
    }

    handleOpen(){
        this.setState({
            dialog: !this.state.dialog
        })
    }

    handleTextField(event){
        this.setState({
            name: event.target.value
        })
    }

    render(){
        return(
            <div>
                <IconButton onClick={this.handleOpen} edge="end" aria-label="delete"><Icon  sx={{ color: green[500] }}>add</Icon></IconButton>
                <Dialog open={this.state.dialog} onClose={this.handleOpen}>
                    <Card style={{minWidth: '500px'}}>
                        <CardHeader title="Ajout d'un ordinateur" style={{backgroundColor: '#09151E', color: '#FFFF'}}/>
                        <CardContent >
                            <TextField value={this.state.name} onChange={this.handleTextField} style={{width: '100%'}} id="standard-basic" label="Nom de l'ordinateur" variant="standard" /> 
                        </CardContent>
                        <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                            <Button  variant="outlined" color="success"  onClick={this.addComputer} style={{width: '50%'}}>
                                Ajouter
                            </Button>
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        )

    }
}