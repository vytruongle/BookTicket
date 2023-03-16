import React, { Component } from "react";
import { connect } from "react-redux";

class SeatCol extends Component {
  render() {
    let { seatNum, seat, prevSeat } = this.props;
    return (
      <div className="col-1">
        <div
          className="text-white bookingMovie"
          style={{ fontWeight: "500", margin: "4px 0" }}
        >
          {seatNum}
        </div>
        {seat.daDat || prevSeat.includes(seat.soGhe) ? (
          <div className="gheDuocChon"></div>
        ) : (
          <div className="ghe"></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.getInfoReducer,
    prevSeat: state.getInfoReducer.prevSeat,
  };
};

export default connect(mapStateToProps, null)(SeatCol);
