import "dotenv/config";

export default {
    expo: {
        name: "MyApp",
        slug: "my-app",
        version: "1.0.0",
        extra: {
            ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
            ONESIGNAL_API_KEY: process.env.ONESIGNAL_API_KEY,
        },
    },
};
