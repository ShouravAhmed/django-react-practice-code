import React from "react";

export default class Emoji extends React.Component {
    emojiWraper = (text, emoji) => `${emoji} ${text} ${emoji}`;
    
    render() {
        return this.props.children({emojiWraper: this.emojiWraper});
    }
}