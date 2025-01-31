import { useNavigate } from "react-router-dom";

const Modal = () => {
    const navigate = useNavigate();
    return (
        <div className="modalDiv">
            <div className="modal">
                <h3>Modal</h3>
                <button onClick={() => navigate(-1)}>Close</button>
            </div>
        </div>
    );
};

export default Modal;