import { Client } from "@stomp/stompjs";
import React, { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { UserContext } from "../../context/UserContext";
import { notify } from "../Home/PushAlert";

const WebSocketStomp = () => {
  const [client, setClient] = useState(null);
  const { userRegion, userId } = useContext(UserContext);
  
  useEffect(() => {
    const sock = new SockJS("http://todaysdate.site/ws", null, {
      transports: ["websocket"],
      headers: {
        Origin: "http://todaysdate.site"
      }
    });
    const newClient = new Client({
      webSocketFactory: () => sock,
      debug: (str) => {
        console.log('🎃 : ' + str);
      }
    });
    setClient(newClient);
  }, []);

  useEffect(() => {
    if (client) {
      const onConnect = () => {
        console.log("웹소켓 연결!!!");

        client.subscribe(`/region/${userRegion}/${userId}`, (message) => {
          console.log("👽 메세지 : " + message.body);
          notify(message.body);
        });
      };
      const onError = (error) => {
        console.error("웹소켓 연결 실패" + error);
      };

      client.onConnect = onConnect;
      client.onStompError = onError;

      client.activate();
    }
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [userRegion, client, userId]);

  return (
    <>
    </>
  );
}

export default WebSocketStomp;