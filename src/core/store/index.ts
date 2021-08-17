import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import appSlice from "@seed/core/store/slices/app.slice";
import {axiosReactive} from "@seed/core/http/axios-rx";
import {testAppliedEpic} from "@seed/core/store/epics/example.epic";

const epicMiddleware = createEpicMiddleware({
    dependencies: { http: axiosReactive }
});

export const rootEpic = combineEpics(
    testAppliedEpic
);

export const store = configureStore({
    reducer: combineReducers({
        app: appSlice
    }),
    middleware: [
        ...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
        epicMiddleware,
    ]
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
