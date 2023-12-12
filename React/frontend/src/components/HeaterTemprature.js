import React from "react";


const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenhiet'
}
export default class Heatertemperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temp: this.convertedTemperature(props.temperature), loading: false};
    }

    convertedTemperature = (temperature) => {
        if(this.props.scale === 'f') {
            return (Math.round(((parseFloat(temperature) * (9.0/5.0)) + 32.0) * 100) / 100).toString();
        }
        return (Math.round(temperature * 100) / 100).toString();
    }

    convertBeforeChange = (temperature) => {
        this.setState({
            temp: temperature,
        });
        this.setState({
            loading: true,
        });
        if(this.props.scale !== 'f') {
            return temperature;
        }
        const temp = (Math.round(((parseFloat(temperature) - 32) * (5.0/9.0)) * 100) / 100).toString();
        console.log(`conver to celsius ${temperature} => ${temp}`);
        return temp;
    }

    render() {
        console.log('temperature input component loaded.')

        if(this.state.loading) {
            this.state.loading = false;
        }
        else {
            this.state = {temp: this.convertedTemperature(this.props.temperature)};
        }
        
        return (
            <fieldset>
                <legend>Enter temperature In {scaleNames[this.props.scale]}</legend>
                <input type="text" value={this.state.temp} onChange={(e) => {this.props.onTemperatureChange(this.convertBeforeChange(e.target.value))}} />
            </fieldset>
        )
    }
}