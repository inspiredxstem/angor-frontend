import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Peer from "simple-peer";

const SocketContext = React.createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [onCall, setOnCall] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    window.localStorage.setItem("from", null);
    window.localStorage.setItem("oncall", "false");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });
    socket.on("calluser", ({ from, name: callername, signal }) => {
      setCall({ isReceivedCall: true, from, callername, signal });
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentstream) => {
          if (window.localStorage.getItem("oncall") == "false") {
            setOnCall(true);
            answerCall(
              { isReceivedCall: true, from, callername, signal },
              currentstream
            );
          }
        });
    });
  }, []);

  socket.on("me", (id) => {
    setMe(String(id));
    window.localStorage.setItem("id", id);
  });

  const addStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;
      });
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
      window.localStorage.setItem("from", call.from);
    });

    try {
      peer.on("stream", (currentStream) => {
        window.localStorage.setItem("oncall", true);
        userVideo.current.srcObject = currentStream;
      });
    } catch (error) {
      console.log(error, "Help");
    }

    peer.signal(call.signal);
    connectionRef.current = peer;
    axios
      .get(
        `https://b68h5k-6000.preview.csb.app/api/call/${window.localStorage.getItem(
          "id"
        )}/0`
      )
      .then((data) => {});
  };

  const calluser = async (id, setFailed) => {
    socket.emit("isConnected", id, function (result) {
      if (result) {
        window.localStorage.setItem("from", id);
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on("signal", (data) => {
          socket.emit("calluser", {
            userToCall: id,
            name: Math.floor(Math.random() * 10000),
            signalData: data,
            from: me
          });
        });

        try {
          peer.on("stream", (currentstream) => {
            userVideo.current.srcObject = currentstream;
            window.localStorage.setItem("oncall", true);
          });
        } catch (error) {
          console.log(error, "Help me");
        }

        socket.on("callaccepted", (signal) => {
          window.localStorage.setItem("oncall", true);
          setCallAccepted(true);
          peer.signal(signal);
          axios
            .get(
              `https://b68h5k-6000.preview.csb.app/api/call/${window.localStorage.getItem(
                "id"
              )}/0`
            )
            .then((data) => {});

          try {
            connectionRef.current = peer;
          } catch (error) {
            console.log(error);
          }
        });
        setFailed(false);
      } else {
        setFailed(true);
      }
    });
  };

  const leavecall = () => {
    window.localStorage.setItem("from", null);
    window.localStorage.setItem("oncall", "false");
    setCallEnded(true);
    if (connectionRef.current) connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
