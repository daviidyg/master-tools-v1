import React, {useEffect, useState} from "react";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useSelector} from "react-redux";
import {modelsSet, todoListSelector} from "@seed/core/store/slices/app.slice";
import {TodoListItem} from "@seed/core/models/todo-list-item";

export const ToDoListComponent = () => {

    const todoListItems = useSelector(todoListSelector);
    const [item, setItem] = useState<string>(null);

    return (
        <>
            <input placeholder="Write some shit"
                   onChange={(ev) => setItem(ev.target.value)}
            />
            <Button onClick={modelsSet({name: item, id: 1})}>Add new item</Button>
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
