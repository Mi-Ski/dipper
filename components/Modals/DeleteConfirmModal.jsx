import React from "react";
import Modal from "./Modal";
import Loading from "../Loading";

const DeleteConfirmModal = ({ setModalActive, deleteHandler,  loading }) => {


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
          <div className="px-10 pt-6  pb-2 space-y-10  rounded-xl flex flex-col text-lg justify-center items-center">
            <h1 className="text-lg font-semibold">Czy na pewno chcesz usunąć tego posta?</h1>
            <div className="flex space-x-10 ">
              <button
                onClick={() => setModalActive(false)}
                className="bg-brand-accent rounded-md px-5 py-1"
              >
                Anuluj
              </button>
              <button
                onClick={() => deleteHandler()}
                className="bg-border-dark min-w-[5em] hover:bg-red-500 rounded-md px-5 py-1 ease-in transition-all"
              >
								{loading ? <Loading size="20"/> : "Usuń"}
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
