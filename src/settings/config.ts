import { PomodoroConfig } from '@/settings/types';


export interface WidgetsPluginSettings {
	pomodoro: PomodoroConfig;
}

export const DEFAULT_SETTINGS: WidgetsPluginSettings = {
	pomodoro: {
		sessionTime: 8,
		alarm: 'bell',
		musics: {
			bell: "https://soundbible.com/mp3/tolling-bell_daniel-simion.mp3",
			sawing: "https://soundbible.com/mp3/sawing-wood-daniel_simon.mp3",
			daniel: "https://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3",
		},
		musicOrder: [
			"bell",
			"sawing",
			"daniel"
		]
	}
};
