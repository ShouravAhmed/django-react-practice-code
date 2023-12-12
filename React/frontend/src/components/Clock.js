import React from "react";
import Button from "./Button";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), 
            local: "en-US",
            count: 0
        };
        console.log('clock constructed');
    }

    componentDidMount() {
        console.log('clock started');
        this.clockTimer = setInterval(() => this.tick(), 1000);
        document.title = `Clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
        clearInterval(this.clockTimer);
        console.log("clock stoped.");
    }

    componentDidUpdate() {
        document.title = `Clicked ${this.state.count} times`;
    }

    tick() {
        console.log('clock ticking.');
        this.setState({
            date: new Date()
        });
    }

    handleClick = (event) => {
        if(this.state.local === "bn-BD") {
            this.setState({
                local: "en-US"
            })
        }
        else {
            this.setState({
                local: "bn-BD"
            })
        }
        this.setState({
            count: this.state.count + 1,
        })
        console.log(`Language Changed to : ${this.state.local}`);
    }

    render() {
        console.log("clock component loaded.")
        return (
            <div>
                <h1 className="heading">
                    <span className="text">{this.state.date.toLocaleTimeString(this.state.local)}</span>
                </h1>
                <Button local={this.state.local} change={this.handleClick}/>
            </div>
        );
    }
}
 
export default Clock;