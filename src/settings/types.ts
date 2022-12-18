export interface PomodoroConfig {
	sessionTime: number,
	alarm: string,
	musics: Musics,
	musicOrder: string[]
}

export interface Musics {
	[label: string]: string;
  }
