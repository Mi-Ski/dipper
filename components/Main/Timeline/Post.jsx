import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { useUser } from "../../../context/UserContext";
import PostsContext from "../../../context/PostContext";

import { IconContext } from "react-icons";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

import Card from "../../Card";
import EditModal from "../../Modals/EditModal";
import DeleteConfirmModal from "../../Modals/DeleteConfirmModal";
import CommentsSection from "./Comments/CommentsSection";

import Loading from "../../Loading";
import PostBody from "./PostBody";

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
const Post = ({
  postObj,
  _id,
  body,
  postedAt,
  likes,
  comments,
  user,
}) => {
  // userid, name, nickname, picture
  // comments[{user<object>, body<array>}}]
  const userContext = useUser();
  const router = useRouter();
  const { posts, setPosts } = useContext(PostsContext);

  const [editModalActive, setEditModalActive] = useState(false);
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [likesState, setLikesState] = useState(likes);

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

  const addCommentHandler = async (commentBody) => {
    console.log(posts, "posts");
    console.log(comments, "comments");
    if (!userLoggedIn) {
      return router.push("/api/auth/login");
    }
    setAddCommentLoading(true);

    const body = {
      body: commentBody,
      user: {
        id: userContext.id,
        name: userContext.name,
        nickname: userContext.nickname,
        picture: userContext.picture,
      },
    };

    if (!userLoggedIn) {
      return router.push("/api/auth/login");
    } else if (commentBody.trim().length < 1) {
      return;
    } else {
      const response = await fetch("/api/tweets/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          postId: _id,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson, "addComment responseJson");

      setPosts(
        posts.map((post) => {
          if (post._id === _id) {
            return {
              ...post,
              comments: [...post.comments, body]
            };
          }

          return post;
        })
      );
      setAddCommentLoading(false);
    }
  };

  const deleteHandler = async () => {
    const response = await fetch(`/api/tweets/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    setDeleted(true);
  };

  const editHandler = async (updateObject) => {
    const response = await fetch("/api/tweets", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        body: updateObject,
      }),
    });

    const responseJson = await response.json();

    console.log(responseJson);

    setEditModalActive(false);

    console.log();

    setPosts(
      posts.map((post) => {
        if (post._id === _id) {
          return {
            ...post,
            body: updateObject,
          };
        }

        return post;
      })
    );
  };

  return (
    <>
      {!deleted && (
        <>
          <Card
            classes={[
              "flex flex-col shadow-lg shadow-black/[.55] border md:border-2 ",
            ]}
          >
            <PostBody body={body} user={user} postedAt={postedAt} />

            <div className="flex items-end justify-between w-full px-4 lg:px-10 py-3 lg:py-5">
              <div className="flex items-end lg:items-center">
                <div className="flex flex-col lg:flex-row-reverse sm:items-center">
                  <p className="mb-2 lg:mb-0 lg:ml-4 text-text-chill text-sm lg:text-base font-medium ">
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
                {loading && (
                  <Loading size="20" classes="ml-4 mb-2 lg:mb-0" />
                )}
              </div>
              <div className=" flex items-center">
                {currentUser && (
                  <button
                    onClick={() => setConfirmModalActive(true)}
                    className="border-[3px] border-border-dark hover:border-text-chill rounded-full p-2"
                  >
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
                    onClick={() => setEditModalActive(true)}
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
            <CommentsSection
              comments={comments}
              user={userContext}
              currentUser={currentUser}
              addCommentHandler={addCommentHandler}
              loading={addCommentLoading}
            />
          </Card>

          {editModalActive && (
            <EditModal
              initialValue={body}
              setModalActive={setEditModalActive}
              editHandler={editHandler}
            />
          )}
          {confirmModalActive && (
            <DeleteConfirmModal
              setModalActive={setConfirmModalActive}
              deleteHandler={deleteHandler}
            />
          )}
        </>
      )}
    </>
  );
};
export default Post;
