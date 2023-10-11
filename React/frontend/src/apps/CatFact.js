import {useState, useEffect} from 'react'
import Axios from 'axios';

export const CatFact = () => {
    // fetch("https://catfact.ninja/fact")
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data);
    // });

    const [catfact, setCatfact] = useState("");

    const getCatfact = () => {
        Axios.get("https://catfact.ninja/fact").then((res) => {
            setCatfact(res.data['fact']);
        });
    }

    useEffect(() => {
        getCatfact();
    }, []);

    return (
        <div>
            <button type="submit" onClick={getCatfact}>Generate Cat Fact</button>
            <h1>{catfact}</h1>
        </div>
    )
}

