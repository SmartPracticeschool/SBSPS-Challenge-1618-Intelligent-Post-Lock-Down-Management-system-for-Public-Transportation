import React, { Component } from 'react';
import styles from './appStyles.module.css';
import { HeaderUser } from './HeaderUser';
import axios from 'axios';

class RedZone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containmentsAvailability: true,
            districtZoneType: 'Red Zone'
        }
    }

    // getToken(){
    //     axios.post({
    //         url:'https://data.geoiq.io/dataapis/v1.0/covid/locationcheck',
    //         data:{
    //             "key":"Your Api Key",
    //             "latlngs":[[
    //                 28.6296,
    //                 77.0802
    //             ]]
    //         },
    //         beforeSend: function(xhr) {
    //             xhr.setRequestHeader("accept", "application/json")
    //             xhr.setRequestHeader("Content-Type", "application/json")
    //        }, success: function(data){
    //            console.log(data)
    //        }
    //     }).then(res=>console.log(res.data));
    // }

    render() {
        let message
        if (this.state.containmentsAvailability) {

            if (this.state.districtZoneType === 'Red Zone') {
                message = (
                    <>
                        <div>
                            <h1 className={styles.error}>You Are Present In Red Zone</h1>
                        </div>
                        <div>Info. About Red Zone</div>
                    </>
                )
            } else if (this.state.districtZoneType === 'Orange Zone') {
                message = (
                    <>
                        <div>
                            <h1 className={styles.bad}>You Are Present In Orange Zone</h1>
                        </div>
                        <div>Info. about Orange Zone</div>
                    </>
                )
            } else {
                message = (
                    <>
                        <div>
                            <h1 className={styles.success}>You Are Present In Green Zone</h1>
                        </div>
                        <div>Info. about Green Zone</div>
                    </>
                )
            }
        } else {
            message = (
                <div>
                    <h1>Data not available for your area</h1>
                </div>
            )
        }

        return (
            <>

                <div>{message}</div>
            </>
        )








        // return (this.state.containmentsAvailability?(
        //     (this.state.districtZoneType==='Red Zone')?(
        //         <div>
        //             <h1 className={styles.error}>You Are Present In Red Zone</h1>
        //         </div>
        //     ):((this.state.districtZoneType==='Orange Zone')?(
        //         <div>
        //             <h1 className={styles.bad}>You Are Present In Orange Zone</h1>
        //         </div>
        //     ):(
        //         <div>
        //             <h1 className={styles.success}>You Are Present In Green Zone</h1>
        //         </div>
        //     ))
        // ):(
        //     <div>
        //         <h1>Data not available for your area</h1>
        //     </div>
        // ))










        // if(this.state.containmentsAvailability){

        //     if(this.state.districtZoneType==='Red Zone'){
        //         return(
        //             <div>
        //                 <h1 className={styles.error}>You Are Present In Red Zone</h1>
        //             </div>
        //         )
        //     }else if(this.state.districtZoneType==='Orange Zone'){
        //         return(
        //             <div>
        //                 <h1 className={styles.bad}>You Are Present In Orange Zone</h1>
        //             </div>
        //         )
        //     }else{
        //         return(
        //             <div>
        //                 <h1 className={styles.success}>You Are Present In Green Zone</h1>
        //             </div>
        //         )
        //     }
        // }else{
        //     return(
        //         <div>
        //             <h1>Data not available for your area</h1>
        //         </div>
        //     )
        // }
    }
}

export default RedZone