import React, { useContext } from "react";
import WebsocketContext from "../../../context/WebsocketContext";
import Image from "next/image";
import { useUser } from "../../../context/UserContext";

const Notification = ({ notification }) => {
  const { setNotifications } = useContext(WebsocketContext);
  const currentUser = useUser();
  const sameUser = currentUser.id === notification.actionOwner?.id;

  const notificationClickHandler = (key) => {
    if (notification.type === "NEW_POST" && !sameUser) {
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
        <NotificationBody
          notification={notification}
          notificationMsg="właśnie dodał(a) nowy wpis"
          selfNofiticationMsg="Pomyślnie dodano nowy post"
          sameUser={sameUser}
          notificationClickHandler={notificationClickHandler}
        />
      );
    case "EDIT_POST":
      notification.color = "bg-yellow-500";

      return (
        <NotificationBody
          notification={notification}
          notificationMsg="właśnie edytował(a) swój wpis"
          selfNofiticationMsg="Pomyślnie edytowano posta"
          sameUser={sameUser}
          notificationClickHandler={notificationClickHandler}
        />
      );
    case "DELETE_POST":
      notification.color = "bg-purple-500";
      break;
    case "LIKE_POST":
      notification.color = "bg-purple-500";
      if (notification.post._id === currentUser.id) {
        return (
          <NotificationBody
            notification={notification}
            notificationMsg="polubił(a) Twój wpis"
            sameUser={false}
            notificationClickHandler={notificationClickHandler}
          />
        );
      }
      break;
    case "NEW_COMMENT":
      notification.color = "bg-purple-500";
      break;
    default:
      notification.color = "bg-gray-500";
  }
};

export default Notification;

export const NotificationBody = ({
  notification,
  notificationMsg,
  selfNofiticationMsg,
  sameUser,
  notificationClickHandler,
}) => {
  return (
    <div>
      {!sameUser && (
        <>
          <div
            className={`rounded-full relative  overflow-hidden w-14 max-w-[36px] h-9  ${
              notification.actionOwner.picture
                ? ""
                : "border-2 border-border-dark"
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
            `${notification.actionOwner.name} ${notificationMsg}`
          </p>
        </>
      )}
      {sameUser && (
        <div>
          <p
            className={`text-center text-xl px-5 py-2 mb-4 rounded-xl bg-green-500`}
            onClick={() => notificationClickHandler(notification.key)}
          >
            {selfNofiticationMsg}
          </p>
        </div>
      )}
    </div>
  );
};
