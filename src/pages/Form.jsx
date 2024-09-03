// import { InputLabel, MenuItem, TextField } from '@mui/material'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import styles from "../styles/Form.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

function Form() {
  const [text, setText] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [formData, setFormData] = useState({});

  const get_state = async () => {
    try {
      let res = await fetch(
        "http://irisauditor.com/universal_api/State_City_Master.svc/get_city_state/state/"
      );
      let data = await res.json();
      setState(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_city = async (selected) => {
    try {
      let res = await fetch(
        `http://irisauditor.com/universal_api/State_City_Master.svc/get_city_state/city/${selected}`
      );
      let data = await res.json();
      setCity(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_department = async () => {
    try {
      let res = await fetch(
        "http://hire.test.com/beta_api/Department_Management.svc/department_select2"
      );
      let data = await res.json();
      setDepartment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_position = async () => {
    try {
      let res = await fetch(
        "http://hire.test.com/beta_api/Master.svc/get_name_of_the_position_select2"
      );
      let data = await res.json();
      setPosition(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_state();
    get_department();
    get_position();
  }, []);

  const collect_data = (e) => {
    let inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: e.target.value,
      description: parse(text),
    });
  };

  const handleChange = (e) => {
    get_city(e.target.value);
    collect_data(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container" id={styles.main}>
      <form onSubmit={handleSubmit}>
        <div id={styles.head_part} className="row">
          <h3>Requisition Form</h3>
        </div>
        <div className="row">
          <div className="col-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Name Of The Position<span>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Name Of The Position*"
                name="position"
                onChange={collect_data}
                value={formData.position}
              >
                {position?.map((ele) => (
                  <MenuItem value={ele.id}>{ele.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Dept Name<span id={styles.star}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Dept Name*"
                name="department"
                value={formData.department}
                onChange={collect_data}
              >
                {department?.map((ele) => (
                  <MenuItem value={ele.DEPT_NAME}>{ele.DEPT_NAME}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Employee Status<span>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Employee Status*"
                name="status"
                value={formData.status}
                onChange={collect_data}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="New Position">New Position</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            {" "}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                State<span id={styles.star}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
                onChange={handleChange}
                name="state"
                value={formData.state}
              >
                {state?.map((ele) => (
                  <MenuItem value={ele.text}>{ele.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                City<span id={styles.star}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="City"
                name="city"
                onChange={collect_data}
                value={formData.city}
              >
                {city?.map((ele) => (
                  <MenuItem value={ele.text}>{ele.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            {" "}
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Number Of Openings"
              type="text"
              autoComplete="current-password"
              name="opening"
              onChange={collect_data}
              value={formData.opening}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Is Experienced?"
              type="text"
              autoComplete="current-password"
              name="experience"
              onChange={collect_data}
              value={formData.experience}
            />
          </div>
        </div>
        <div className="row">
          <TextField
            sx={{ width: "97.5%" }}
            id="outlined-password-input"
            label="Skills"
            type="text"
            autoComplete="current-password"
            name="skills"
            onChange={collect_data}
            value={formData.skills}
          />
        </div>
        <div className="row">
          <div className="col-12">
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
          </div>
        </div>
        <button id={styles.submit_btn} className="btn btn-primary">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Form;
