<template>
    <div 
        id="ch1" 
        class="character" 
        ref="kenRef" 
    ></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import { ICharacterActionsMap, Actions, ICharacterKeydownMap, KEYBOARD_KEYS, SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants';

const CHARACTER_ACTIONS: ICharacterActionsMap = { // X is base on the number of sprites...
    // PUNCH: { Y: 2, X: [0, 1, 2, 3] },
    BEAM: { Y: 0, X: [0, 1, 2, 3] },
    STANDING: { Y: 1, X: [0, 1, 2, 3] },
    PUNCH: { Y: 2, X: [0, 1, 2] },
    WALK_RIGHT: { Y: 3, X: [0, 1, 2] },
    WALK_LEFT: { Y: 3, X: [2, 3, 4] },
    KNEEL: { Y: 9, X: [0] },
    KICK: { Y: 6, X: [0, 1, 2, 3, 4] },
    ROUND_HOUSE: { Y: 7, X: [0, 1, 2, 3, 4]}
};

const CHARACTER_KEY_MAP: ICharacterKeydownMap = {
  [KEYBOARD_KEYS.ARROW_DOWN]: () => setAction('KNEEL'),
  [KEYBOARD_KEYS.ARROW_LEFT]: () => setAction('WALK_LEFT'),
  [KEYBOARD_KEYS.ARROW_RIGHT]: () => setAction('WALK_RIGHT'),
  [KEYBOARD_KEYS.A]: () => setAction('PUNCH'),
  [KEYBOARD_KEYS.S]: () => setAction('KICK'),
  [KEYBOARD_KEYS.D]: () => setAction('BEAM'),
  [KEYBOARD_KEYS.F]: () => setAction('ROUND_HOUSE'),
};

let count: number = 0;
let action: Actions = 'STANDING';

const kenRef: Ref = ref(null);
const emit = defineEmits(['action'])

let ch_X = 0;
let ch_Y = 0;

let characterInterval: ReturnType<typeof setInterval>;

function onKeydown(event: KeyboardEvent): void {
  const isValidKey = Object.keys(CHARACTER_KEY_MAP).includes(event.key);
  if (!isValidKey) {
      return;
  };
  CHARACTER_KEY_MAP[event.key]();
}

function setAction(_action: Actions) {
    count = 0;
    action = _action;
    emit('action', action);
}

function drawSprite(): void {
    kenRef.value.style.backgroundPositionY = `${CHARACTER_ACTIONS[action].Y * SPRITE_HEIGHT}px`;
    kenRef.value.style.backgroundPositionX = `${CHARACTER_ACTIONS[action].X[count++] * SPRITE_WIDTH}px`;
    kenRef.value.style.left = `${ch_X}px`;
};

function updateCoordinates(){
    if (count >= CHARACTER_ACTIONS[action].X.length) { // Default to Standing
        count = 0;
        action = 'STANDING';
        emit('action', 'STANDING');
    }

    if (action == 'WALK_LEFT') { // TODO: refactor
        ch_X = ch_X - 10;
    } else if(action == 'WALK_RIGHT') {
        ch_X = ch_X + 10;
    }
}

function drawCharacter() {
    updateCoordinates()
    drawSprite()
}

// Life Cycle Events; 
onMounted(() => {
    characterInterval = setInterval(drawCharacter, 200);
    document.addEventListener('keydown', onKeydown);
    emit('action', 'STANDING');
});

onBeforeUnmount(() => {
  clearInterval(characterInterval);
  document.removeEventListener('keydown', onKeydown);
});


</script>

<style scoped>

#ch1 {
    width:70px;
    height:80px; 
    background-image: url('../assets/ken.png') ;
}

</style>