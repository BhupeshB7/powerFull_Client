import React from "react";

function AdminNoticeList({ notices, onDelete }) {
  return (
    <div>
      <h6 className="text-primary">Messages</h6>
      <ul>
        {notices && notices.length > 0 ? (
          notices.map((notice) => (
            <li key={notice._id} style={{ listStyle: "none" }}>
              <h6>{notice.text}</h6>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  margin: "auto",
                }}
              >
                <h6>{new Date(notice.timestamp).toLocaleDateString()}</h6>
                <button
                  onClick={() => onDelete(notice._id)}
                  style={{
                    border: "none",
                    width: "35px",
                    height: "35x",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                    height="22px"
                    width="22px"
                    alt="delete"
                  />
                </button>
              </div>
            </li>
          ))
        ) : (
          <h6>No Message</h6>
        )}
      </ul>
    </div>
  );
}

export default AdminNoticeList;
