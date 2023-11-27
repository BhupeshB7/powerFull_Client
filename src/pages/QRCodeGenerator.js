import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

const QRCodeGenerator = ({userId}) => {
  const [qrData, setQrData] = useState("");
  const qrCodeRef = useRef(null);

  const generateQRCode = (user) => {
    // The data to be encoded in the QR code
    // const qrDataText = `https://globalsuccesspoint.in/register?ref=${user}`;
    const qrDataText = `https://powerfullindia.com/register?ref=${user}`;
    // const qrDataText = "GSP230001634";
    setQrData(qrDataText);
  };

  const handleShareQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        const canvas = await html2canvas(qrCodeRef.current, {
          useCORS: true, // Enable CORS to capture the QR code properly
        });
        const imageURL = canvas.toDataURL("image/png");
        downloadImage(imageURL, "qrcode.png");
      } catch (error) {
        console.error("Error sharing QR code:", error);
      }
    } else {
      alert("QR code is not available to share.");
    }
  };

  const downloadImage = (url, filename) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
  };

  return (
    <div>
        <div style={{display: "inline" }}>
        <h6
        onClick={()=>generateQRCode(userId)}
        className="m-3 "
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop5"
        
      >
        QR Code
      </h6>
        </div>
      
      
      <div
        className="modal fade "
        id="staticBackdrop5"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Referral QRCode
              </h1>
              {/* <h6>userId: {userId}</h6> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/*  */}
              {qrData && (
                <div className="qrcode" ref={qrCodeRef}>
                  <QRCode value={qrData} size={256} />
                </div>
              )}
              {qrData && (
                <div>
                  <button onClick={handleShareQRCode}>Download</button>
                </div>
              )}
              {/*  */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
