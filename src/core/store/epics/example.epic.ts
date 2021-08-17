import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {mergeMap} from "rxjs/operators";
import {AxiosReactive} from "@seed/core/http/axios-rx";

const TEST_ENDPOINT = "/test";

const TEST_APPLIED = "xhr/test";
export const testApplied = createAction<Partial<any>>(TEST_APPLIED);
export const testAppliedEpic = (action$, state$, { http }) => action$.pipe(
    ofType(TEST_APPLIED),
    mergeMap((action: PayloadAction<Partial<any>>) =>
        (http as AxiosReactive).get<any>(TEST_ENDPOINT).pipe(
           // map(res => action(res))
        )
    )
);
