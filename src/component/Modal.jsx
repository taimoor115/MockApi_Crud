import { MdDelete } from "react-icons/md";
import { destroyUser } from "../store/features/userSlice";
import { useDispatch } from "react-redux";

const Modal = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <MdDelete />
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => dispatch(destroyUser(id))}
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
