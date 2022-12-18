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
					<audio loop id="pomodoro-alarm"></audio>
				</div>
			</div>
		</div>
		<div class="main flex-col">
			<div class="time-container flex-row">
				<span class="time-screen">{{ clock }}</span>
			</div>
			<div class="music flex-row">
				<div class="playContainer">
					<li class="pre" @click.prevent="musicPre">
						<a href="#" title="pre"></a>
						<a href="#" title="pre"></a>
					</li>

					<li class="playpause">
						<input
							type="checkbox"
							@click="musicPlayPause"
							value="None"
							id="playpause"
							name="check"
						/>
						<label for="playpause"></label>
					</li>

					<li class="next playBtn" @click.prevent="musicNext">
						<a href="#" title="next"></a>
						<a href="#" title="next"></a>
					</li>

					<audio loop id="pomodoro-audio"></audio>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, reactive, getCurrentInstance } from "vue";
import { WidgetsPluginSettings } from "@/settings/config";

const settings: WidgetsPluginSettings =
	getCurrentInstance()?.appContext.config.globalProperties.plugin.settings;

const data = reactive({
	sessionTime: settings.pomodoro.sessionTime,
	sessionTimeFlag: settings.pomodoro.sessionTime,
	timerStart: false,
	alarm: settings.pomodoro.alarm,
	musics: settings.pomodoro.musics,
	musicOrder: settings.pomodoro.musicOrder,
	musicIndex: 0,
});

let timer: number | NodeJS.Timer;

const clock = computed(() => {
	let min = "00";
	let sec = "00";

	if (data.sessionTime > 0) {
		min = ("0" + parseInt((data.sessionTime / 60).toString(), 10)).slice(
			-2
		);
		sec = ("0" + (data.sessionTime % 60)).slice(-2);
	}

	return `${min}:${sec}`;
});

const start = () => {
	const alarm: HTMLAudioElement = document.getElementById(
		"pomodoro-alarm"
	) as HTMLAudioElement;
	alarm.src = data.musics[data.alarm];
	if (!data.timerStart) {
		timer = setInterval(() => {
			if (data.sessionTime > 0) {
				data.sessionTime--;
			} else {
				alarm.play();
			}
		}, 1000);
	}
	data.timerStart = true;
};

const pause = () => {
	if (data.timerStart) {
		clearInterval(timer);
	}
	data.timerStart = false;
	alarmPause();
};

const cancel = () => {
	clearInterval(timer);
	data.timerStart = false;
	data.sessionTime = data.sessionTimeFlag;
	alarmPause();
};

const alarmPause = () => {
	const alarm: HTMLAudioElement = document.getElementById(
		"pomodoro-alarm"
	) as HTMLAudioElement;
	alarm.src = data.alarm;
	alarm.pause();
};

const getNextMusicLink = () => {
	let nextIndex = ++data.musicIndex;
	if (nextIndex >= data.musicOrder.length) {
		data.musicIndex = 0;
	}
	return data.musics[data.musicIndex];
};

const getPreMusicLink = () => {
	let nextIndex = --data.musicIndex;
	if (nextIndex === -1) {
		data.musicIndex = data.musicOrder.length - 1;
	}
	return data.musics[data.musicOrder[data.musicIndex]];
};

const musicPre = () => {
	const audio: HTMLAudioElement = document.getElementById(
		"pomodoro-audio"
	) as HTMLAudioElement;
	audio.src = getPreMusicLink();
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
};

const musicPlayPause = (e: Event) => {
	const audio: HTMLAudioElement = document.getElementById(
		"pomodoro-audio"
	) as HTMLAudioElement;
	if (!audio.src) {
		audio.src = data.musics[data.musicOrder[0]];
	}
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
};

const musicNext = () => {
	const audio: HTMLAudioElement = document.getElementById(
		"pomodoro-audio"
	) as HTMLAudioElement;
	audio.src = getNextMusicLink();
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
};
</script>
