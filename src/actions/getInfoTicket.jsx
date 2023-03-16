const initialState = {
  name: "",
  age: "",
  totalSeat: "",
  prevSeat: [],
  numSeat: [],
  price: 0,
  times: 0,
  info: [],
};

const getInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_BOOK": {
      let { name, age, totalSeat, price, times, numSeat, ...restParam } = state;
      name = "";
      age = "";
      totalSeat = 0;
      price = 0;
      times = 0;
      numSeat = [];
      state = {
        name,
        age,
        totalSeat,
        price,
        times,
        numSeat,
        ...restParam,
      };
      return { ...state };
    }
    case "GET_INFO": {
      let { name, age, totalSeat, ...restParam } = state;
      name = action.payload.inputName;
      age = action.payload.inputAge;
      totalSeat = action.payload.inputNum * 1;
      state = { name, age, totalSeat, ...restParam };

      return { ...state };
    }
    case "SELECT_SEAT": {
      let { numSeat, price, times, totalSeat, ...restParam } = state;
      if (times < totalSeat) {
        numSeat.push(action.payload.soGhe);
        price += action.payload.gia;
        times += 1;
        state = { numSeat, price, times, totalSeat, ...restParam };
      }
      return { ...state };
    }
    case "BOOK_SUCCESS": {
      let { info, prevSeat, numSeat, ...restParam } = state;
      info.push({ numSeat, ...restParam });
      prevSeat.push(...numSeat);
      state = { info, prevSeat, numSeat, ...restParam };

      alert("Chúc mừng bạn đặt vé thành công!");
      return { ...state };
    }
    case "DELETE_TICKET": {
      let { info, ...restParam } = state;
      const index = info.indexOf(action.payload);
      info.splice(index, 1);
      state = { info, ...restParam };
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export { getInfoReducer };
