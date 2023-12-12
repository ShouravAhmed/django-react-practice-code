import React from "react";
import withCounter from "./withCounter";
import RenderCounter from "./RenderProps";


const Counter = ({Count, IncreaseCount, DecreaseCount}) => {
  console.log("count: ", Count);
  return (
    <h1>
      <button onClick={DecreaseCount}>-</button> {Count} 
      <button onClick={IncreaseCount}>+</button>
    </h1>
  );
}

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phoneNo: "", email: "", selectedCity: "Dhaka"}
    this.cities = [{id: 1, name: 'Dhaka'}, {id: 2, name: 'Chittagong'}, {id: 3, name: 'Brahmanbaria'}]
  }

  cities = []

  updateForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const {phoneNo, email, selectedCity} = this.state
    console.log('form submited: ', phoneNo, email, selectedCity);
  }

  render() {
    const ItemCount = withCounter(Counter);

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input name="phoneNo" type="text" value={this.state.phoneNo} placeholder="Phone No" onChange={this.updateForm}/> <br /> <br />
          <input name="email" type="text" value={this.state.email} placeholder="Email" onChange={this.updateForm}/> <br /> <br />

          <select name='selectedCity' value={this.state.selectedCity} onChange={this.updateForm}>
            {
              this.cities.map((city) => {
                return (<option key={city.id} id={city.id} value={city.name}>{city.name}</option>);
              })
            }
          </select> <br /><br />

          <ItemCount />
          <RenderCounter renderProps={
              (Count, IncreaseCount, DecreaseCount) => (
                <Counter Count={Count} IncreaseCount={IncreaseCount} DecreaseCount={DecreaseCount}/>
              )}
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
