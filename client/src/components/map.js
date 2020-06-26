import React from 'react';
// import {withScriptjs, InfoWindow, Polyline} from ' react';
import {  withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
class Amap extends React.Component {

    constructor(props) {


        super(props);
        this.state = {
            markers: this.props.posArray,
            //[{ lat: 28.7041, lng: 77.1025 }, { lat: 28.8041, lng: 77.1225 }, { lat: 28.6021, lng: 77.3025 }],
            loc: null
        }
        console.log(this.props.posArray);
    }

    componentDidMount() {

    };


    render() {

        // { console.log(this.state.markers.length == 0 ? '{lat: 28.7041, lng: 77.1025}' : this.state.markers[0]) }

        console.log(this.props)
        return (

            <GoogleMap defaultZoom={14}
                key={this.props.posArray}
                defaultCenter={this.state.markers.length === 0 ? { lat: 28.7041, lng: 77.1025 } : this.state.markers[0]}
            >
                {this.props.posArray.map(mark => (
                    <Marker
                        position={mark}
                        key={mark.lat}
                    //    title={mark}
                    // onClick={()=>this.setState({...this.state,loc:mark})}
                    />
                ))}

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
const AWrappedMap = withGoogleMap(Amap);
export default AWrappedMap;