import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
    ImageBackground,
    Image,
    Alert,
} from "react-native";
import MapView,{Marker}from "react-native-maps";

export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            location={}
        }
    }
    componentDidMount(){
        this.getISSLocation()
    }
    getISSLocation=()=>{
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544").then(response=>{
            this.setState({location:response.data})
        })
        .catch(error=>{Alert.alert(error.message)
        })

    }
    render() {
        return (
            <View
                 style={ style=styles.container}>
                     <SafeAreaView style={styles.droidSafeArea} />
                     <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                         <View style={styles.titleContainer}>
                <Text style={styles.titleText}>ISS Location Screen!</Text>
                </View>
                <View style={styles.mapContainer}>
                <MapView style={styles.map}
    region={{
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      latitudeDelta: 100,
      longitudeDelta: 100,

    }}>
    <Marker coordinate={{latitude:this.state.location.latitude,longitude:this.state.location.longitude}}>
    <Image source={require("../assets/iss_icon.png")}style={{height:50,width:50}}/>
    </Marker>
  </MapView>
                </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    knowMore: {
        paddingLeft: 30,
        color: "red",
        fontSize: 15
    },
    bgDigit: {
        position: "absolute",
        color: "rgba(183, 183, 183, 0.5)",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -80
    },
    mapContainer:{
        flex:0.6,

    },
    map:{
        width:"100%",
        height:"100%"
    },
});
