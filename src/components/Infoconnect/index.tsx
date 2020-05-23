import React, { useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import history from "../../util/history";

export interface Iinfoconnect{
  Page:number;
  PageHandler:(arg0:number)=>void;
}

export const Infoconnect:React.FC<Iinfoconnect>=(props:Iinfoconnect)=>{
    const getUrl = () => {
    window.location.replace("http://oauthv2.shobhitagarwal.me/login?projectID=QHub-Test.infoconnect.in&redirectURL=http://localhost:3000");
  };

  useEffect(() => {
    const values = queryString.parse(window.location.search);
    if (values && values.code) {
      const code = values.code;
      console.log(code);
      axios
        .post(
          "http://localhost:8089/api/faculty/login",
          { code },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.headers["token"]);
          if(localStorage.getItem("token")){
            props.PageHandler(2);
          }
          history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <button id="login-infoconnect" onClick={getUrl}>
      Infoconnect Login
    </button>
  );
};