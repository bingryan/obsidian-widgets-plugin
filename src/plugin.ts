import { Plugin } from "obsidian";
import { WidgetsPluginSettings, DEFAULT_SETTINGS } from "@/settings/config";
import { WidgetsView } from "@/views/WidgetsView";
import { WidgetsPluginSettingTab } from "@/settings/settingsTab";


export default class WidgetsPlugin extends Plugin {
	settings: WidgetsPluginSettings;
	private widgetsView: WidgetsView;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new WidgetsPluginSettingTab(this.app, this));

		this.registerViews();
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	registerViews() {
		this.registerView("widgets", (leaf) => new WidgetsView(leaf, this));
		this.activateView("widgets", "right");
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
