import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/navBar.js";

function JoiningProjectByID() {
  const move = useNavigate();
  const [Data, setData] = useState({
    projectId: "",
  });

  function DataToBackend(e) {
    e.preventDefault();
    //console.log(username);

    let form = new FormData();
    alert(Data.projectId);
    form.append("Project_ID", Data.projectId);
    e.target.reset();

    alert(form.get('Project_ID'));

    fetch("http://localhost:5000/join_project", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        alert(data["message"]);
        if (data["message"] == "Project joined.") {
          move("/my_projects");
        } else {
          //Place Holder for Modal
        }
        console.log(Data);
      })
      .catch((err) => console.log(err));
  }
  function handler(e) {
    // alert(e.target.value);
    const newData = { ...Data };
     // alert(e.target.id);
    newData[e.target.id] = e.target.value;
    setData(newData);
    // alert(Data.projectId);
  }
  return (
    <>
      <NavigationBar />
      <h1 className="ml-2">Join Project</h1>
      <div className=" text-center">
        <form className="form-inline" onSubmit={DataToBackend}>
          <div className="form-group col-7 ">
            <label className="inputPassword6 ">Project ID</label>
            <input
              id="projectId"
              onChange={(e) => handler(e)}
              type="username"
              placeholder="Project ID"
              className="form-control mx-sm-3"
              required
            />
            <button className="login-btn btn btn-primary mt-25" type="submit">
              Join
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default JoiningProjectByID;
