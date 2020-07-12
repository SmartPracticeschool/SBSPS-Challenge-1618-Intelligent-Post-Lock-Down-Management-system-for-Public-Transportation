import React, { Component } from 'react';
import styles from './appStyles.module.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded'; //Important Icon
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';  //about Icon
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'; //Cross Icon  (Donts)
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'; //Tick Icon   (Dos)
// import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded'; //Error Icon

// import { HeaderUser } from './HeaderUser';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Footer from './footer';

class RedZone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //containmentsAvailability: true,
            districtZoneType: 'Red Zone'
        }
    }

    getToken() {
        console.log('getposition called');

        navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            console.log('lat:', lat, "lng:", lng, "timestamp", position.timestamp);

            // this.setState({
            //     'lat': lat,
            //     'lng': lng
            // });

            axios.post('https://data.geoiq.io/dataapis/v1.0/covid/locationcheck', {
                "key": "Your_api_key",
                "latlngs": [[
                    lat, lng
                ]]
            }).then(res => {
                this.setState({
                    //containmentsAvailability: res.data.data[0].containmentsAvailability,
                    districtZoneType: res.data.data[0].districtZoneType
                },
                    () => {
                        console.log("after assigning zone type", this.state.districtZoneType);
                    }
                )
                console.log(res.data.data[0]);
            }).catch(err => { console.log(err) });

        },
            err => {
                alert("Gogle maps can't be loaded", err)
            }, {
            enableHighAccuracy: true,
        }
        )

    }


    // getToken() {



    //     axios.post('https://data.geoiq.io/dataapis/v1.0/covid/locationcheck', {
    //         "key": "Your_api_key",
    //         "latlngs": [[
    //             28.1920,
    //             76.6191
    //         ]]
    //     }).then(res => {
    //         this.setState({
    //             //containmentsAvailability: res.data.data[0].containmentsAvailability,
    //             districtZoneType: res.data.data[0].districtZoneType
    //         },
    //             () => {
    //                 console.log("after assigning zone type", this.state.districtZoneType);
    //             }
    //         )
    //         console.log(res.data.data[0]);
    //     }).catch(err => { console.log(err) });
    // }


    componentDidMount() {
        this.getToken();
    }
    render() {
        let message
        // if (this.state.containmentsAvailability) {

        if (this.state.districtZoneType === 'Red Zone') {
            message = (
                <>
                    <div>
                        <h1
                            style={{ textAlign: "center" }}
                        >Attention,You are present in Red Zone</h1>
                        <h2
                            style={{ textAlign: "center", color: "#c50505" }}
                        >High proximity region</h2>
                    </div>
                    <div>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmojiObjectsRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Important Rules" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. The movement of individuals will be strictly prohibited between 7 pm to 7 am." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Citizens over the age of 65 years of age, pregnant women, children below the age of 10 years have to stay at home, except for health purposes." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <InfoRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="About Red Zone" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Areas with substantial numbers of positive cases fall under the red zone category, There is a restriction on all activities in these areas. A zone is categorised as red if districts with highest caseload contribute to more than 80 per cent of coronavirus cases for each state in the country or districts with a doubling rate of less than four days.The health ministry has classified 170 hotspot districts under red zones." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CheckRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Do's" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. Movement of individuals and vehicles, only for permitted activities. Four wheeler vehicles will have maximum two passengers besides the vehicle driver; for two wheelers, pillion rider is not allowed." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Special Economic Zones (SEZs), export-oriented units, industrial estates/townships with access control in urban areas that fall into red zones have been permitted to resume operations." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Construction activities in urban areas: Only in situ construction (where workers are available on site and no workers are required to be brought in from outside) and construction of renewable energy projects are permitted." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. All construction activities are permitted in rural areas." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. In red zones, manufacturing of IT hardware and the jute industry along with manufacturers of packaging material have been given the go-ahead to operate, provided that safety guidelines are followed." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="6. In red areas, all standalone shops (both in urban and rural areas) and shops in residential complexes have been allowed to reopen for business." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="7. E-commerce activities are allowed limited to essential goods." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="8. Private offices in red zones will be allowed to operate with 33 per cent of their strength." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="9. Government offices in red zones will be allowed to function with senior officers of the Deputy Secretary level and above at full strength, with the remaining staff attending up to 33 per cent as per requirement." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="10. Even in red zones, defense and security services, health and family welfare, police, prisons, home guards, civil defence, fire and emergency services, disaster management and related services, National Informatics Centre (NIC), customs, Food Corporation of India (FCI), National Cadet Corps (NCC), Nehru Yuvak Kendra (NYK) and Municipal services have been allowed to function with no restrictions.All industrial and construction activities in rural areas that fall in red zones have been allowed. These include MNREGA works, food-processing units and brick kilns." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="11. In red zones, all agriculture and animal husbandry (including inland and marine fisheries) activities, inclusive of their supply chain, will be able to function." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="12. All health services, including AYUSH, have been permitted to operate in red zones." />
                            </ListItem>

                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CloseRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Dont's" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. All domestic and international air travel of passengers, except for medical services, air ambulance and for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. All passenger movement by trains, except for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Inter-state buses for public tranport, except as permitted by MHA." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. Metro rail services" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. Inter-state movement of citizens except for medical reasons or for activities permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="6. All schools, colleges, educational/training/coaching institutes, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="7. Cinema halls, malls, gymnasiums, sports complexes, entertainment parks, bars, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="8. Religious, political, social, sports gatherings." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="9. Religious congregations are strictly prohibited." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="10. Inter-district and intra-district movement of buses" />
                            </ListItem>

                        </List>
                        <Footer />
                    </div>
                </>
            )
        } else if (this.state.districtZoneType === 'Orange Zone') {
            message = (
                <>
                    <div>
                        <h1 className={styles.bad}>You Are Present In Orange Zone</h1>
                    </div>
                    <div>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmojiObjectsRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Important Rules" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. The movement of individuals will be strictly prohibited between 7 pm to 7 am." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Citizens over the age of 65 years of age, pregnant women, children below the age of 10 years have to stay at home, except for health purposes." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <InfoRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="About Orange Zone" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="The areas with a limited number of cases in the past and with no surge in positive cases recently would be included under the orange zone.Only restricted activities such as limited public transport and farm product harvesting is expected to be allowed in the coronavirus orange zone. In case the district is classified as a Red Zone and there is no confirmed case in the last 21 days then the area may be labelled as an Orange Zone.In case the district is classified as an Orange Zone, and, there is no confirmed case in the last 21 days in the area of the district outside the limits of the municipal corporations, the area may be labeled as a Green Zone. However, caution may be exercised in such areas so that they remain free from Covid-19 cases.In case the area of the district outside the limits of the MC have one or more confirmed cases in the last 21 days, this part of the district will continue to be labeled as a Red or Orange Zone, as per the classification of the district.The number of orange zones increased - from 207 to 284, according to the Union Health Ministry." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CheckRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Do's" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. OPDs, medical clinics can operate in Orange Zones, with social distancing norms and other safety, precautions." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Taxis and cab aggregators, with a driver and two passengers only" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Inter-district movement of individuals and vehicles, only for permitted activities." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. All other activities will be permitted, which are not specifically prohibited/permitted with restrictions in the Orange Zone." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CloseRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Dont's" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. All domestic and international air travel of pasengers, except for medicial services, air ambulance and for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. All passenger movement by trains, except for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Inter-state buses for public tranport, except as permitted by MHA." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. Metro rail services" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. Inter-state movement of citizens except for medical reasons or for activities permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="6. All schools, colleges, educational/training/coaching institutes, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="7. Cinema halls, malls, gynasiums, sports complexes, entertainment parks, bars, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="8. Religious, political, social, sports gatherings." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="9. Religious congregations are strictly prohibited." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="10. Inter-district and intra-district movement of buses" />
                            </ListItem>
                        </List>
                        <Footer />
                    </div>
                </>
            )
        } else {
            message = (
                <>
                    <div>
                        <h1 className={styles.success}>You Are Present In Green Zone</h1>
                    </div>
                    <div>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmojiObjectsRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Important Rules" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. The movement of individuals will be strictly prohibited between 7 pm to 7 am." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Citizens over the age of 65 years of age, pregnant women, children below the age of 10 years have to stay at home, except for health purposes." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <InfoRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="About Green Zone" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Green zones are the districts with either zero confirmed cases till date or, no confirmed case in the last 21 days." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CheckRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Do's" />
                            </ListItem>
                            <ListItem>O
                                    <ListItemText primary="1. All activities are permitted except those prohibited throughout the country, irrespective of the zonal division." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Buses can operate with up to 50 per cent seating capacity and bus depots can operate with up to 50 per cent capacity." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. All goods traffic is permitted. No state/ UT shall stop the movement of cargo for cross land-border trade under treaties with neighbouring countries." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. No separate pass of any sort is needed for such movement, which is essential for maintaining the supply chain of goods and services across the country during the lockdown period." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. E-commerce is allowed in non-essential items in green zone and also in orange zones." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="6. Sale of liquor has been allowed in green zones. However, if the shops are located in malls, marketing complexes and in containment areas, they cannot open." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="7. OPDs and medical clinics shall be permitted to operate in red, orange and green zones with all social distancing norms." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CloseRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Dont's" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1. All domestic and international air travel of pasengers, except for medicial services, air ambulance and for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. All passenger movement by trains, except for security purposes or for purposes as permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Metro rail services" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. Inter-state movement of citizens except for medical reasons or for activities permitted by MHA" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. All schools, colleges, educational/training/coaching institutes, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="6. Cinema halls, malls, gynasiums, sports complexes, entertainment parks, bars, etc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="7. Religious, political, social, sports gatherings." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="8. Religious congregations are strictly prohibited." />
                            </ListItem>
                        </List>
                    </div>
                </>
            )
        }
        // } else {
        //     message = (
        //         <div>
        //             <List>
        //             <ListItem>
        //                 <ListItemAvatar>
        //                     <Avatar>
        //                         <ErrorRoundedIcon/>
        //                     </Avatar>
        //                 </ListItemAvatar>
        //                 <ListItemText primary="Data not available for your area"/>
        //             </ListItem>
        //             </List>
        //         </div>
        //     )
        // }

        return (
            <>

                <Container maxWidth="md"><div>{message}</div></Container>
            </>
        )






        //FOR TESTING LAT LONG ARE:
        //Green zone: 28.1920,76.6191                Rewari
        //Orange zone: 14.656773,77.627936           Anantapur
        //Red zone: 28.6296,77.0802                  District Center





    }
}

export default RedZone