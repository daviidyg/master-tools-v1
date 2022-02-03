import React, {useState} from "react";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {modelsSet, todoListSelector} from "@seed/core/store/slices/app.slice";

export const ToDoListComponent = () => {
    const dispatch = useDispatch();

    const todoListItems = useSelector(todoListSelector);
    const [item, setItem] = useState<string>(null);

    const onSaveItem = () => {
        dispatch(modelsSet({id: Math.random(), name: item}))
    }

    return (
        <>
            <input placeholder="Write some shit"
                   onChange={(ev) => setItem(ev.target.value)}
            />
            <Button variant={"primary"}
                    onClick={
                        () => onSaveItem()
                    }>
                Add new item
            </Button>
            <ListGroup>
                {todoListItems.map(({name, id}) => (
                    <ListGroupItem key={id}>
                        {name}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </>
    );
}
