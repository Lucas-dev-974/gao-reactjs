import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Computer from '../Computer';
import ApiService from '../../Services/ApiService'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Icon, Stack } from "@mui/material";
import Header from '../AppBar'
import { DatePicker } from "@mui/lab";
import { Container } from "@mui/material";
import AddComputer from '../AddComputer'
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            date: new Date().toISOString().substr(0, 10),
        }

        this.renderComputersList = this.renderComputersList.bind(this)
        this.getComputers      = this.getComputers.bind(this)
        this.handleDateChange  = this.handleDateChange.bind(this)
        this.pushComputer      = this.pushComputer.bind(this)
        this.removeComputer    = this.removeComputer.bind(this)
    }
    
    componentDidMount(){
        this.isUserLogged()
        this.getComputers()
    }

    getComputers(){
        ApiService.get('/api/computers/' + this.state.date)
        .then(({data}) => {
            this.setState({ computers: data.computers })
        }).catch(error => {
            console.log(error.response);
        })
    }

    pushComputer(computer){
        this.setState({
            computers: [...this.state.computers, computer]
        })
    }

    removeComputer(id){
   
        this.setState({ computers: this.state.computers.filter(computer => computer.id !== id) })
    }

    renderComputersList(){
        let date = this.state.date
        let removeComputer = this.removeComputer
        let computers = this.state.computers.map(function(computer) {
            return <Grid key={computer.id} item >  <Computer computer={computer} date={date} removeComputer={removeComputer}></Computer> </Grid>
        })
        return computers
    }

    isUserLogged(){
        if(!window.localStorage.getItem('AccessToken'))  window.location.href = '/login'
        else{
            ApiService.get('/api/auth/')
            .catch(error => { 
                window.location.href = '/login' 
            })
        }
    }

    handleDateChange(date){
        this.setState({ date: date, computers: [] })
        this.getComputers()
    }

    render(){
        return(
            <div>
                <Header />
                <div  className="home-container">
                    <Grid container spacing={4}>
                        <Grid item xs={5} md={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker label="Date" value={this.state.date} onChange={this.handleDateChange} 
                                renderInput={(params) => <TextField  variant="standard" {...params} />} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={1} style={{display: 'flex', marginTop: '15px'}} >
                            <Icon style={{color: '#09151E', paddingTop: '10px', marginLeft: '10px'}}>computer</Icon>
                            <AddComputer pushComputer={this.pushComputer} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}  justifyContent='center' direction="row" style={{marginTop: '20px'}}>
                        { this.renderComputersList() }
                    </Grid>

                </div>

            </div>
        )
    }
}