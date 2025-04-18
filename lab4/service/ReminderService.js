import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const STORAGE_KEY = "reminders";

const ONESIGNAL_APP_ID = Constants.expoConfig.extra.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = Constants.expoConfig.extra.ONESIGNAL_API_KEY;

export const ReminderService = {
    async loadReminders() {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    async saveReminders(reminders) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    },

    async addReminder({ caption, description, datetime }) {
        const reminders = await this.loadReminders();

        const response = await this.sendPushNotification({ caption, description, datetime });

        const newReminder = {
            id: Date.now().toString(),
            caption,
            description,
            datetime,
            notification_id: response.id,
        };

        const updated = [newReminder, ...reminders];
        await this.saveReminders(updated);

        return newReminder;
    },

    async deleteReminder(reminder) {
        const reminders = await this.loadReminders();
        const updated = reminders.filter((r) => r.id !== reminder.id);
        await this.saveReminders(updated);

        if (reminder.notification_id) {
            try {
                const response = await fetch(`https://api.onesignal.com/notifications/${reminder.notification_id}?app_id=${ONESIGNAL_APP_ID}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete notification: ${response.status}`);
                }

                console.log("Notification deleted:", reminder.notification_id);
            } catch (error) {
                console.error("Error deleting notification", error);
            }
        }
    },

    async sendPushNotification({ caption, description, datetime }) {
        const sendAfter = new Date(datetime).toISOString();
        const body = {
            app_id: ONESIGNAL_APP_ID,
            headings: { en: caption },
            contents: { en: description },
            included_segments: ["All"],
            send_after: sendAfter,
        };

        const response = await fetch("https://api.onesignal.com/notifications", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Basic ${ONESIGNAL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        return result;
    },
};
