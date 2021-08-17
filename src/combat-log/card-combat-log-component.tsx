import React from "react";
import {CardInfo, RoleCardInfo} from "@seed/core/models/card-info";
import {ProgressBarHpComponent} from "@seed/combat-log/progress-bar-hp-component";
import {Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {modelAdd, modelDeleted} from "@seed/core/store/slices/app.slice";


interface CardCombatComponentProps {
    model: CardInfo;
}

export const CardCombatComponent = ({model}: CardCombatComponentProps) => {
    const dispatch = useDispatch();
    const {name, currentHp, hp, role, ca} = model;
    const value = (currentHp * 100) / hp;
    const route = `/images/${role}.jpeg`;

    const addModel = (model) => {
        dispatch(
            modelAdd(model)
        )
    }
    const deleteModel = (id) => {
        dispatch(
            modelDeleted(id)
        )
    }

    const testing: CardInfo = {
        id: 3,
        name: "Shad0wflame",
        hp: 30000000,
        ca: 1,
        role: RoleCardInfo.MONSTER,
        currentHp: 1
    }


    return (
        <Col>
            <div className="mt-3" style={{width:200, height: 200}}>
                <ProgressBarHpComponent value={value} icon={route} alt={role}/>
                <div className="flex-row d-flex justify-content-center">
                    <img className="mt-2" src="/images/shield.png" style={{width:35, height:35}} alt="Shield"/>
                    <p className="position-absolute pr-4" style={{color:"white", left: "152px", top: 228}}>{ca}</p>
                    <p className="mt-3 text-center my-auto">{name}</p>
                </div>
            </div>
            {/*<button onClick={() => deleteModel(model.id)}>PEGAME</button>
            <button onClick={() => addModel(testing)}>ADD</button>*/}
        </Col>
    );
}

