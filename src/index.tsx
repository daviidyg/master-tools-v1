import * as React from "react";
import {Provider} from "react-redux";
import {render} from "react-dom";
import {enableMapSet} from "immer";

// @ts-ignore
import "@seed/main.scss";
import {store} from "@seed/core/store";
import {AppComponent} from "@seed/app.component";

enableMapSet();

render(
    <React.StrictMode>
        <Provider store={store}>
            <AppComponent />
        </Provider>
    </React.StrictMode>,
    document.querySelector("root")
);


