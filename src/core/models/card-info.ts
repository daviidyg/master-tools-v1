export enum RoleCardInfo {
    DPS = "dps",
    TANK = "tank",
    HEALER = "healer",
    MONSTER = "monster"
}
export interface CardInfo {
    id: number;
    name: string;
    role: RoleCardInfo;
    ca: number;
    hp: number;
    currentHp: number;
}
