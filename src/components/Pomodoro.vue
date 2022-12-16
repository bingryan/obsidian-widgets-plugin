<template>
	<div class="watch flex-col">
		<div class="watch-container flex-col">
			<div class="watch-screen flex-col">
				<div class="action flex-row">
					<div class="btn-container flex-col">
						<span class="btn cancel" @click="cancel">Cancel</span>
					</div>
					<div class="btn-container flex-col">
						<span class="btn pause" @click="pause">Pause</span>
					</div>
					<div class="btn-container flex-col">
						<span class="btn start" @click="start">Start</span>
					</div>
				</div>
			</div>
		</div>
		<div class="main flex-col">
			<div class="time-container flex-row">
				<span class="time-screen">{{ clock }}</span>
			</div>
			<div class="music flex-row">
				<div class="playContainer">
					<li class="pre">
						<a href="#" title="pre"></a>
						<a href="#" title="pre"></a>
					</li>

					<li class="playpause">
						<input type="checkbox" value="None" id="playpause" name="check" />
						<label for="playpause"></label>
					</li>

					<li class="next playBtn">
						<a href="#" title="next"></a>
						<a href="#" title="next"></a>
					</li>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";

const data = reactive({
	sessionTime: 1500,
	timerStart: false,
});

let timer: number| NodeJS.Timer;

const clock = computed(() => {
	let min = '00'
	let sec = '00'

	if (data.sessionTime > 0) {
		min = ('0' + parseInt((data.sessionTime / 60).toString(), 10)).slice(-2)
		sec = ('0' + data.sessionTime % 60).slice(-2)
	}

	return `${min}:${sec}`
})


const start = () => {
	if (!data.timerStart) {
		timer = setInterval(() => {
			if (data.sessionTime > 0) {
				data.sessionTime--
			}
		}, 1000)
	}
	data.timerStart = true
}

const pause = () => {
	if (data.timerStart) {
		clearInterval(timer);
	}
	data.timerStart = false
}

const cancel = () => {
	clearInterval(timer);
	data.timerStart = false
	data.sessionTime = 1500
}



</script>
