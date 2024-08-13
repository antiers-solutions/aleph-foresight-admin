import { NotificationManager } from "react-notifications";
import { customToast } from "./toast";

jest.mock("react-notifications", () => ({
  NotificationManager: {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));

describe("Toaster", () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // jest.useRealTimers();
  //   customToast.resetCounter(); // Ensure the counter is reset after each test
  // });
  beforeEach(() => {
    jest.clearAllMocks();
    customToast.resetCounter(); // Ensure the counter and timer are reset
  });

  it("should display a success notification", () => {
    customToast.success("Success message", "Success title");

    expect(NotificationManager.success).toHaveBeenCalledWith(
      "Success message",
      "Success title",
      3000,
      expect.any(Function)
    );
    expect(customToast.counter).toBe(1);
  });

  it("should display an error notification", () => {
    customToast.error("Error message", "Error title");

    expect(NotificationManager.error).toHaveBeenCalledWith(
      "Error message",
      "Error title",
      3000,
      expect.any(Function)
    );
    expect(customToast.counter).toBe(1);
  });

  it("should display an info notification", () => {
    customToast.info("Info message", "Info title"); // Call the correct method

    expect(NotificationManager.info).toHaveBeenCalledWith(
      "Info message",
      "Info title",
      3000,
      expect.any(Function)
    );
    expect(customToast.counter).toBe(1);
  });

  it("should display a warning notification", () => {
    customToast.warning("Warning message", "Warning title"); // Call the correct method

    expect(NotificationManager.warning).toHaveBeenCalledWith(
      "Warning message",
      "Warning title",
      3000,
      expect.any(Function)
    );
    expect(customToast.counter).toBe(1);
  });

  it("should display only one notification at a time", () => {
    jest.useFakeTimers();

    customToast.success("First message", "First title");
    customToast.success("Second message", "Second title");

    expect(NotificationManager.success).toHaveBeenCalledTimes(1);
    expect(NotificationManager.success).toHaveBeenCalledWith(
      "First message",
      "First title",
      3000,
      expect.any(Function)
    );

    jest.advanceTimersByTime(3000); // Fast-forward time

    customToast.success("Second message", "Second title");

    expect(NotificationManager.success).toHaveBeenCalledTimes(2);
    expect(NotificationManager.success).toHaveBeenCalledWith(
      "Second message",
      "Second title",
      3000,
      expect.any(Function)
    );
  });

  it("should reset counter after notification duration", () => {
    jest.useFakeTimers();

    customToast.success("Success message", "Success title");

    expect(customToast.counter).toBe(1);

    jest.advanceTimersByTime(3000);

    expect(customToast.counter).toBe(0);
  });

  it("should call the callback function after the notification", () => {
    const callback = jest.fn();

    customToast.showNotification(
      "info",
      "Info message",
      "Info title",
      3000,
      callback
    );

    const callbackFn = NotificationManager.info.mock.calls[0][3];
    callbackFn();

    expect(callback).toHaveBeenCalled();
    expect(customToast.counter).toBe(0);
  });
});
