// import {useState, useEffect} from 'react'
// import Axios from 'axios';


// export const CatFact = () => {
//     // fetch("https://catfact.ninja/fact")
//     // .then((res) => res.json())
//     // .then((data) => {
//     //     console.log(data);
//     // });

//     const [catfact, setCatfact] = useState("");

//     const getCatfact = async () => {
//         const res = await Axios.get("https://catfact.ninja/fact");
//         setCatfact(res.data['fact']);
//     }

//     useEffect(() => {
//         getCatfact();
//     }, []);

//     return (
//         <div>
//             <br /><br /><br /><br />
//             <button type="submit" onClick={getCatfact}>Generate Cat Fact</button>
//             <h1>{catfact}</h1>
//         </div>
//     )
// }

import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

export const CatFact = () => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['catData'],
    queryFn: () =>
    Axios.get("https://catfact.ninja/fact").then((res) => res.data),
  });

  if(isPending) {
    return (<div> 
      <br /><br /><br /><br /><br /><br />
      <h1>Loding . . . </h1>
      </div>);
  }

  return (
      <div>
        <br /><br /> <br />
        
        <p>{data?.fact}</p>
        <button onClick={refetch}>fetch again</button>
      </div>
    );
}