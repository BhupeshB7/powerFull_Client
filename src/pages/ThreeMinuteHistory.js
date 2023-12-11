// ThreeMinuteHistory.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

const ThreeMinuteHistory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/randomData?page=${currentPage}`
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Container className="table-responsive" style={{ marginTop: "10px" }}>
        <table
          className="table"
          style={{
            backgroundImage: "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)",
          }}
        >
          <thead className="text-light text-center" style={{ height: "55px" }}>
            <tr>
              {/* <th>#</th> */}
              <th>Session</th>
              <th>Number</th>
              <th>Size</th>
              <th className="text-center">Color</th>
            </tr>
          </thead>
          <tbody
            style={{ color: "#FFD700" }}
            className="table-hover text-center"
          >
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.session}</td>
                <td>{item.number}</td>
                {/* <td>{item.color}</td> */}
                <td>{item.letter}</td>
                <td className="text-center">
                  <div style={{background:item.color, width:'20px',height:'20px', borderRadius:'50%'}}>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {/* Previous Button */}
          <Button variant="success" className="m-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {/* Next Button */}
          <Button variant="success" className="m-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        {/* Display page number and items per page information */}
        <div className="text-light">
          Page {currentPage} of {totalPages}
        </div>
      </Container>
      <div>{/* Current Page */}</div>
    </div>
  );
};

export default ThreeMinuteHistory;
