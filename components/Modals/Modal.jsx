import ReactDOM from "react-dom";

const Modal = ({ message, isOpen, onClose, children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Modal;