import React from "react";

export default class RenderCounter extends React.Component {
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
        return this.props.renderProps(this.state.count, this.increaseCount, this.decreaseCount);
    }
}