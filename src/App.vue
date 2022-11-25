<template>
  <h1>Street Vue Fighter</h1>
  <h2>Current Action: {{ displayAction }}</h2>
	<div id="field">
    <Character @action="(text) => displayAction = text"  />
	</div>

	<h2>Direction</h2>
	<ul>
		<li>Arrow keys (up, down, left, right): have the character move</li>
		<li>A: Punch</li>
		<li>S: Kick</li>
		<li>D: Beam?</li>
		<li>F: Round House</li>
	</ul>

	<h2>Street Fighter Mimic: Built with Vue</h2>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Character from './components/Character.vue';

const displayAction = ref('')


</script>

<style scoped>

#field {
	background-image: url('./assets/background_blanka.gif');
	width:621px;
	height:224px;
	position:relative;
}

</style>
