import React, { useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';
class Amap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.8041, lng: 77.1225 }, { lat: 28.6021, lng: 77.3025 }],
        }
    }

    componentDidMount() {

    };


    render() {

        return (

            <GoogleMap defaultZoom={8}
                defaultCenter={{ lat: 28.7041, lng: 77.1025 }}
            >
                {this.state.markers.map(mark => (
                    <Marker
                        position={mark}
                        key={mark.lat}
                    //    title={mark}
                    // onClick={()=>this.setState({...this.state,loc:mark})}
                    />
                ))}
                {console.log('2nd block')}

                {/* {this.state.loc&&
    <InfoWindow
    position={this.state.loc}
    onCloseClick={()=>this.setState({...this.state,loc:null})}
    ><div>{this.state.loc.userid}</div>
      </InfoWindow>
    } */}

            </GoogleMap>

        );

    }

}
const AWrappedMap = withScriptjs(withGoogleMap(Amap));
export default AWrappedMap;