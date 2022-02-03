import React, {useEffect, useState} from "react";

export const ClockComponent = () => {

    const [time, setTime] = useState(new Date());
    const refreshClock = () => setTime(new Date());

    useEffect(() => {
        const clockInterval = setInterval(refreshClock, 1000);
        return () => {
            clearInterval(clockInterval);
        }
    }, []);


    return (
        <>
            <h1 className="text-light position-absolute"
                style={{right: "5%", top: "10%", fontSize: "10vh"}}>
                {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
            </h1>
            <h2 className="text-light position-absolute"
                style={{right: "14%", top: "22%"}}>
                Figueres
            </h2>
        </>
    );
}
