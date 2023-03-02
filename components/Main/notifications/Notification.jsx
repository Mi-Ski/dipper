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
          selfNofiticationMsg="Dodano nowy wpis"
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
      // only show notification if current user has his own post liked
      if (notification.actionOwner.id === currentUser.id) {
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
    <div className="cursor-default">
      {!sameUser && (
        <div
          className={`ease-in-out flex items-center mb-4 ${notification.color} rounded-xl px-3`}
        >
          <div
            className={` relative  overflow-hidden w-14 max-w-[36px] h-9   ${
              notification.post.user.picture
                ? ""
                : "border-2 border-border-dark rounded-full"
            }`}
          >
            <Image
              placeholder="blur"
              blurDataURL="https://via.placeholder.com/150"
              src={
                notification.post.user.picture
                  ? notification.post.user.picture
                  : "/profilepic-placeholder.png"
              }
              alt="notification.post Avatar"
              title={notification.post.name}
              layout="fill"
              className="rounded-full "
            />
          </div>
          <p
            className={`ml-3 text-center text-base  py-2  rounded-xl `}
            onClick={() => notificationClickHandler(notification.key)}
          >
            <span className="font-bold text-lg">{`${notification.post.user.name}`}</span>{" "}
            {`${notificationMsg}`}
          </p>
        </div>
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
