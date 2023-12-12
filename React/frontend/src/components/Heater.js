import React from "react";
import HeaterTemprature from "./HeaterTemprature";
import HeaterDisplay from './HeaterDisplay';


export default class Heater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: "0.00"}
    }

    onTemperatureChange = (temperature) => {
        this.setState({
            temperature: temperature,
        })
    }

    render() {
        console.log('heater component loaded.')
        return (
            <div>
                <HeaterTemprature onTemperatureChange={this.onTemperatureChange} temperature={this.state.temperature} scale='c'/> <br />
                <HeaterTemprature onTemperatureChange={this.onTemperatureChange} temperature={this.state.temperature} scale='f'/><br />
                <HeaterDisplay temperature={this.state.temperature}/>
            </div>
        );
    }
}