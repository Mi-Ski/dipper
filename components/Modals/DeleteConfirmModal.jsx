import React from "react";
import Modal from "./Modal";

const DeleteConfirmModal = () => {
  return (
    <Modal>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[40]"
        onClick={() => setModalActive(false)}
      >
        <div
          // stop event bubbling to the parent so only background hides the modal
          onClick={(e) => e.stopPropagation()}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white"
        >
					<h2>Delete post?</h2>
        </div>
      </div>
      , document.body
    </Modal>
  );
};

export default DeleteConfirmModal;
