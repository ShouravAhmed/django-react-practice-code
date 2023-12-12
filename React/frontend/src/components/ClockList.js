import React from "react";
import Clock from "./Clock";


export default function ClockList({ clocks }) {
    return (
        <div>
            {
                clocks.map((item) => {
                    return <Clock key={item} lang='en-US'/>;
                })
            }
        </div>
    );
}