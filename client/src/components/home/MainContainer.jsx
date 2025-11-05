import React, { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getMsgThunk,
  sendImgThunk,
  sendMsgThunk,
} from "../../store/slices/message/message.thunk";
import { IoIosArrowBack } from "react-icons/io";
import ChatsLoader from "../loaders/ChatsLoader";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { LuImagePlus } from "react-icons/lu";
import { ImagePage } from "./ImagePage";

const MainContainer = ({ onBack }) => {
  const { selectedUserState, userProfile } = useSelector(
    (state) => state.userReducer
  );
  const { messages, msgLoading } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  const [emoji, setEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (selectedUserState?._id) {
      dispatch(getMsgThunk({ receiverId: selectedUserState?._id }));
    }
  }, [selectedUserState]);

  const handleMsg = () => {
    dispatch(sendMsgThunk({ receiverId: selectedUserState?._id, message }));
    setMessage("");
  };

  const handleImg = () => {
    dispatch(sendImgThunk({ receiverId: selectedUserState?._id, images }));
    setImages([]);
  };

  // scroller for messages

  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // time converter
  const timeConverter = (msg) => {
    const time = msg.split("T")[1].split(".")[0];

    var hrs = parseInt(time.split(":")[0]);
    var mins = time.split(":")[1];
    var day = time.split(":")[2];

    return `${hrs + 5}:${mins}`;
  };

  const getDate = (msg) => {
    let msgDate = msg.split("T")[0];
    let elseDate =
      shortMonths[msg.split("T")[0].split("-")[1] - 1] +
      "-" +
      msg.split("T")[0].split("-")[2];
    let currentDate = new Date();
    let yesterdayDate = new Date();
    yesterdayDate.setDate(currentDate.getDate() - 1);

    let currentFormattedDate = setDateFormat(currentDate);
    let yesterdayFormattedDate = setDateFormat(yesterdayDate);

    if (msgDate === currentFormattedDate) {
      return "Today";
    } else if (msgDate === yesterdayFormattedDate) {
      return "Yesterday";
    } else {
      return elseDate;
    }
  };

  const setDateFormat = (date) => {
    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    const year = date.getFullYear();

    const finalDate = year + "-" + month + "-" + day;

    return finalDate;
  };

  //handling image upload
  const handleImageUpload = (e) => {
    const file = Array.from(e.target.files);

    const updatedImages = [...images, ...file];
    setImages(updatedImages);
  };

  const handleSingleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleAllRemove = () => {
    setImages([]);
  };

  const handleImageShow = (images) => {
    setShow(true);
    setImages(images)
  };
  return (
    <>
      {selectedUserState ? (
        images.length ? (
          <ImagePage
            show={show}
            images={images}
            handleSingleRemove={handleSingleRemove}
            handleAllRemove={handleAllRemove}
            handleImg={handleImg}
          />
        ) : (
          <div className="flex flex-col h-screen ">
            {/* header  */}
            <div className="w-full flex items-center justify-between pt-2 pb-5 mb-4 mt-5 px-5 border-1 border-[#1D232A] border-b-[#ffffff96]">
              <IoIosArrowBack
                onClick={onBack}
                className="mr-4 text-2xl cursor-pointer md:hidden"
              />

              <div className="avatar flex flex-none items-center">
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                  <img src={selectedUserState?.avatar} />
                </div>
              </div>

              <div className="flex flex-col grow justify-center items-start">
                <h5 className="mx-4 text-xl font-bold">
                  {selectedUserState?.fullName}
                </h5>
                <h6 className="mx-4 text-[#ffffff96]">
                  {selectedUserState?.username}
                </h6>
              </div>
            </div>

            {/* conversation */}
            <div
              className={`relative p-5 h-full ${
                msgLoading ? "overflow-y-hidden" : "overflow-y-auto"
              }`}
              onClick={() => setEmoji(false)}
            >
              {msgLoading ? (
                <ChatsLoader />
              ) : (
                messages?.map((msg, index) => (
                  <div
                    ref={messageRef}
                    key={index}
                    className={
                      userProfile?._id === messages?.[index].senderId
                        ? "chat chat-end"
                        : "chat chat-start"
                    }
                  >
                    {msg.images.length > 0 ? (
                      <div
                        onClick={() => handleImageShow(msg.images)}
                        className="relative chat-bubble  hover:cursor-pointer"
                      >
                        {msg.images.length > 1 && (
                          <span className="absolute left-0 top-0 flex justify-center items-center bg-black/50 h-full w-full z-10 text-2xl">
                            <span>+{msg.images.length}</span>
                          </span>
                        )}
                        <img
                          className="w-70 h-90"
                          src={msg.images[0]}
                          alt="img"
                        />
                      </div>
                    ) : (
                      <div className="chat-bubble">{msg.message}</div>
                    )}
                    <div className="chat-footer opacity-50">
                      <time className="text-xs opacity-50">
                        {getDate(messages?.[index].createdAt) +
                          ", " +
                          timeConverter(messages?.[index].createdAt)}
                      </time>
                      {/* <p>Delivered</p> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* info send Controllers  */}
            {emoji && (
              <div className="absolute bottom-20 left-2 lg:left-20 md:left-10">
                <EmojiPicker
                  width={300}
                  onEmojiClick={(e) => setMessage(message + e.emoji)}
                />
              </div>
            )}
            <div className="flex gap-[3%] items-center justify-between pt-2 mb-4">
              <div className="input input-lg text-lg w-full ml-3">
                <div
                  className={emoji ? "rounded-full bg-[#d8e4ea73] p-1" : "p-1"}
                >
                  <MdOutlineEmojiEmotions
                    className="text-2xl text-[#D8E4EA] cursor-pointer"
                    onClick={() => setEmoji(!emoji)}
                  />
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here"
                  className="text-[18px]"
                />

                <div className="active:rounded-full active:bg-[#d8e4ea73] p-1 duration-200">
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <label htmlFor="imageUpload">
                    <LuImagePlus className="text-2xl text-[#D8E4EA] cursor-pointer" />
                  </label>
                </div>
              </div>

              <div className="pr-2">
                <button
                  onClick={handleMsg}
                  className="bg-blue-600 text-md font-semibold cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] px-4 py-3.5 rounded-sm text-xl"
                >
                  <IoSendSharp />
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="text-gray-300 h-[90vh] flex flex-col justify-center items-center">
            <div>
              <h1 className="font-bold text-xl text-center mb-2">
                Wellcome to Chat Up!
              </h1>
              <p className="text-lg">
                Select the user from the left Sidebar to start Chat.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainContainer;
