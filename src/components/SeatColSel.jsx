import React, { Component } from "react";
import { connect } from "react-redux";

class SeatColSel extends Component {
  state = {
    isChoose: false,
  };
  render() {
    let { seatNum, seat, totalSeat, times, prevSeat } = this.props;
    return (
      <div className="col-1">
        <div
          className="text-dark bookingMovie"
          style={{ fontWeight: "500", margin: "4px 0" }}
        >
          {seatNum}
        </div>
        {this.state.isChoose && prevSeat.includes(seat.soGhe) === false ? (
          <button className="gheDangChon"></button>
        ) : null}
        {prevSeat.includes(seat.soGhe) ? (
          <button className="gheDuocChon"></button>
        ) : null}
        {seat.daDat ? <button className="gheDuocChon"></button> : null}
        {this.state.isChoose === false &&
        seat.daDat === false &&
        prevSeat.includes(seat.soGhe) === false ? (
          <button
            className="ghe selecting"
            onClick={() => {
              this.props.onSelect(seat);
              if (times < totalSeat) {
                this.setState({
                  isChoose: true,
                });
              }
            }}
          ></button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    times: state.getInfoReducer.times,
    totalSeat: state.getInfoReducer.totalSeat,
    prevSeat: state.getInfoReducer.prevSeat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (seatInfo) => {
      const action = {
        type: "SELECT_SEAT",
        payload: seatInfo,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatColSel);
