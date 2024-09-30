import { Equipment } from './Equipment';
import { Status } from './Status';

export interface Ganger {
    ganger_id: string;
    label_id: string;
    name: string;
    type: string;
    m: number;
    ws: number;
    bs: number;
    s: number;
    t: number;
    w: number;
    i: number;
    a: number;
    ld: number;
    cl: number;
    wil: number;
    int: number;
    cost: string;
    xp: string;
    newxp: string;
    kills: string;
    advance_count: string;
    equipment: Equipment[];
    skills: string[];
    injuries: string[];
    image: string | undefined;
    status: string;
    gameStatus: Status[];
    notes: string;
    datetime_added: string;
    datetime_updated: string;
}