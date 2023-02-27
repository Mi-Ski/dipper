import React, { useContext } from "react";
import WebsocketContext from "../../../context/WebsocketContext";
import Notification from "./Notification";

const Notifications = () => {
  const { notifications, setNotifications} =
    useContext(WebsocketContext);


  return (
    <div className="fixed right-0 bottom-0 mr-2 mb-2 z-[100] ">
      {notifications.length > 0 &&
        notifications.map((notification) => (
					<Notification key={notification.key} notification={notification}/>
        ))}
    </div>
  );
};

export default Notifications;
