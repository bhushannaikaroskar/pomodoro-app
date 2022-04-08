import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { v4 as uuid } from "uuid";
import "./timer.css";

const playingStyle = {
    backgroundColor:"var(--PRIMARY-500)"
}

const TimerData = ({ remainingTime, originalTime }) => {
    let minutes = Math.floor(remainingTime / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds =
        remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60;

    useEffect(() => {
        document.title = `${minutes}m : ${seconds}s`;
    });

    return (
        <div className="timer-data-container">
            <h1 className="timer-data">{`${minutes}m : ${seconds}s`}</h1>
            <h3 className="timer-data">{`Out of ${originalTime} min`}</h3>
        </div>
    );
};

export default function Timer({ time }) {
    const [isPlaying, setIsplaying] = useState(false);
    const [key, setKey] = useState(uuid());

    const play = () => {
        setIsplaying(true);
    };

    const pause = () => {
        setIsplaying(false);
    };

    const reset = () => {
        setIsplaying(false);
        setKey(uuid());
    };

    return (
        <div>
            <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={time * 60}
                size={275}
                strokeWidth={20}
                colors={["#00cf60", "#00cf60"]}
                updateInterval={0.05}
                colorsTime={[time * 60, 0]}
            >
                {({ remainingTime }) => (
                    <TimerData
                        remainingTime={remainingTime}
                        originalTime={time}
                    />
                )}
            </CountdownCircleTimer>
            <div className="timer-cta">
                <button style={!isPlaying?playingStyle:{}} className="timer-button" onClick={pause}>
                    <span class="material-icons btn-icon-lg">pause</span>
                </button>
                <button style={isPlaying?playingStyle:{}} className="timer-button play-button" onClick={play}>
                    <span class="material-icons ">play_arrow</span>
                </button>
                <button className="timer-button" onClick={reset}>
                    <span class="material-icons btn-icon-lg">restart_alt</span>
                </button>
            </div>
        </div>
    );
}
