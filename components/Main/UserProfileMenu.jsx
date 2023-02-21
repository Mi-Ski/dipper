import React from "react";

const UserProfileMenu = ({user}) => {
	console.log(user, "UserProfileMenu");

  return (
    <div>
      <h1 className="absolute top-full bg-border-dark">
        Menu użytkownika
      </h1>
    </div>
  );
};

export default UserProfileMenu;
