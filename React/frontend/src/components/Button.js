import React from "react";

class Button extends React.Component {
    shouldComponentUpdate(nextProps, nextSteps) {
        const {local: currentLocal} = this.props;
        const {local: nextLocal} = nextProps;

        if(currentLocal === nextLocal) {
            return false;
        }
        return true;
    }

    render() {
        console.log("Button Component loaded");
        const {change} = this.props;
        return (
            <button type="submit" onClick={change}>
                {this.props.local === 'bn-BD' ? "ভাষা পরিবর্তন করুন" : "Change Language"}
            </button>
        )
    }
}

export default Button;