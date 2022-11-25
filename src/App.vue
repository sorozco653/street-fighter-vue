<template>
  <div class="playground" v-if="hasName">
    <h1 class="fighter-header">Street Vue Fighter: {{ userName}} </h1>

    <h2>Current Action: {{ displayAction }} </h2>
    <div id="field">
      <Character @action="(text) => displayAction = text"  />
      </div>
      
    <h2>Directions</h2>
    <ul class="directions">
      <li>Arrow keys (up, down, left, right): have the character move</li>
      <li>A: Punch</li>
      <li>S: Kick</li>
      <li>D: Beam?</li>
      <li>F: Round House</li>
    </ul>
  </div>
  
  <form class="welcome" @submit.prevent="startGame" v-else>
    <h1>Welcome,</h1>
    <input class="user-input" type="text" placeholder="Figther" v-model="userName">
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Character from './components/Character.vue';

const displayAction = ref('');
const hasName = ref(false);
const userName = ref('');

function startGame() {
  hasName.value = userName.value.length > 0;
}


</script>

<style scoped>

#field {
	background-image: url('./assets/background_blanka.gif');
	width:621px;
	height:224px;
	position:relative;
  margin: 1rem auto;
  scale: 1.5;
}

.welcome {
  margin-block-start: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.user-input {
  font-size: x-large;
  border: none;
  color-scheme: dark;
  padding-inline-start: 1rem;
}

.playground {
  text-align: center;
}

.fighter-header {
  margin-block-end: 1rem;
}

.directions {
  text-align: start;
  width: max-content;
  list-style-type: none;
  margin: 1rem auto;
}

</style>
