import { useContext, useState } from "react";
import { SocketContext } from "./SocketContext";

export default function Videoplayer() {
  const [userid, setUserid] = useState("");

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

  return (
    <>
      <div className="streamContainer">
        <div className="stream">
          <video
            className="otherUserVideo"
            playsInline={true}
            autoPlay={true}
            ref={myVideo}
            style={{ display: stream ? "inline" : "none" }}
          />
          <video
            className="userVideo"
            playsInline={true}
            autoPlay={true}
            ref={userVideo}
            style={{
              display: callAccepted && !callEnded ? "inline" : "inline"
            }}
          ></video>
        </div>
      </div>
    </>
  );
}
