import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@seed/core/store";
import {TodoListItem} from "@seed/core/models/todo-list-item";

export interface AppBaseState {
    todoListItem: TodoListItem[];
    todoListItemSet: TodoListItem;
}

const initialState: AppBaseState = {
    todoListItem: [],
    todoListItemSet: null
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        modelsSet: (state: AppBaseState, action: PayloadAction<TodoListItem>) => {
            state.todoListItem = [state.todoListItem, ...action.payload]
        },
    }
})

export default slice.reducer;

export const {
    modelsSet
} = slice.actions;

export const todoListSelector = (state: RootState) => state.app.todoListItem;
