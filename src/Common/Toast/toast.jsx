import { NotificationManager } from "react-notifications";

class Toaster {
  constructor() {
    this.counter = 0;
    this.timer = null;
  }

  // reset counter value & clear timer
  resetCounter() {
    this.counter = 0;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // common method to show notification & restrict only 1 notification to display at a time
  showNotification(
    type,
    message,
    title = type.charAt(0).toUpperCase() + type.slice(1),
    duration = 3000,
    cb = () => {}
  ) {
    if (this.counter === 0) {
      this.counter = 1;
      NotificationManager[type](message, title, duration, () => {
        cb();
        this.resetCounter();
      });
      this.timer = setTimeout(() => {
        this.resetCounter();
      }, duration);
    }
  }

  // different methods for different types of notifications
  success(message, title) {
    this.showNotification("success", message, title);
  }

  warning(message, title) {
    this.showNotification("warning", message, title);
  }

  error(message, title) {
    this.showNotification("error", message, title);
  }

  info(message, title) {
    this.showNotification("info", message, title);
  }
}

export const customToast = new Toaster();
