import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Position_tbl from "../components/Position_tbl";
import MiniDrawer from "../components/Sidebar";
import Source_tbl from "../components/Source_tbl";
import Swal from 'sweetalert2'


function Master() {
  const storage = window.sessionStorage;
  const [source, setSource] = useState([]);
  const [position, setPosition] = useState([]);
  const [text,setText] = useState("")
  let user_id = storage.getItem("USER_GUID");
  const navigate = useNavigate();




  useEffect(() => {
    if (user_id === "") {
      navigate("/");
    }
  }, [storage]);
  const get_source = async () => {
    try {
      let res = await fetch(
        "http://beta-hire.test.com/api/Master.svc/get_Source_of_candidate"
      );
      let data = await res.json();
      setSource(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_position = async () => {
    try {
      let res = await fetch(
        "http://beta-hire.test.com/api/Master.svc/name_of_the_position/all"
      );
      let data = await res.json();
      setPosition(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_source();
    get_position();
  }, []);
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#e9eaed" }}>        
        <MiniDrawer header_name="Master" />
 
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "-4.5%",
          }}
        >
          <div className="col-sm-12 col-md-7">
            <Position_tbl data={position} get_position={get_position} />
          </div>
          <div className="col-sm-12 col-md-4">
            <Source_tbl data={source} get_source={get_source} />
          </div>
        </div>
 
      </div>

    </>
  );
}

export default Master;
