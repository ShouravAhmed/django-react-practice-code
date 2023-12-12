import React from "react";
import themeContext from "../context/themeContext";


export default class Home extends React.Component {
 
  render() {
    return (
      <themeContext.Consumer>
        {({theme}) => (
          <div style={theme === 'dark' ? {backgroundColor: '#000000', color: '#FFFFFF'} : null}>
            <h1>Home Page</h1>
          </div>
        )}
        
      </themeContext.Consumer>
    );
  }
}
                          