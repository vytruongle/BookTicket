import React, { Component } from "react";
import data from "../data/data.json";
import SeatRow from "./SeatRow";

import "./backGround.css";
import ModalBooking from "./ModalBooking";
import { connect } from "react-redux";

class SeatSelect extends Component {
  renderSeat = () => {
    return data.map((seatList, id) => {
      return <SeatRow key={id} seatList={seatList} />;
    });
  };
  renderTable = (info) => {
    return info.map((item, id) => {
      return (
        <tr key={id} className="bookingMovie">
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.totalSeat}</td>
          <td>{item.numSeat.toString()}</td>
          <td>{item.price}</td>
          <td
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              this.props.onDelete(item);
            }}
          >
            X
          </td>
        </tr>
      );
    });
  };

  renderSum = (info) => {
    let sum = 0;
    info.map((item) => {
      return (sum += item.price);
    });
    return sum;
  };
  render() {
    let { info } = this.props;
    return (
      <div className="container">
        <div className="row item justify-content-between">
          <div className="col-6">
            <h1 className="bookingMovie" style={{ color: "orange" }}>
              ĐẶT VÉ XEM PHIM CYBERLEARN.VN
            </h1>
            <div style={{ marginBottom: "2%" }}>
              <p
                className="text-white bookingMovie"
                style={{ fontSize: "18px", fontWeight: "500" }}
              >
                Màn hình
              </p>
              <div className="screen"></div>
            </div>
            <div className="d-flex flex-column align-items-center">
              {this.renderSeat()}
            </div>
          </div>

          {/* Danh sach ghế bạn chọn */}
          <div className="col-5 text-white">
            <h1 className="bookingMovie">DANH SÁCH GHẾ BẠN CHỌN</h1>
            <div className="d-flex align-items-baseline justify-content-between">
              {/* Chú thích */}
              <div>
                {/* Ghế đã đặt */}
                <div className="d-flex align-items-center bookingMovie mt-3">
                  <div className="gheDuocChon me-4 mb-2"></div>
                  <p>Ghế đã đặt</p>
                </div>
                {/* Ghế đang chọn */}
                <div className="d-flex align-items-center bookingMovie">
                  <div className="gheDangChon me-4 mb-2"></div>
                  <span>Ghế đang chọn</span>
                </div>
                {/* Ghế trống */}
                <div className="d-flex align-items-center bookingMovie mb-5">
                  <div className="ghe me-4"></div>
                  <span>Ghế trống</span>
                </div>
              </div>
              <div className="text-start">
                <button
                  className="btn btn-outline-danger bookingMovie"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  onClick={this.props.onBookingTicket}
                >
                  Đặt vé ngay
                </button>
              </div>
            </div>
            <table className="table table-bordered text-white">
              <thead>
                <tr className="bookingMovie">
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Tuổi</th>
                  <th scope="col">Tổng số ghế</th>
                  <th scope="col">Số ghế</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Hủy</th>
                </tr>
              </thead>
              <tbody>{this.renderTable(info)}</tbody>
              <tfoot>
                <tr className="bookingMovie">
                  <td className="text-success">Tổng tiền</td>
                  <td colSpan="5">{this.renderSum(info)} đ</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <ModalBooking data={data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { info: state.getInfoReducer.info, state: state.getInfoReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBookingTicket: () => {
      const action = {
        type: "START_BOOK",
      };
      dispatch(action);
    },
    onDelete: (item) => {
      const action = {
        type: "DELETE_TICKET",
        payload: item,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatSelect);
