import React from "react";
import {ClockComponent} from "@seed/components/clock-component/clock-component";
import {ToDoListComponent} from "@seed/components/to-do-list-component/to-do-list-component";


export const AppComponent = () => {

    return (
        <>
            <img src="images/bg-image.jpeg" style={{height: "100vh", width: "100%", overflowY: "auto"}}/>
            <ClockComponent/>
            <ToDoListComponent/>
       </>
    );
}
