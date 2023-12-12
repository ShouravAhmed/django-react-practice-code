import React from "react";

import Sms from "./Sms";
import Emoji from "./Emoji";

export default class Composition extends React.Component{
    constructor(props) {
        super(props);
        this.state = {inputText: "", inputEmoji: "",  messages: [{id: 0, body: 'lets start', emoji: '❤️'}, ]}
    }

    formUpdated = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });
    }

    formSubmited = (e) => {
        e.preventDefault();
        const {inputText, inputEmoji} = this.state;
        this.state.messages.push({id: this.state.messages.length, body: inputText, emoji: inputEmoji});
        this.setState({
            inputText: "",
            inputEmoji: ""
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formSubmited}>
                    <input type="text" name="inputText" value={this.state.inputText} onChange={this.formUpdated}/>
                    <input type="text" name="inputEmoji" value={this.props.inputEmoji}  onChange={this.formUpdated}/>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                {this.state.messages.map(
                    (message) => {
                        return (
                            <div key={message.id}>
                                <Emoji> 
                                    {
                                        ({emojiWraper}) => <Sms emojiWraper={emojiWraper} text={message.body} emoji={message.emoji}/>
                                    } 
                                </Emoji>
                            </div>
                        );
                    }
                )}
                </div>
            </div>
        );
    }
}