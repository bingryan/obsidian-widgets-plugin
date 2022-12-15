import { ItemView, WorkspaceLeaf, } from 'obsidian';
import { createApp, App } from 'vue';

import Pomodoro from '../components/Pomodoro.vue';

export const POMODORO_ICON: string = "clock";
export const POMODORO_VIEW_TYPE: string = 'pomodoro';

export class PomodoroView extends ItemView {
    vueApp: App;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }
    getViewType(): string {
        return POMODORO_VIEW_TYPE;
    }
    getDisplayText(): string {
        return "pomodoro";
    }
    getIcon(): string {
        return POMODORO_ICON;
    }
    async onOpen() {
        const container = this.containerEl.children[1]; // view-content
        let content = container.createDiv({ cls: "pomodoro" });

        this.vueApp = createApp(Pomodoro);
        this.vueApp.config.globalProperties.container = content;
        this.vueApp.mount(content);
    }
    async onClose() {
        this.vueApp.unmount();
    }
}
