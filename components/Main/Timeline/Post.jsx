import { useState } from "react";
import { useRouter } from "next/router";

import { IconContext } from "react-icons";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineDelete,
} from "react-icons/ai";

import { MdModeEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

import Image from "next/image";
import Card from "../../Card";
import Modal from "../../Modals/Modal";
import Loading from "../../Loading";

import { useUser } from "../../../context/UserContext";

// 0, 5-21 osób
// 1 osoba
// 2-4 osoby
const osobaVariation = (liczba) => {
  if (liczba === 1) return "osoba lubi";
  if (liczba > 1 && liczba < 5) return "osoby lubią";
  if (liczba > 4 && liczba < 22) return "osób lubi";

  if (liczba > 21) {
    const lastDigit = liczba % 10;
    if (lastDigit > 1 && lastDigit < 5) return "osoby lubią";
    if (lastDigit === 0 || lastDigit === 1 || lastDigit > 4)
      return "osób";
  }

  // 0 osób
  return "osób lubi";
};

const Post = ({ _id, body, postedAt, likes, user }) => {
  // userid, name, nickname, picture
  const userContext = useUser();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  // like
  const [likesState, setLikesState] = useState(likes);

  const [loading, setLoading] = useState(false);

  const currentUserLiked = likesState.includes(userContext.id);
  const currentUser = userContext.id === user.id;
  const userLoggedIn = Boolean(userContext.id);

  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${user.name} na Dipper:`,
          text: `${body}`,
          url: `${user.name} na Dipper.pl: ${body}. Zobacz więcej na https://dipper.pl`,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Not supported");
    }
  };

  const likeHandler = async () => {
    if (!userLoggedIn) {
      return router.push("/api/auth/login");
    }

    setLoading(true);

    const action = currentUserLiked ? "$pull" : "$addToSet";
    console.log("action", action);

    await fetch("/api/tweets/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        userId: userContext.id,
        action,
      }),
    });

    setLikesState((likes) => {
      if (currentUserLiked) {
        return likes.filter((like) => like !== userContext.id);
      }
      return [...likes, userContext.id];
    });

    setLoading(false);
  };

  return (
    <>
      <Card
        classes={[
          "flex flex-col shadow-lg shadow-black/[.55] border lg:border-2 ",
        ]}
      >
        <div className="flex  border lg:border-2 px-10 py-7 border-r-transparent border-l-transparent border-t-transparent  border-b-border-dark border-solid">
          <div className="rounded-full overflow-hidden drop-shadow-[0px_10px_10px_#000]">
            <Image
              placeholder="blur"
              blurDataURL="https://via.placeholder.com/150"
              src={user.picture}
              alt="User Avatar"
              title={user.name}
              width={52}
              height={52}
              className="rounded-full "
            />
          </div>
          <div className="flex flex-1 flex-col ml-3">
            <div className="flex justify-between pt-1.5">
              <div className="flex flex-col ">
                <p className="font-medium">{user.nickname}</p>
                <p className="text-text-chill text-xs">{user.name}</p>
              </div>
              <p className="text-text-chill text-xs font-medium">
                {new Date(+postedAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-7 mb-5 text-lg ">{body}</div>
          </div>
        </div>
        <div className="flex items-end justify-between w-full px-10 py-5">
          <div className="flex">
            <div className="flex flex-col lg:flex-row sm:items-center">
              <p className="mb-2 lg:mb-0 lg:ml-4 text-text-chill font-medium ">
                {`${likesState.length} ${osobaVariation(
                  likesState.length
                )}`}{" "}
                to.
              </p>
              <button
                disabled={loading}
                onClick={likeHandler}
                className={`${
                  currentUserLiked
                    ? "bg-gradient-to-r from-neon-accent2 to-neon-accent border-text-chill"
                    : ""
                } flex items-center justify-start  text-button-like font-semibold hover:text-white py-2 px-4 border-2   border-border-dark hover:border-button-like rounded hover:bg-gradient-to-r from-neon-accent2 to-neon-accent`}
              >
                <div className="w-5 ">
                  <IconContext.Provider
                    value={{ color: "white", size: "100%" }}
                  >
                    {currentUserLiked ? (
                      <AiTwotoneLike />
                    ) : (
                      <AiOutlineLike />
                    )}
                  </IconContext.Provider>
                </div>
                <p className="font-semibold text-xs min-w-[6ch] tracking-wide mt-[2px]">
                  {currentUserLiked ? "Liked" : "Like"}
                </p>
              </button>
            </div>
            {loading && <Loading size="20" classes="ml-4" />}
          </div>
          <div className=" flex items-center">
            {currentUser && (
              <button className="border-[3px] border-border-dark hover:border-text-chill rounded-full p-2">
                <div className="w-5">
                  <IconContext.Provider
                    value={{ color: "white", size: "100%" }}
                  >
                    <AiOutlineDelete />
                  </IconContext.Provider>
                </div>
              </button>
            )}
            {currentUser && (
              <button
                onClick={() => setModal(true)}
                className="border-[3px] border-border-dark hover:border-text-chill rounded-full p-2 ml-1.5"
              >
                <div className="w-5">
                  <IconContext.Provider
                    value={{ color: "white", size: "100%" }}
                  >
                    <MdModeEdit />
                  </IconContext.Provider>
                </div>
              </button>
            )}
            <button
              onClick={shareHandler}
              className="border-[3px] border-border-dark hover:border-text-chill rounded-full p-2 ml-1.5"
            >
              <div className="w-5">
                <IconContext.Provider
                  value={{ color: "white", size: "100%" }}
                >
                  <IoShareSocialSharp />
                </IconContext.Provider>
              </div>
            </button>
          </div>
        </div>
      </Card>

      {modal && (
        <Modal>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]"
            onClick={() => setModal(false)}
          >
            <div
              // stop event bubbling to the parent so only background hides the modal
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white z-[3]"
            >
              <h1>Modal</h1>
              <button onClick={() => setModal(false)}>Close</button>
            </div>
          </div>
          , document.body
        </Modal>
      )}
    </>
  );
};

export default Post;
