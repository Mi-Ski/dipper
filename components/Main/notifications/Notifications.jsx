import React, { useContext } from "react";
import WebsocketContext from "../../../context/WebsocketContext";

const Notifications = () => {
  const { notifications, setNotifications} =
    useContext(WebsocketContext);

  const removeNotification = (key) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.key !== key)
    );
  };

  return (
    <div className="fixed right-0 bottom-0 mr-2 mb-2 z-[100] ">
      {notifications.length > 0 &&
        notifications.map((notification) => (
          <p
            key={notification.key}
            className={`text-center text-xl px-5 py-2 mb-4 rounded-xl bg-${notification.color}`}
						onClick={() => removeNotification(notification.key)}
          >
            {notification.message}
          </p>
        ))}
    </div>
  );
};

export default Notifications;
