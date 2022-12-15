import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { WidgetsPluginSettings, DEFAULT_SETTINGS } from "./config";
import {PomodoroView} from './views/PomodoroView'

export default class WidgetsPlugin extends Plugin {
	settings: WidgetsPluginSettings;
	private pomodoroView: PomodoroView;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new WidgetsPluginSettingTab(this.app, this));

		this.registerViews();

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	registerViews() {
		this.registerView("pomodoro", (leaf) => new PomodoroView(leaf));
		this.activateView("pomodoro", "right");
	}

	async activateView(viewType: string, side: "left" | "right" | "tab") {
		if (this.app.workspace.getLeavesOfType(viewType).length === 0) {
			let leaf;
			switch (side) {
				case "left":
					leaf = this.app.workspace.getLeftLeaf(false);
					break;
				case "right":
					leaf = this.app.workspace.getRightLeaf(false);
					break;
				case "tab":
					leaf = this.app.workspace.getLeaf("tab");
					break;
			}
			await leaf.setViewState({
				type: viewType,
				active: true,
			});
		}
		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(viewType)[0]
		);
	}
}


class WidgetsPluginSettingTab extends PluginSettingTab {
	plugin: WidgetsPlugin;

	constructor(app: App, plugin: WidgetsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
