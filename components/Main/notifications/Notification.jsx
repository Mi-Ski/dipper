import React, { useContext } from "react";
import WebsocketContext from "../../../context/WebsocketContext";
import Image from "next/image";

const Notification = ({ notification }) => {
  const { setNotifications } = useContext(WebsocketContext);

  const notificationClickHandler = (key) => {
    if (notification.type === "NEW_POST") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setNotifications((prev) =>
      prev.filter((notification) => notification.key !== key)
    );
  };

  switch (notification.type) {
    case "NEW_POST":
      notification.color = "bg-green-500";
      return (
        <div>
          <div
            className={`rounded-full relative  overflow-hidden w-14 max-w-[36px] h-9  ${
              notification.actionOwner.picture ? "" : "border-2 border-border-dark"
            }`}
          >
            <Image
              placeholder="blur"
              blurDataURL="https://via.placeholder.com/150"
              src={
                notification.actionOwner.picture
                  ? notification.actionOwner.picture
                  : "/profilepic-placeholder.png"
              }
              alt="notification.actionOwner Avatar"
              title={notification.actionOwner.name}
              layout="fill"
              className="rounded-full "
            />
          </div>
          <p
            className={`text-center text-xl px-5 py-2 mb-4 rounded-xl ${notification.color}`}
            onClick={() => notificationClickHandler(notification.key)}
          >
            {notification.actionOwner.name} napisał nowego posta!
          </p>
        </div>
      );
    case "SELF-NEW_POST":
      return (
        <div>
          <p
            className={`text-center text-xl px-5 py-2 mb-4 rounded-xl bg-green-500`}
            onClick={() => notificationClickHandler(notification.key)}
          >
            Wpis wysłany!
          </p>
        </div>
      );
    case "NEW_LIKE":
      notification.color = "bg-yellow-500";
      break;
    case "NEW_FOLLOW":
      notification.color = "bg-purple-500";
      break;
    default:
      notification.color = "bg-gray-500";
  }
};

export default Notification;
