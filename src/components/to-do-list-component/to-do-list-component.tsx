import React, {useState} from "react";
import {Button, Col, FormControl, FormGroup, ListGroup, ListGroupItem, Row} from "react-bootstrap";
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
            <Col sm={12} md={12} className="mt-3">
                <Row>
                    <Col sm={12} md={4}>
                        <FormGroup>
                            <FormControl type={"text"}
                                         placeholder="Write some shit"
                                         onChange={(ev) => setItem(ev.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={3}>
                        <Button variant={"primary"}
                                onClick={
                                    () => onSaveItem()
                                }>
                            Add new item
                        </Button>
                    </Col>
                </Row>
                <ListGroup>
                    {todoListItems.map(({name, id}) => (
                        <ListGroupItem key={id}>
                            {name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
        </>
    );
}
