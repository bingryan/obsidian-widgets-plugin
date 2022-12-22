import { ItemView, WorkspaceLeaf, Notice } from 'obsidian';
import { createApp, App } from 'vue';
import Pomodoro from '@/components/Pomodoro.vue';
import Calendar from '@/components/Calendar.vue';
import WidgetsPlugin from '@/plugin'

export const Widgets_ICON: string = "clock";
export const Widgets_VIEW_TYPE: string = 'widgets';

export class WidgetsView extends ItemView {
	calendarApp: App;
	pomodoroApp: App;
	plugin: WidgetsPlugin;
	constructor(leaf: WorkspaceLeaf, plugin: WidgetsPlugin) {
		super(leaf);
		this.plugin = plugin;
	}
	getViewType(): string {
		return Widgets_VIEW_TYPE;
	}
	getDisplayText(): string {
		return "widgets";
	}
	getIcon(): string {
		return Widgets_ICON;
	}
	async onOpen() {

		const widgetContainer = this.containerEl.children[1];

		let calendarEl = widgetContainer.createDiv({ cls: "calendar" });
		this.calendarApp = createApp(Calendar);
		this.calendarApp.config.globalProperties.container = calendarEl;
		this.calendarApp.config.globalProperties.plugin = this.plugin;
		this.calendarApp.mount(calendarEl);


		let pomodoroEl = widgetContainer.createDiv({ cls: "pomodoro" });
		this.pomodoroApp = createApp(Pomodoro);
		this.pomodoroApp.config.globalProperties.container = pomodoroEl;
		this.pomodoroApp.config.globalProperties.plugin = this.plugin;
		this.pomodoroApp.mount(pomodoroEl);
	}

	async onClose() {
		this.calendarApp.unmount();
		this.pomodoroApp.unmount();
	}
}
