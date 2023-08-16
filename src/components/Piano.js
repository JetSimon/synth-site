import React from "react";
import Key from "./Key.js";
import "./Piano.css";

function Piano() {

    return (
        <div className="Piano">
            <Key color="white" keyForKey="a" frequency={261.6256}/>
            <Key color="black" keyForKey="w" frequency={277.1826}/>
            <Key color="white" keyForKey="s" frequency={293.6648}/>
            <Key color="black" keyForKey="e" frequency={311.1270}/>
            <Key color="white" keyForKey="d" frequency={329.6276}/>
            <Key color="white" keyForKey="f" frequency={349.2282}/>
            <Key color="black" keyForKey="t" frequency={369.9944}/>
            <Key color="white" keyForKey="g" frequency={391.9954}/>
            <Key color="black" keyForKey="y" frequency={415.3047}/>
            <Key color="white" keyForKey="h" frequency={440.0000}/>
            <Key color="black" keyForKey="u" frequency={466.1638}/>
            <Key color="white" keyForKey="j" frequency={493.8833}/>
            <Key color="white" keyForKey="k" frequency={523.2511}/>
        </div>
    );
}

export default Piano;