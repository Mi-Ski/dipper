import React, {useState} from "react";
import Modal from "./Modal";

const EditModal = ({modalInputVal, setModalActive,  editHandler}) => {
	const [modalInputVal2, setModalInputVal] = useState(modalInputVal)
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
          <h1>Modal</h1>
          <input
            value={modalInputVal2}
            onChange={(e) => setModalInputVal(e.target.value)}
            type="text"
          ></input>
          <button onClick={() => editHandler(modalInputVal2)}>OK</button>
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
