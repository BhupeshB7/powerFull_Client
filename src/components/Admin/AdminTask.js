import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavbarComponent from "./NavbarComponent";
import { Button, Container } from "react-bootstrap";
import AdminDeposit from "./AdminDeposit";
const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };
  
  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []); 
   //Fetch All task
   useEffect(() => {
    fetchTasks();
  }, []);
  // Delete all task
    const handleDeleteAllTasks = async () => {
      try {
        await axios.delete("https://mlm-eo5g.onrender.com/api/tasks");
        // After successful deletion, refetch the tasks to update the list
        alert("All Task Deleted SuccessFully!");
        fetchTasks();
      } catch (error) {
        console.error("Failed to delete all tasks", error);
      }
    };
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    videoLink: Yup.string().required("Video Link is required"),
  });

  // Handle form submission
  const handleCreateTask = async (values, { resetForm }) => {
    try {
      await axios.post("https://mlm-eo5g.onrender.com/api/tasks", values);
      // Clear the input fields
      alert("Task Created SuccessFully");
      resetForm();
    } catch (error) {
      console.error("Failed to create a task", error);
    }
  };
 
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://mlm-eo5g.onrender.com/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
  const handleDeleteDeposit = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this deposit?"
    );
    if (shouldDelete) {
      deleteDeposit(id);
    }
  };

 
  const deleteDeposit = async (id) => {
    try {
      const response = await axios.delete(
        `https://mlm-eo5g.onrender.com/api/deposit/delete/${id}`
      );
      // console.log('Deposit deleted');
      alert(response.data);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
  return (
    <>
   {isTokenValid?(
    <div>
      <Container>
        <NavbarComponent />
        <Formik
          initialValues={{
            title: "",
            videoLink: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateTask}
        >
          {({ isSubmitting }) => (
            <div>
              <Form
                className="form-task"
                style={{ marginLeft: "20px", maxWidth: "500px" }}
              >
                <h5 className="m-3" style={{ color: "#aaa" }}>
                  CREATE A NEW TASK
                </h5>
                <div className="form_task_container">
                  <label className="fw-bold m-2">Title:</label>
                  <Field
                    type="text"
                    name="title"
                    style={{
                      padding: "10px",
                      width: "280px",
                      background: "transparent",
                    }}
                    required
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="text-center text-secondary mt-1 form_task_container">
                  <label className="fw-bold m-2">Video Link:</label>
                  <Field
                    type="text"
                    name="videoLink"
                    style={{
                      padding: "10px",
                      width: "300px",
                      background: "transparent",
                    }}
                    required
                  />
                  <ErrorMessage
                    name="videoLink"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="m-3 text-secondary fw-bold"
                  style={{
                    width: "200px",
                    padding: "10px",
                    background: "transparent",
                    fontSize: "20px",
                  }}
                >
                  {isSubmitting ? "Creating..." : "Create Task"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
        <div className="task_details">
          <h6 className="m-2 text-primary">TASK LIST</h6>
          <ul>
            {tasks.map((task, index) => (
              <li key={task._id}>
               
                <h6 className="text-secondary"> <b style={{fontSize:'24px'}}>{index+1}.</b>  Title:- <b className="text-info">{task.title}</b>  </h6>{" "}
                <h6 className="text-secondary">VideoLink- <div className="text-primary">{task.videoLink}</div> </h6>
              </li>
            ))}
          </ul>
          <Button variant="outline-primary"  onClick={handleDeleteAllTasks}>Delete All Tasks</Button>
        </div>
      </Container>
      <Container>
<AdminDeposit/>

      </Container>
    </div>
   ):(

    <></>
   )}
    
    </>
  );
};

export default AdminTask;
