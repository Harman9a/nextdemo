const iState = {
  isLogin: false,
  users: [
    {
      id: 0,
      name: "No One",
    },
    {
      id: 1,
      name: "Jon Snow",
    },
    {
      id: 2,
      name: "Daenerys Targaryen",
    },
  ],
  logedInUser: {
    id: 1,
    name: "Jon Snow",
  },
  allMessage: [
    {
      id: 1,
      sendFrom: 0,
      sendTo: 1,
      message: "hello",
    },
    {
      id: 2,
      sendFrom: 0,
      sendTo: 2,
      message: "Hi",
    },
    {
      id: 3,
      sendFrom: 2,
      sendTo: 0,
      message: "Hi",
    },
  ],
};

export const reducer = (state = iState, Actions) => {
  return state;
};
