import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "../../store/slices/user.slice";
import { getMsgThunk } from "../../store/slices/message/message.thunk";

const User = ({ oneUser, onclick }) => {
  const dispatch = useDispatch();
  const { selectedUserState, userProfile } = useSelector(
    (state) => state.userReducer
  );
  const { messages } = useSelector((state) => state.messageReducer);
  const { socket, onlineUsers } = useSelector((state) => state.socketReducer);
  const [count, setCount] = useState();

  const handleUser = () => {
    dispatch(selectedUser(oneUser));
    onclick && onclick();
  };

  useEffect(() => {
    if (userProfile && oneUser)
      dispatch(getMsgThunk({ receiverId: oneUser._id }));
  }, [userProfile?._id]);

  useEffect(() => {
    if (!messages) return;

    const count = messages?.filter(
      (msg) =>
        msg.receiverId == userProfile?._id &&
        msg.senderId == oneUser._id &&
        msg.status !== "seen"
    ).length;

    setCount(count);
  }, [messages, userProfile?._id, oneUser?._id]);

  useEffect(() => {
    if (selectedUserState) {
      socket.emit("msgIsReceived", {
        senderId: selectedUserState?._id,
        receiverId: userProfile?._id,
      });
    }

    return () => {
      socket.off("msgIsReceived");
    };
  }, [socket, selectedUserState]);

  const isOnline = onlineUsers?.includes(oneUser?._id);

  return (
    <div
      onClick={handleUser}
      className={`flex justify-between items-center cursor-pointer px-3 py-1 my-1 rounded-md hover:bg-[#353d46] transition-all ${
        selectedUserState?._id === oneUser?._id && "bg-[#353d46]"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`avatar ${
            isOnline ? "avatar-online" : "avatar-offline"
          } my-2`}
        >
          <div className="w-12 rounded-full">
            <img src={oneUser?.avatar} />
          </div>
        </div>

        <div className="flex flex-col mx-3">
          <h5>{oneUser?.fullName}</h5>
          <h6 className="text-[#ffffff96]">{oneUser?.username}</h6>
        </div>
      </div>

      <div className="text-base mr-3 flex justify-center items-center">
        <span className="bg-blue-500 rounded-full w-fit h-fit px-2 ">{count > 0 && count}</span>
      </div>
    </div>
  );
};

export default User;
