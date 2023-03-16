import React, { Component } from "react";
import { connect } from "react-redux";

import "./backGround.css";
import SeatRowSel from "./SeatRowSel";

class ModalBooking extends Component {
  renderSeat = (data) => {
    return data.map((seatList, id) => {
      return <SeatRowSel key={id} seatList={seatList} />;
    });
  };

  state = {
    inputName: "",
    inputAge: "",
    inputNum: 1,
    nameValid: false,
    ageValid: false,
    isDisable: true,
  };

  checkValid = () => {
    if (
      (isNaN(this.state.inputAge) || this.state.inputAge === "") &&
      this.state.inputName === ""
    ) {
      this.setState({
        nameValid: true,
        ageValid: true,
        isDisable: true,
      });
      return true;
    }
    if (this.state.inputName === "" && isNaN(this.state.inputAge) === false) {
      this.setState({
        nameValid: true,
        ageValid: false,
        isDisable: true,
      });
      return true;
    }
    if (
      (this.state.inputAge === "" || isNaN(this.state.inputAge)) &&
      this.state.inputName !== ""
    ) {
      this.setState({
        ageValid: true,
        nameValid: false,
        isDisable: true,
      });

      return true;
    }

    this.setState({
      nameValid: false,
      ageValid: false,
      isDisable: false,
    });
    return false;
  };

  handleChangeName = (event) => {
    this.setState({
      inputName: event.target.value,
    });
  };
  handleChangeAge = (event) => {
    this.setState({
      inputAge: event.target.value,
    });
  };
  handleChangeNum = (event) => {
    this.setState({
      inputNum: event.target.value,
    });
  };

  render() {
    let { data } = this.props;
    return (
      <div className="modalIndex">
        <div
          className="modal fade text-start"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                  Thông tin khách hàng
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ho va ten"
                    value={this.state.inputName}
                    onChange={this.handleChangeName}
                    // onBlur={this.checkValid}
                  />
                  {this.state.nameValid ? (
                    <p className="text-danger fw-semibold">
                      Please fill your name!
                    </p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Ngày sinh"
                    value={this.state.inputAge}
                    // onBlur={this.checkValid}
                    onChange={this.handleChangeAge}
                  />
                  {this.state.ageValid ? (
                    <p className="text-danger fw-semibold">
                      Your input is incorrect!
                    </p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Số chỗ ngồi
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput3"
                    required
                    min={1}
                    value={this.state.inputNum}
                    onChange={this.handleChangeNum}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {this.state.ageValid ||
                this.state.nameValid ||
                this.state.isDisable ? (
                  <button className="btn btn-danger" onClick={this.checkValid}>
                    Tiếp tục
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    onClick={() => {
                      this.props.onGetInfo(this.state);
                    }}
                  >
                    Tiếp tục
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                  Lựa chọn vị trí xem phim
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body m-auto">{this.renderSeat(data)}</div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    this.props.onBooking();
                    this.setState({
                      inputName: "",
                      inputAge: "",
                      isDisable: true,
                      inputNum: 1,
                    });
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetInfo: (state) => {
      const action = {
        type: "GET_INFO",
        payload: state,
      };
      dispatch(action);
    },
    onBooking: () => {
      const action = {
        type: "BOOK_SUCCESS",
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalBooking);
