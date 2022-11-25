export interface ICharacterKeydownMap {
  [character: string] : () => void | ((event: Event) => void)
}

export enum KEYBOARD_KEYS {
  ARROW_DOWN = "ArrowDown",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  A = "a",
  S = "s",
  D = "d",
  F = "f",
}

export type Actions = 
    |'STANDING'
    |'WALK_RIGHT'
    |'WALK_LEFT'
    |'KNEEL'
    |'KICK'
    |'PUNCH'
    |'BEAM'
    |'ROUND_HOUSE'

export type ICharacterActionsMap = {
    [key in Actions]: { Y: number; X: number[]; };
};

export const SPRITE_HEIGHT = -80;
export const SPRITE_WIDTH = -70;