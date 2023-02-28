import React from "react";
import Modal from "./Modal";

const DeleteConfirmModal = ({ setModalActive, deleteHandler }) => {
  return (
    <Modal>
      <div
        className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-[40]"
        onClick={() => setModalActive(false)}
      >
        <div
          // stop event bubbling to the parent so only background hides the modal
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 bg-bgcol-ui-dark rounded-xl shadow-xl z-[50] text-white"
        >
          <div className="px-10 py-8 border-2 space-y-6 border-brand-accent rounded-xl flex flex-col justify-center items-center">
            <h2>Czy na pewno chcesz usunąć tego posta?</h2>
            <div className="flex space-x-10 ">
              <button
                onClick={() => setModalActive(false)}
                className="bg-border-dark hover:bg-border-dark/[.9] rounded-md px-5 py-1"
              >
                Anuluj
              </button>
              <button
                onClick={() => deleteHandler()}
                className="bg-border-dark hover:bg-brand-accent rounded-md px-5 py-1 ease-in transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      , document.body
    </Modal>
  );
};

export default DeleteConfirmModal;
