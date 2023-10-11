import {useState} from 'react'
import Axios from 'axios';

export const PredictAge = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState({});
    const getAge = () => {
        Axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
            setAge(res.data);
        });
    }

    return (
        <div>
            <h1>Predict Age</h1>
            <input type="text" placeholder='Ex: Shourav...' onChange={(event) => {setName(event.target.value)}}/>
            <input type="button" value="Check" onClick={getAge}/>
            <h1>Predicted age: {age.age}</h1>
            <h2>Name: {age.name}</h2>
            <h3>Count: {age.count}</h3>
        </div>
    )
}

