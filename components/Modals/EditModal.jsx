import React, {useState} from "react";
import Modal from "./Modal";

const EditModal = ({initialValue, setModalActive,  editHandler}) => {
	const [modalInputVal, setModalInputVal] = useState(initialValue)
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
          <h1>Edycja posta</h1>
          <input
            value={modalInputVal}
            onChange={(e) => setModalInputVal(e.target.value)}
            type="text"
          ></input>
          <button onClick={() => editHandler(modalInputVal)}>OK</button>
          <button onClick={() => setModalActive(false)}>
            Anuluj
          </button>
        </div>
      </div>
      , document.body
    </Modal>
  );
};

export default EditModal;