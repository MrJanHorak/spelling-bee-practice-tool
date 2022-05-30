import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import qrcode from "../../assets/qrcode.png";

// Services
import { login } from "../../services/authService";

const ReadQr = ({ handleSignupOrLogin }) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState("No result");
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <div>
        {showScanner ? (
          <QrReader
            onResult={async (result, error) => {
              if (!!result) {
                console.log("RESULT.TEXT: ", result?.text.split(","));
                let resultTextSplit = result?.text.split(",");
                let qrName = resultTextSplit[0];
                let qrPw = resultTextSplit[1];
                setData(result?.text);
                try {
                  await login({ name: qrName, pw: qrPw });
                  handleSignupOrLogin();
                  navigate("/");
                } catch (error) {
                  setMsg(error.message);
                }
              }
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />
        ) : (
          <div>
            <button
              className="submit-button"
              onClick={() => {
                setShowScanner(true);
                setData("Make sure your QrCode is visible!");
              }}
            >
              <img
                alt="use qr code for login"
                src={qrcode}
                style={{ height: "125px", width: "100px" }}
              />
              <br />
              <strong>Log-in Using QRCode (requires a Camera)</strong>
            </button>
          </div>
        )}
        <p>{msg}</p>
      </div>
    </>
  );
};

export default ReadQr;
