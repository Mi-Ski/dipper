import React, { useState } from "react";
import Modal from "./Modal";
import Loading from "../Loading";

const EditModal = ({ initialValue, setModalActive, editHandler, loading }) => {
  const [modalInputVal, setModalInputVal] = useState(initialValue);
	const [errorMessage, setErrorMessage] = useState();


	const validateEdit = () => {
		if (modalInputVal.trim().length < 1) {
			return;
		}
		setErrorMessage(null)
		editHandler(modalInputVal);
	}

  return (
    <Modal>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-[40]"
        onClick={() => setModalActive(false)}
      >
        <div
          // stop event bubbling to the parent so only background hides the modal
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 bg-bgcol-ui-dark rounded-xl shadow-xl z-[50] text-white"
        >
          <h1 className="text-lg font-semibold">Edycja posta</h1>
          <textarea
            className="transition-all w-[70vw] mt-5 mb-5 md:w-[30vw] duration-100 ease-in-out block outline-none  focus:outline-2   focus:outline-neon-accent-opaque  bg-contrast-posts  px-4 py-3 rounded-md flex-1 min-h-[3rem] "
            onInput={(e) => setModalInputVal(e.target.value)}
            value={modalInputVal}
            rows={5}
            // 1.5rem = line height p-1 = 0.25rem
          ></textarea>
          <div className="flex space-x-10 ">
            <button
              onClick={() => setModalActive(false)}
              className="text-lg bg-border-dark hover:bg-red-500 rounded-md px-5 py-1 ease-in transition-all"
            >
              Anuluj
            </button>
            <button
              onClick={validateEdit}
              className="text-lg bg-brand-accent rounded-md px-5 py-1 min-w-[4em]"
            >
								{loading ? <Loading size="20"/> : "OK"}
            </button>
          </div>
        </div>
      </div>
      , document.body
    </Modal>
  );
};

export default EditModal;
