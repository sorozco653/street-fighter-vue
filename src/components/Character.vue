<template>
    <div id="ch1" class="character" ref="kenRef"></div>
    <div class="character hadoken" ref="hadokenRef" :class="{ moving: showHadoken }"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import { ICharacterActionsMap, Actions, ICharacterKeydownMap, KEYBOARD_KEYS, SPRITE_HEIGHT, SPRITE_WIDTH, X_DISTANCE } from '../constants';

const CHARACTER_ACTIONS: ICharacterActionsMap = { // X is base on the number of sprites...
    BEAM: { Y: 0, X: [0, 1, 2, 3] },
    STANDING: { Y: 1, X: [0, 1, 2, 3] },
    PUNCH: { Y: 2, X: [0, 1, 2] },
    WALK_RIGHT: { Y: 3, X: [0, 1, 2] },
    WALK_LEFT: { Y: 3, X: [2, 3, 4] },
    KICK: { Y: 6, X: [0, 1, 2, 3, 4] },
    ROUND_HOUSE: { Y: 7, X: [0, 1, 2, 3, 4]},
    KNEEL: { Y: 9, X: [0] },
};

const SPECIAL_ACTIONS = {
    START_HADOKEN: { Y: 4, X: [0, 1]},
    END_HADOKEN: { Y: 5, X: [0, 1, 3, 4]},
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
const hadokenRef: Ref = ref(null);
const showHadoken = ref(false);
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


let beamCount: number = 0;
let beam_X = 0;
function drawBeamSprite(): void {
    
    if(hadokenRef.value) {
        hadokenRef.value.style.backgroundPositionY = `${SPECIAL_ACTIONS['START_HADOKEN'].Y * SPRITE_HEIGHT}px`;
        hadokenRef.value.style.backgroundPositionX = `${SPECIAL_ACTIONS['START_HADOKEN'].X[beamCount++] * SPRITE_WIDTH}px`;
        
        hadokenRef.value.style.left = `${beam_X-=SPRITE_WIDTH}px`;

        if (beam_X > 621) { // width of the img
            showHadoken.value = false;
            beam_X = ch_X;
            hadokenRef.value.style.left = ch_X;
        }
    }

}

function updateCoordinates(){
    if (count >= CHARACTER_ACTIONS[action].X.length) {
        setAction('STANDING'); // Default to Standing
    };

    if (count >= SPECIAL_ACTIONS['START_HADOKEN'].X.length) {
        beamCount = 0   
    }


    switch(action) {
        case 'WALK_LEFT': {
            return ch_X-=X_DISTANCE
        };
        case 'WALK_RIGHT': {
            return ch_X+=X_DISTANCE;
        }
        case 'BEAM': {
            beam_X = ch_X;
            return showHadoken.value = true;
        };
        default: {
            return ''
        }
    };
}

function drawCharacter() {
    updateCoordinates()
    drawSprite();

    if (showHadoken.value) {
        drawBeamSprite();
    }
}

// Life Cycle Events; 
onMounted(() => {
    characterInterval = setInterval(drawCharacter, 150);
    document.addEventListener('keydown', onKeydown);
    emit('action', 'STANDING');
});

onBeforeUnmount(() => {
  clearInterval(characterInterval);
  document.removeEventListener('keydown', onKeydown);
});


</script>

<style scoped>

.hadoken {
    visibility: hidden;
}

.moving {
    visibility: visible;
}

</style>    