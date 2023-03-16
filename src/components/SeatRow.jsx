import React, { Component } from "react";
import SeatCol from "./SeatCol";

class SeatRow extends Component {
  renderSeat = (seatList) => {
    return seatList.map((seat, id) => {
      return <SeatCol key={id} seatNum={id + 1} seat={seat} />;
    });
  };

  render() {
    let { seatList } = this.props;
    return (
      <div className="d-flex align-items-center">
        <div
          className="text-white bookingMovie"
          style={{ fontSize: "24px", marginRight: "3%", marginTop: "4%" }}
        >
          {seatList.hang}
        </div>
        <div className="row">{this.renderSeat(seatList.danhSachGhe)}</div>
      </div>
    );
  }
}

export default SeatRow;
