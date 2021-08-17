import React, {useEffect} from "react";
import {CombatLogComponent} from "@seed/combat-log/combat-log-component";
import {RoleCardInfo} from "@seed/core/models/card-info";
import {modelsSet} from "@seed/core/store/slices/app.slice";
import {useDispatch} from "react-redux";


export const AppComponent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            modelsSet([
            {
                id: 1,
                name: "Ozirus",
                role: RoleCardInfo.HEALER,
                ca: 3,
                hp: 30,
                currentHp: 10
            },
            {
                id: 2,
                name: "Ozirus",
                role: RoleCardInfo.MONSTER,
                ca: 3,
                hp: 500,
                currentHp: 250
            }])
        );
    }, []);

    return (
        <>
            <CombatLogComponent />
        </>
    );
}
