import React from "react";

export default function withCounter(OriginalComponent) {

    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = {count: 0};
        }

        increaseCount = () => {
            this.setState({
                count: this.state.count + 1,
            });
        }

        decreaseCount = () => {
            this.setState({
                count: Math.max(this.state.count - 1, 0),
            });
        }

        render() {
            return <OriginalComponent Count={this.state.count} IncreaseCount={this.increaseCount} DecreaseCount={this.decreaseCount}/>;
        }
    }
    return Counter;
}