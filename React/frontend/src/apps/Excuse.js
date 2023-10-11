import {useState} from 'react'
import Axios from 'axios'

export const Excuse = () => {
    const [excuse, seExcuse] = useState("")
    const generateFunExcuse = () => {
      Axios.get("https://excuser-three.vercel.app/v1/excuse/funny/").then((res) => {
        seExcuse(res.data[0]['excuse']);
      })
    }

    const generateDevExcuse = () => {
      Axios.get("https://excuser-three.vercel.app/v1/excuse/developers/").then((res) => {
        seExcuse(res.data[0]['excuse']);
      })
    }

    const generateOfficeExcuse = () => {
      Axios.get("https://excuser-three.vercel.app/v1/excuse/office/").then((res) => {
        seExcuse(res.data[0]['excuse']);
      })
    }

  return (
    <div>
      <button onClick={generateOfficeExcuse}>Office Excuse</button><br />
      <button onClick={generateDevExcuse}>Developer Excuse</button><br />
      <button onClick={generateFunExcuse}>Fun Excuse</button><br />
      <hr /><hr />

      <h3>{excuse}</h3>
      <hr /><hr />
    </div>
  )
}
