import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardInfo} from "@seed/core/models/card-info";
import {RootState} from "@seed/core/store";

export interface AppBaseState {
    models: CardInfo[];
}

const initialState: AppBaseState = {
    models: []
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        modelsSet: (state: AppBaseState, action: PayloadAction<CardInfo[]>) => {
            state.models = action.payload
        },
        modelDeleted: (state: AppBaseState, action: PayloadAction<number>) => {
            state.models.splice(state.models.findIndex(model => model.id !== action.payload),1)
        },
        modelAdd: (state: AppBaseState, action: PayloadAction<CardInfo>) => {
            state.models = [...state.models, action.payload];
        }
    }
})

export default slice.reducer;

export const {
    modelsSet,
    modelDeleted,
    modelAdd
} = slice.actions;

export const modelsSelector = (state: RootState) => state.app.models;
