import {
	App,
	PluginSettingTab,
	Setting,
	TextComponent,
	Notice,
} from "obsidian";
import WidgetsPlugin from "@/plugin";
import Sortable from "sortablejs";
import { DEFAULT_SETTINGS } from "@/settings/config";

export class WidgetsPluginSettingTab extends PluginSettingTab {
	plugin: WidgetsPlugin;

	constructor(app: App, plugin: WidgetsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h1", { text: "Widgets" });
		containerEl.createEl("p", { text: "Created by " }).createEl("a", {
			text: "bingryan 🤓",
			href: "https://github.com/bingryan",
		});
		containerEl.createEl("h2", { text: "Widgets Pomodoro Settings" });

		new Setting(containerEl)
			.setName("Pomodoro Alarm")
			.setClass("widgets-setting-item")
			.setDesc(
				`This selects a music from pomodoro music as an alarm clock`
			)
			.addDropdown((dropdown) => {
				let chooses: Record<string, string> = {};
				this.plugin.settings.pomodoro.musicOrder.map(
					(label) => (chooses[label] = label)
				);
				dropdown.addOptions(chooses);
				dropdown
					.setValue(this.plugin.settings.pomodoro.alarm)
					.onChange((label) => {
						this.plugin.settings.pomodoro.alarm = label;
						this.plugin.saveSettings();
						this.plugin.saveData(this.plugin.settings);
						this.display();
					});
			});

		new Setting(this.containerEl)
			.setName("Pomodoro Session Time")
			.setClass("widgets-setting-item")
			.setDesc("How long time(millisecond) by a single session?(need reload obsidian)")
			.addText((textfield) => {
				textfield.setPlaceholder(
					String(DEFAULT_SETTINGS.pomodoro.sessionTime)
				);
				textfield.inputEl.type = "number";
				textfield.setValue(String(this.plugin.settings.pomodoro.sessionTime));
				textfield.onChange(async (value) => {	  
					this.plugin.settings.pomodoro.sessionTime = Number(value);
					this.plugin.saveSettings();
					this.plugin.saveData(this.plugin.settings);
					this.display();
				});
			});

		const pomodoroSetting = new Setting(containerEl);

		pomodoroSetting
			.setName("Pomodoro Music")
			.setClass("widgets-setting-item")
			.setClass("widgets-pomodoro-setting-item")
			.setDesc(`Enter the url of the audio to play, and label it`);

		const labelInput = new TextComponent(pomodoroSetting.controlEl);
		labelInput.setPlaceholder("Label name");
		labelInput.inputEl.addClass("widgets-pomodoro-settings-audio-label");

		const urlInput = new TextComponent(pomodoroSetting.controlEl);
		urlInput.setPlaceholder("Audio url");
		urlInput.inputEl.addClass("widgets-pomodoro-settings-audio-value");

		pomodoroSetting.addButton((button) => {
			button
				.setClass("widgets-pomodoro-settings-button-add")
				.setIcon("checkmark")
				.setTooltip("Save")
				.onClick(async (buttonEl: any) => {
					let label = labelInput.inputEl.value.replace(" ", "-");
					let url = urlInput.inputEl.value;

					if (label && url) {
						if (
							!this.plugin.settings.pomodoro.musicOrder.includes(
								label
							)
						) {
							this.plugin.settings.pomodoro.musicOrder.push(
								label
							);
							this.plugin.settings.pomodoro.musics[label] = url;
							await this.plugin.saveSettings();
							this.display();
						} else {
							buttonEl.stopImmediatePropagation();
							new Notice("This url already exists");
						}
					} else {
						new Notice("input value is empty");
					}
				});
		});
		const widgetsPomodoroSettingsTabsContainer = containerEl.createEl(
			"div",
			{
				cls: "widgets-pomodoro-settings-tabs-container",
			}
		);

		Sortable.create(widgetsPomodoroSettingsTabsContainer, {
			animation: 500,
			ghostClass: "widgets-pomodoro-sortable-ghost",
			chosenClass: "widgets-pomodoro-sortable-chosen",
			dragClass: "widgets-pomodoro-sortable-drag",
			dragoverBubble: true,
			forceFallback: true,
			fallbackClass: "widgets-pomodoro-sortable-fallback",
			easing: "cubic-bezier(1, 0, 0, 1)",
			onSort: (command: { oldIndex: number; newIndex: number }) => {
				const arrayResult = this.plugin.settings.pomodoro.musicOrder;
				const [removed] = arrayResult.splice(command.oldIndex, 1);
				arrayResult.splice(command.newIndex, 0, removed);
				this.plugin.settings.pomodoro.musicOrder = arrayResult;
				this.plugin.saveSettings();
			},
		});

		this.plugin.settings.pomodoro.musicOrder.forEach((label) => {
			const icon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(96.862745%,22.352941%,45.490196%);fill-opacity:1;" d="M 24 12 C 24 18.621094 18.621094 24 12 24 C 5.378906 24 0 18.621094 0 12 C 0 5.378906 5.378906 0 12 0 C 18.621094 0 24 5.378906 24 12 Z M 24 12 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(86.666667%,2.745098%,44.705882%);fill-opacity:1;" d="M 12 0 C 18.621094 0 24 5.378906 24 12 C 24 18.621094 18.621094 24 12 24 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.941176%,14.901961%,43.137255%);fill-opacity:1;" d="M 3.523438 3.523438 C 8.207031 -1.160156 15.792969 -1.160156 20.476562 3.523438 C 25.160156 8.207031 25.160156 15.792969 20.476562 20.476562 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(86.666667%,2.745098%,44.705882%);fill-opacity:1;" d="M 10.296875 17.457031 C 10.21875 17.457031 10.101562 17.417969 10.027344 17.378906 C 9.832031 17.304688 9.675781 17.070312 9.675781 16.878906 L 9.675781 9.640625 C 9.675781 9.445312 9.832031 9.214844 10.027344 9.136719 C 10.21875 9.058594 10.453125 9.058594 10.644531 9.175781 L 15.5625 12.8125 C 15.714844 12.929688 15.792969 13.082031 15.792969 13.277344 C 15.792969 13.472656 15.714844 13.625 15.5625 13.742188 L 10.644531 17.378906 C 10.527344 17.417969 10.414062 17.457031 10.296875 17.457031 Z M 10.296875 17.457031 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 10.296875 16.179688 C 10.21875 16.179688 10.101562 16.140625 10.027344 16.101562 C 9.832031 16.027344 9.675781 15.792969 9.675781 15.601562 L 9.675781 8.359375 C 9.675781 8.167969 9.832031 7.933594 10.027344 7.859375 C 10.21875 7.78125 10.453125 7.78125 10.644531 7.898438 L 15.5625 11.535156 C 15.714844 11.652344 15.792969 11.804688 15.792969 12 C 15.792969 12.195312 15.714844 12.347656 15.5625 12.464844 L 10.644531 16.101562 C 10.527344 16.140625 10.414062 16.179688 10.296875 16.179688 Z M 10.296875 16.179688 "/></g></svg>`;
			const settingItem =
				widgetsPomodoroSettingsTabsContainer.createEl("div");
			settingItem.addClass("widgets-pomodoro-item-draggable");
			const labelIcon = settingItem.createEl("span");
			labelIcon.addClass("widgets-pomodoro-setting-icon");
			labelIcon.innerHTML = icon;
			const audio = labelIcon.createEl("audio");
			audio.addClass("widgets-pomodoro-setting-audio");
			audio.src = this.plugin.settings.pomodoro.musics[label];

			labelIcon.onclick = () => {
				if (audio.paused) {
					audio.play();
				} else {
					audio.pause();
				}
			};

			new Setting(settingItem)
				.setClass("widgets-pomodoro-audio-delete")
				.setName(label)
				.setDesc(this.plugin.settings.pomodoro.musics[label])
				.addButton((button) => {
					button
						.setClass("widgets-pomodoro-audio-delete-btn")
						.setIcon("trash")
						.setTooltip("Remove")
						.onClick(async () => {
							new Notice(`${label} music deleted`);
							delete this.plugin.settings.pomodoro.musics[label];
							this.plugin.settings.pomodoro.musicOrder.remove(
								label
							);
							await this.plugin.saveSettings();
							this.display();
						});
				});
		});
	}
}
