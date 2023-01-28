
export const Reducer = (state, action) => {
    switch (action.type) {
      case "Get":
        return action.payload;
        case "Post":
          return action.payload;
      default:
        return state;
    }
  };