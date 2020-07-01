import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
// import TextField from '@material-ui/core/TextField'
import BackImage from '../img/BackgroundImageForBusBooking.jpg';
// import SearchLocationInput from './smartSearch';
import { Link } from 'react-router-dom';
import {HeaderUser} from './HeaderUser';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import axios from 'axios';
import {Config} from '../utils/Config';
import {useState,useEffect} from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingTop: "150px"
  },
  divStyle: {
    width: '100%',
    height: '800px',
    backgroundImage: `url(${BackImage})`,
    backgroundSize: 'cover'
  }
});

export default function BusBooking(props) {
  const [addresses,setAddresses]=useState([])
  useEffect(()=>{
    // const result=await axios.post(Config.BASEURL+Config.FINDSTOP);
    // console.log(result.data);
    // setAddresses(result.data);
    // console.log(addresses);
    console.log(addresses);
    axios.post(Config.BASEURL+Config.FINDSTOP)
    .then(data=>{
      console.log(data.data);
      setAddresses(data.data);
      // console.log(addresses);
    })
  },[])
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
    <div>
      <HeaderUser/>
    </div>
    <div className={classes.divStyle}>

      <Grid container className={classes.gridContainer}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Enter Start And End Location
            </Typography>
            <Grid container spacing={4} >
              <Grid item sm>
                {/* <SearchLocationInput placeholder="PickUpLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }}>
                  <TextField id="startLocation" label="PickUp" onChange={props.takeInput} />
                </SearchLocationInput> */}
                <select id='startLocation'  className='form-control' onChange={props.takeInput} >
                  {
                    addresses.map((ele,index)=>{
                    return(<option key={index}>{ele.address}</option>)
                    })
                  }
                 </select>
              </Grid>
              <Grid item sm>
                {/* <SearchLocationInput placeholder="endLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }} > */}
                  {/* <TextField id="endLocation" label="Drop" onChange={props.takeInput} /> */}
                {/* </SearchLocationInput> */}
                <select id='endLocation'  className='form-control' onChange={props.takeInput}>
                  {
                    addresses.map((ele,index)=>{
                    return(<option key={index}>{ele.address}</option>)
                    })
                  }
                 </select>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => { props.findBuses() }} >
            {/* onClick={() => { props.findBuses() }} */}
              {/* <p><Link to="/showbuses">Find Buses</Link></p> */}
              {/* /ticketdisplay */}
              Find Buses
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
    </>
  );
}

// export default class BusBooking extends Component{
//   constructor(props){
//     super(props);
//     this.takeInput=this.takeInput.bind(this);
//     this.findBuses=this.findBuses.bind(this);
//     this.inputs={};
//     this.addresses=[];
//     this.availableBuses={};
//   }
//   takeInput(event){
//     var key=event.target.id;
//     var val=event.target.value;
//     this.input[key]=val;
//   }
//   findBuses() {
//     var objStartEnd = { "startLocation": this.inputs['startLocation'], "endLocation": this.inputs['endLocation'] };
//     console.log(this.inputs);
//     console.log(objStartEnd);
//     this.availableBuses = [{ seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }];
//     //availableBusesDisplay(availableBuses);
//     // axios.post(Config.BASEURL + Config.FINDBUSES,objStartEnd)
//     // .then(data=>console.log("Data recevied"))
//     // .catch(err=>console.log("Error occured",err))
// }

//   componentDidMount(){
//     axios.post(Config.BASEURL+Config.FINDSTOP)
//     .then(data=>{
//       this.addresses=data.data;
//       console.log(this.addresses);
//       this.dispalyConsole();
//     })
//   }
//   dispalyConsole(){
//     for(let i=0;i<this.addresses.length;i++){
//       console.log(this.addresses[i].address);
//     }
//   }
//   render(){
//     return (
//       <>
//       <div>
//         <HeaderUser/>
//       </div>
//       <div className={useStyles.divStyle}>
 
  
//         <Grid container className={useStyles.gridContainer}>
//           <Card className={useStyles.root} variant="outlined">
//             <CardContent>
//               <Typography className={useStyles.title} color="textSecondary" gutterBottom>
//                 Enter Start And End Location
//       </Typography>
//               <Grid container spacing={4} >
//                 <Grid item sm>
//                   {/* <SearchLocationInput placeholder="PickUpLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }}> */}
//                     {/* <TextField id="startLocation" label="PickUp"  /> */}
//                     <select id='pickup'  className='form-control' onChange={this.takeInput}>
//                       {
//                         this.addresses.map((ele,index)=>{
//                         return(<option key={index}>{ele.address}</option>)
//                         })
//                       }
//                 </select>
//                   {/* </SearchLocationInput> */}
//                 </Grid>
//                 <Grid item sm>
//                   {/* <SearchLocationInput placeholder="endLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }} > */}
//                     {/* <TextField id="endLocation" label="Drop"  /> */}
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="drop"
//                       onChange={this.takeInput}
//                       // value={age}
//                       // onChange={handleChange}
//                     >
//                       {
//                         this.addresses.map((ele,index)=>{
//                         return(<MenuItem key={index}>{ele.address}</MenuItem>)
//                         })
//                       }
//                     {/* <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem> */}
//                   </Select>
//                   {/* </SearchLocationInput> */}
//                 </Grid>
//               </Grid>
//             </CardContent>
//             <CardActions>
//               <Button size="small"  onClick={()=>{this.findBuses()}}>
//                 <p><Link to="/showbuses">Find Buses</Link></p>
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </div>
//       </>
//     );
//   }
// }