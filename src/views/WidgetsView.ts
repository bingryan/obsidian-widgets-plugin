import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp, App } from 'vue';
import Pomodoro from '@/components/Pomodoro.vue';
import WidgetsPlugin from '@/plugin'

export const Widgets_ICON = "clock";
export const Widgets_VIEW_TYPE = 'widgets';

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

		// const calendarEl = widgetContainer.createDiv({ cls: "calendar" });
		// this.calendarApp = createApp(Calendar);
		// this.calendarApp.config.globalProperties.container = calendarEl;
		// this.calendarApp.config.globalProperties.plugin = this.plugin;
		// this.calendarApp.mount(calendarEl);

		const pomodoroEl = widgetContainer.createDiv({ cls: "pomodoro" });
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
