import React from 'react';
import { Result, Button } from 'antd';
import './HeaderUSer.css';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

export const TicketDisplay=(props)=>{
  console.log("The console is printing in ticket display",props.seatBookingObj);
  //var msg=`Vechileid:${props.seatBookingObj.VehicleID} Price:20`
    return(
        <Result
        status="success"
        title="Successfully Purchased The Bus Ticket"
        extra={[
          <Text>Vehicleid:</Text>,
          <Text>{props.seatBookingObj.VehicleID}</Text>,
          <br/>,
          <Text>Price:20</Text>,
          <br/>,
          <br/>,
          <Button type="primary" key="console" onClick={()=>{props.goBackToDashBoard()}}>
            Go Back To UserDashBoard
          </Button>
          
          // <Button key="buy">Buy Again</Button>,
        ]}
      />
    )
}