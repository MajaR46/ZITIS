const webpush = require("web-push");
const fs = require("fs");

const VAPID_KEYS_FILE = "vapidKeys.json";
let vapidKeys;

if (fs.existsSync(VAPID_KEYS_FILE)) {
  vapidKeys = JSON.parse(fs.readFileSync(VAPID_KEYS_FILE, "utf8"));
} else {
  vapidKeys = webpush.generateVAPIDKeys();
  fs.writeFileSync(VAPID_KEYS_FILE, JSON.stringify(vapidKeys));
}

webpush.setVapidDetails(
  "mailto:emilijadunoska@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptions = [];

function registerSubscription(req, res) {
  const subscription = req.body;
  subscriptions.push(subscription);
  res
    .status(201)
    .json({ success: true, message: "Subscription registered successfully" });
}

function sendNotification(req, res) {
  const { message, recipient } = req.body;

  const recipientSubscription = subscriptions.find(
    (sub) => sub.endpoint === recipient
  );

  if (!recipientSubscription) {
    return res
      .status(404)
      .json({ success: false, message: "Recipient subscription not found" });
  }

  const notificationPayload = JSON.stringify({
    title: "Push Notification 1.",
    body: message,
  });

  webpush
    .sendNotification(recipientSubscription, notificationPayload)
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send notification" });
    });
}

module.exports = { registerSubscription, sendNotification };
