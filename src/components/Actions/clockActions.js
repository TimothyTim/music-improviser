import * as types from './actionTypes';

export function nextTick(nextTick) {
    return { type: types.NEXT_TICK, nextTick };
}

export function nextFrame(nextFrame) {
    return { type: types.NEXT_FRAME, nextFrame };
}

export function isTicking(isTicking) {
    return { type: types.IS_TICKING, isTicking };
}

export function tempo(tempo) {
    return { type: types.TEMPO, tempo };
}
