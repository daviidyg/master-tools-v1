import React from "react";
import {CardCombatComponent} from "./card-combat-log-component";
import {Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {modelsSelector} from "@seed/core/store/slices/app.slice";


export const CombatLogComponent = () => {

    const models = useSelector(modelsSelector);

    return (
        <Container>
                {models.map((model) =>
                    <Row>
                    <CardCombatComponent key={model.id} model={model}/>
                    </Row>
                )}
        </Container>
    );

}
