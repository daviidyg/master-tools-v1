import React from "react";
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';

export const ProgressBarHpComponent = ({value, icon, alt}) => {
    return (
        <>
                <CircularProgressbarWithChildren value={value}>
                    <img
                        style={{width: 90}}
                        src={icon}
                        alt={alt}
                    />
                </CircularProgressbarWithChildren>
        </>
    )
}
