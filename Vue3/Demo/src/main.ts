import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { TUIComponents, TUIChatKit } from "./TUIKit";
import { TUIStore, StoreName, TUITranslateService } from "@tencentcloud/chat-uikit-engine";
import TUINotification from "./TUIKit/components/TUINotification/index";
import { locales } from "./locales";
// ------ 以下是 TUIRoom 相关依赖的引入，如果您不需要使用 TUIRoom，请删除以下代码 ------
// import { createPinia } from 'pinia';
// import RoomVueI18n from './TUIKit/TUIRoom/locales/index';
// ----------------------------------------------------------------------------

const app = createApp(App);
app.use(router);
// ------ 以下是 TUIRoom 相关依赖的引入，如果您不需要使用 TUIRoom，请删除以下代码 ------
// app.use(createPinia());
// app.use(RoomVueI18n);
// ----------------------------------------------------------------------------
app.mount("#app");

const SDKAppID = 1600036474; // Your SDKAppID
const secretKey = "a2725bb024b32ca85f2b151072f779010aabe0b00fd7e84e273c89eb44aa5404"; // Your secretKey

TUIChatKit.components(TUIComponents, app);
TUIChatKit.init();

TUITranslateService.provideLanguages(locales);
TUITranslateService.useI18n();

/**
 * Init TUINotification configuration.
 */
TUINotification.setNotificationConfiguration({
	showPreviews: true,
	allowNotifications: true,
	notificationTitle: "Tencent Cloud Chat",
	notificationIcon: "https://web.sdk.qcloud.com/im/demo/latest/faviconnew.png",
});

/**
 * Listen for new messages and use notification components.
 * This capability is only available in the web environment.
 */
TUIStore.watch(StoreName.CHAT, {
	newMessageList: (newMessageList: unknown) => {
		if (Array.isArray(newMessageList)) {
			newMessageList.forEach((message) => TUINotification.notify(message));
		}
	},
});

export { SDKAppID, secretKey };
