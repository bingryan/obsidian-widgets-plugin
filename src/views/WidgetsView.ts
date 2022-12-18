import { ItemView, WorkspaceLeaf, } from 'obsidian';
import { createApp, App } from 'vue';
import Pomodoro from '@/components/Pomodoro.vue';
import WidgetsPlugin from '@/plugin'

export const Widgets_ICON: string = "clock";
export const Widgets_VIEW_TYPE: string = 'widgets';

export class WidgetsView extends ItemView {
	vueApp: App;
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
		// pomodoro
		const pomodoroContainer = this.containerEl.children[1]; // view-content
		let content = pomodoroContainer.createDiv({ cls: "pomodoro" });
		this.vueApp = createApp(Pomodoro);
		this.vueApp.config.globalProperties.container = content;
		this.vueApp.config.globalProperties.plugin = this.plugin;
		this.vueApp.mount(content);
		// add other widget
	}
	async onClose() {
		this.vueApp.unmount();
	}
}
