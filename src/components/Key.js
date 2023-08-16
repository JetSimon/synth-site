import React, { useState, useEffect } from "react";
import "./Key.css"
import impulse from "../impulse.wav";

const context = new AudioContext();

function Key(props) {

    let[pressed, setPressed] = useState(false);
    let[started, setStarted] = useState(false);

    let [audio, setAudio] = useState(() => {
        let o = context.createOscillator()
        o.type = "square";
        o.frequency.setValueAtTime(props.frequency, context.currentTime);
        return o;
    });

    let[audioGain, setAudioGain] = useState(() => {
        let g = context.createGain();
        g.gain.setValueAtTime(0.00001, context.currentTime);
        return g;
    });

    let[reverb, setReverb] = useState(async () => {
        let r = context.createConvolver();
    
       // load impulse response from file
        let response = await fetch(impulse);
        let arraybuffer = await response.arrayBuffer();
        r.buffer = await context.decodeAudioData(arraybuffer);

        return r;
    });

    function onMouseEnter(e) {
        if(e.buttons >= 1) {
            onMouseDown(e);
        }
    }

    function onMouseDown(e) {
        
        if(!started) {
            reverb.then((x) => {
                setReverb(x);
                audio.connect(audioGain);
                audioGain.connect(x);
                x.connect(context.destination);
                console.log(audio.started)
                audio.start();
                setStarted(true);
            });
        }

        setStarted(true);

        audioGain.gain.cancelAndHoldAtTime(context.currentTime);
        audioGain.gain.exponentialRampToValueAtTime(
            1, context.currentTime + 0.1
        )

        setPressed(true);
    }

    function onMouseUp(e) {

        audioGain.gain.exponentialRampToValueAtTime(
            0.00001, context.currentTime + 1
        )
        
        setPressed(false);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if(!e.repeat && e.key === props.keyForKey) {
                onMouseDown(e);
            }
        }

        function handleKeyUp(e) {
            if(e.key === props.keyForKey) {
                onMouseUp(e);
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        }
      }, [onMouseDown, onMouseUp, props.keyForKey]);

    return (
        <button onMouseEnter={onMouseEnter} onMouseDown={onMouseDown} onMouseLeave={onMouseUp} onMouseUp={onMouseUp} className={(props.color == "white" ? "white " : "black ") + (pressed ? "pressed" : "")}>

        </button>
    );
}

export default Key;