import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router";
import { createConsumer } from "@rails/actioncable";
import { SocketContext } from "./SocketContext";
import Videoplayer from "./Videoplayer";

export default function Connection() {
  // for video call
  const [media, setMedia] = useState(false);
  const [calling, setCalling] = useState(false);
  const [failed, setFailed] = useState(false);
  const [callId, setCallId] = useState(null);
  const [online, setOnline] = useState(0);
  const {
    me,
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    calluser,
    leavecall,
    answerCall,
    socket,
    addStream,
    onCall,
    setOnCall
  } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("total", me, (result) => {
      setOnline(result.length);
    });
  }, []);

  const callUserId = (me) => {
    setCalling(true);
    addStream();
    axios
      .get(
        "https://b68h5k-6000.preview.csb.app/api/call/" +
          window.localStorage.getItem("id")
      )
      .then((data) => {
        console.log(data.data + "Nice");
        if (data.data.data.length == 0) {
          console.log("Its working");
          if (window.localStorage.getItem("oncall") === "false") {
            keepLive();
          }
        } else {
          let user_id = 0;
          let allUsers = data.data.data;
          socket.emit("total", me, (result) => {
            let users = allUsers.filter((u) => result.includes(u.uid));
            setOnline(users.length);
            for (let i = 0; i < users.length; i++) {
              if (users[i].uid != window.localStorage.getItem("id")) {
                setCallId(users[i].uid);
                user_id = users[i].uid;
                break;
              }
            }
            if (
              user_id == 0 &&
              window.localStorage.getItem("oncall") === "false"
            ) {
              keepLive();
            }
          });
        }
      });
  };

  useEffect(() => {
    if (!callId) return;
    const callru = async () => {
      setCalling(true);
      calluser(callId, setFailed);
    };
    callru();
  }, [callId]);

  useEffect(() => {
    if (failed) {
      keepLive();
    }
  }, [failed]);

  const keepLive = () => {
    let ids = [];
    let tm = setInterval(() => {
      if (window.localStorage.getItem("oncall") === "false") {
        setCalling(true);
        axios
          .get("https://b68h5k-6000.preview.csb.app/api/getids")
          .then((data) => {
            console.log(data);
            if (data.data.data.length > 0) {
              let allusers = data.data.data;
              socket.emit("total", me, (result) => {
                let users = allusers
                  .filter((us) => result.includes(us.uid))
                  .reverse();
                setOnline(users.length);
                for (let i = 0; i < users.length; i++) {
                  if (
                    users[i].uid != window.localStorage.getItem("id") &&
                    !ids.includes(users[i].uid)
                  ) {
                    ids.push(users[i].uid);
                    if (window.localStorage.getItem("oncall") === "true")
                      return clearInterval(tm);
                    if (window.localStorage.getItem("oncall") !== "true")
                      return console.log("Hello it is cleared");
                    setCallId(users[i].uid);
                    break;
                  }
                }
              });
            }
          });
      } else {
        clearInterval(tm);
      }
    }, 3000);
  };

  // for conversation
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sentUser, setSentUser] = useState("");
  const [recipientUser, setRecipientUser] = useState("");
  const [loadMessages, setLoadMessages] = useState(false);
  const [topics, setTopics] = useState("");

  useEffect(() => {
    axios
      .get("https://would-you-rather-api.abaanshanid.repl.co/")
      .then((res) => {
        console.log(res.data);
        setTopics(res.data.data);
      });
  }, []);
  return (
    <>
      <div className="connectionPage">
        <Videoplayer />
        <button
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then((currentStream) => {
                setMedia(false);
                callUserId(window.localStorage.getItem("id"));
              });
          }}
        >
          Start
        </button>
        {/* <div className="videoContainer">
             <div className="userVideo">If youre playing me</div>
            <div className="otherUserVideo">I do not want to know</div>
          </div> */}
        {/* // <div className="topicTimer">
        //   <div className="timer"> 00:30:00 </div>
        //   {/* <div className="topic">{topics}</div> */}
        {/* // </div>
        // <div className="conversationContainer">
        //   <div>asdnkl</div>
        // </div>  */}
      </div>
    </>
  );
}
