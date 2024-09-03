import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import nullData from "../images/data-null.gif";
import { Drawer, Modal, TextField, Tooltip, Typography } from "@mui/material";
import Timeline_sidebar from "../components/Timeline_sidebar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Timeline_drawer from "../components/Timeline_drawer";
import Moment from "react-moment";
import swal from "sweetalert";
import TimePicker from "react-time-picker";
import Add_Candidate_Modal from "../Modals/Add_Candidate_Modal";
import Swal from 'sweetalert2'

function Directory() {
  const storage = window.sessionStorage;
  let id = storage.getItem("reqID")
  let user_id = storage.getItem("USER_GUID");
  const [data, setData] = useState([]);
  const [show_exp, setShow_exp] = useState(false);
  const [show_work, setShow_work] = useState(false);
  const [formData, setFormData] = useState({});
  const [source_data, setSource_Data] = useState([]);
  const [source_val, setSource_Val] = useState("");
  const req = window.location.href.split("/").pop();
  const [openMappingDrawer, setOpenMappingDrawer] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [details,setDetails] = useState([])
  const exp_ref = useRef();
  const work_ref = useRef();
  const navigate = useNavigate();
  // const [hr_name,setHr_Name] = useState("");
  // const [status,setStatus] = useState("") ;
  // const [position,setPosition] = useState("");

let hr_name;
let status;
let position;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (user_id === "") {
      navigate("/");
    }
  }, [storage]);

  const get_directory = async () => {
    try {
      let res = await fetch(
        `http://beta-hire.test.com/api/Candidate_Dashboard.svc/get_candidate_data/${id}/all`
      );
      let data = await res.json();
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_timline_data = async (id) => {
    try {
      let res = await fetch(
        `http://beta-hire.test.com/api/Candidate_Dashboard.svc/get_candiadte_timeline/${id}`
      );
      let data = await res.json();

      setTimeline(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_information =(number)=>{
     data?.forEach((ele)=>{
      if(ele.MOBILE == number){
        hr_name = ele.HR_NAME;
        status = ele.STAGE;
        position = ele.POSITION_NAME
        // setHr_Name(ele.HR_NAME)
        // setStatus(ele.STATUS)
        // setPosition(ele.POSITION_NAME)
      }
     })
  }

  const handleExp = (e) => {
    if (exp_ref.current.checked == true) {
      work_ref.current.checked = false;
      setShow_work(false);
    }
    setShow_exp(!show_exp);
  };

  const handleWork = (e) => {
    if (work_ref.current.checked == true) {
      exp_ref.current.checked = false;
      setShow_exp(false);
    }
    setShow_work(!show_work);
  };

  const collect_info = (e) => {
    let inputName = e.target.name;
 
  //   if(inputName === "RESUME"){
  //     setFormData({
  //       ...formData,
  //       RESUME:e.target.files,
  //     });
  //   }
  //  else{
  //   setFormData({
  //     ...formData,
  //     [inputName]: e.target.value,
  //     CREATED_BY: user_id,
  //     IS_MAP: "1",
  //     REQ_ID: id,
  //     IS_EXP: show_exp ? "1" : "0",
  //     IS_WORKING: show_work ? "1" : "0"
  //   });
  //  }

  setFormData({
        ...formData,
        [inputName]: e.target.value,
        CREATED_BY: user_id,
        IS_MAP: "1",
        REQ_ID: id,
        IS_EXP: show_exp ? "1" : "0",
        IS_WORKING: show_work ? "1" : "0"
      });
  };

  const handleSubmit = () => {
    add_candidate(formData);
  };

  const add_candidate = async (formData) => {
  
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    let flag4 = false;
    let flag5 = false;
    let flag6 = false;
    let flag7 = false;
    let flag8 = false;
    let flag9 = false;


    for (let x in formData) {
      if (x === "EMAIL") {
        flag1 = true;
      }
      if (x === "MOBILE") {
        flag2 = true;
      }
      if (x === "NAME") {
        flag3 = true;
      }
      if (x === "SOURCE_OF_CANDIDATE") {
        flag4 = true;
      }
    }
    if (
      flag1 === false ||
      flag2 === false ||
      flag3 === false ||
      flag4 === false 
    ) {
      // swal("All Fields Are Compulsary!!");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: "All Fields Are Compulsary!!"
      })

    } else if (formData.MOBILE.length !== 10) {
      // swal("Please Enter valid Mobile Number");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: "Please Enter valid Mobile Number"
      })
      
    }
    else if(formData.EMAIL === ""||formData.MOBILE === ""||formData.NAME === ""||formData.SOURCE_OF_CANDIDATE === ""){
    // swal("All Fields Are Compulsary!!")
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: "All Fields Are Compulsary!!"
    })
    }
    else {
      try {
        let res = await fetch(
          "http://beta-hire.test.com/api/Candidate_Dashboard.svc/insert_candidate",
          {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              ADDRESS: formData.ADDRESS,
              CREATED_BY: formData.CREATED_BY,
              CURRENT_COMPANY: formData.CURRENT_COMPANY,
              CURRENT_DESIGNATION: formData.CURRENT_DESIGNATION,
              CURRENT_GROSS: formData.CURRENT_GROSS,
              EMAIL: formData.EMAIL,
              EXP: formData.EXP,
              EXP_IN: formData.EXP_IN,
              IS_EXP: formData.IS_EXP,
              IS_MAP: formData.IS_MAP,
              IS_WORKING: formData.IS_WORKING,
              MOBILE: formData.MOBILE,
              NAME: formData.NAME,
              NOTICE_PERIOD: formData.NOTICE_PERIOD,
              REQ_ID: formData.REQ_ID,
              SOURCE_OF_CANDIDATE: formData.SOURCE_OF_CANDIDATE,
              STATE:formData.STATE,
              CITY:formData.CITY,
              //RESUME: "text.pdf"
            }),
          }
        );
        let data = await res.json();
       
        if(data.response[0].MESSAGE === `${formData.NAME}is already added in system`){
          // swal(`${formData.NAME} is Already in the system`)
          get_information(formData.MOBILE);
  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            width:"600px",
            paddingLeft:"-50px",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            customClass: {
              title: 'custom-title-class',
            
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: `Candidate with these Number is Already in the system,<br/>  Status: ${status} <br/> HR Name: ${hr_name} <br/> Position: ${position}`
            // title: `Status: ${status}`
          })
        }else{
          get_directory();
          handleClose();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Candidate added Successfully'
          })
        }

      } catch (error) {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: "Something Went Wrong"
        })
      }
    }
  };

  const get_details = async (can_ID) => {
    try {
      let res = await fetch(
        `http://beta-hire.test.com/api/Candidate_Dashboard.svc/get_call_status_timeline/${can_ID}/${id}`
      );
      let data = await res.json();
      setDetails(data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const get_source = async () => {
    try {
      let res = await fetch(
        "http://beta-hire.test.com/api/Master.svc/get_Source_of_candidate_select2/"
      );
      let data = await res.json();
      setSource_Data(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (condition) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    } else if (condition === "hrMapping") {
      setOpenMappingDrawer(false);
    }
  };

  const handleTimeline = (row, data) => {
    setOpenMappingDrawer(true);

    get_details(data.rowData[9]);
  };

  const handleNavigate = (row, data) => {
    storage.setItem("can_ID", data.rowData[9]);
    navigate("/candidate_details");
  };

  useEffect(() => {
    get_directory();
    get_source();
  }, []);
  const options = {
    filterType: "checkbox",
  };
  const columns = [
    {
      name: "NAME",
      label: "NAME",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "MOBILE",
      label: "MOBILE",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "EMAIL",
      label: "EMAIL",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "ADDRESS",
      label: "ADDRESS",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "EXP",
      label: "EXP",
      options: {
        filter: true,
        sort: false,
        customBodyRender:(row)=>{
          return(
             <p style={{marginLeft:"10%",marginTop:"15px"}}>{row}</p>
          )
        }
      },
    },
    {
      name: "NOTICE_PERIOD",
      label: "NOTICE PERIOD",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "CREATED_ON",
      label: "CREATED ON",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (row, data) => {
          return <Moment format="DD MMM YYYY">{row}</Moment>;
        },
      },
    },
    {
      name: "STATUS",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (row, data) => {
          return (
            <button
              id={styles.status_btn}
              onClick={() => handleNavigate(row, data)}
              style={{
                backgroundColor:
                row == "New"
                ? "#9932CC"
                : row == "Offer Sent"
                ? "orange"
                : row == "Offer Accepted"
                ? "green"
                : row == "Not Contactable"
                ? "Grey"
                : row == "Call Back"
                ? "#F56EB3"
                : row === "Shortlisted"
                ? "Green"
                : row==="Ringing"
                ? "#609EA2"
                : row==="Wrong Number"
                ? "#F55050"
                : row==="Will Revert"
                ? "#FFEA20"
                : row==="Call Back"
                ? "#8DCBE6"
                : row==="Shortlisted"
                ? "#ABC270"
                : row==="Not Contactable"
                ? "#C780FA"
                : row==="Not Suitable"
                ? "#39B5E0"
                : row==="Not Interested"
                ? "#FF7B54"
                : row==="For Future Openings"
                ? "#3C6255"
                : row==="Selected"
                ? "#FD8A8A"
                : row==="On Hold"
                ? "#F8F988"
                : row==="Rejected"
                ? "#DC0000"
                : row==="NA"
                ? "#181D31"
                : row==="Scheduled"
                ? "#46C2CB"
                : row==="Offer Sent"
                ? "#00FFF6"
                : row==="Offer on Hold"
                ? "#D989B5"
                : row==="Offer Accepted"
                ? "#03C988"
                : row==="Offer Not Accepted"
                ? "#DC0000"
                : row==="Joining"
                ? "#FFD56F"
                : row==="Backed Out"
                ? "#58287F"
                :"#61876E",
              }}
            >
              {row}
            </button>
          );
        },
      },
    },
    {
      name: "",
      label: "Timeline",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (row, data) => {
          return (
            <>
              <div id={styles.actions2}>
                <Tooltip title="Timeline" placement="left">
                  <TrendingUpIcon
                    onClick={() => handleTimeline(row, data)}
                    data-toggle="modal"
                    data-target="#exampleModalCenter3"
                  />
                </Tooltip>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "CAN_ID",
      label: "NOTICE PERIOD",
      options: {
        filter: true,
        sort: false,
        display: "none",
      },
    },
  ];



  return (
    <>
      <MiniDrawer header_name="Directory" />
   
      <div id={styles.directory_table}>
        <MUIDataTable
          title={<h4 style={{ textAlign: "left" }}>Candidate Directory</h4>}
          data={data}
          columns={columns}
          options={{
            options: options,
            selectableRows: "none",
            viewColumns: false,
            print: false,
            responsive: "standard",
            download: true,
            fixedHeader: true,
            tableBodyMaxHeight: "650px",
            setTableProps: () => {
              return {
                padding: "default",
              };
            },
            customToolbar: () => {
              return (
                <button
                  className="btn btn-primary"
                  // data-toggle="modal"
                  // data-target="#exampleModalCenter2"
                  onClick={handleOpen}
                >
                  ADD CANDIDATE
                </button>
              );
            },
          }}
        />


      </div>

      {/* Side Bar for inprogress ans assigned status */}

      <Drawer
        anchor="right"
        open={openMappingDrawer}
        onClose={toggleDrawer("hrMapping")}
        sx={{ zIndex: "9999" }}
      >
        <Timeline_drawer
          clickEvent={toggleDrawer("hrMapping")}
          timeline={details}
        />
      </Drawer>

      {/* Modal for adding cadidate */}



      {source_data.length>1?<Add_Candidate_Modal
           open={open}
           handleClose={handleClose}
           handleOpen={handleOpen}
           setOpen={setOpen}
           styles={styles}
           collect_info={collect_info}
           handleSubmit={handleSubmit}
           work_ref={work_ref}
           handleWork={handleWork}
           show_exp={show_exp}
           show_work={show_work}
           exp_ref={exp_ref}
           handleExp={handleExp}
           source_data={source_data}
        />:<></>}

      {/* <div
        class="modal fade"
        id="exampleModalCenter2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Candidate Form
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="modal-body"
              style={{
                textAlign: "left",
              }}
            >
              <form action="">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="" id={styles.label_form}>
                      Full Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="NAME"
                      onChange={collect_info}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="" id={styles.label_form}>
                      Mobile Number<span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="MOBILE"
                      onChange={collect_info}
                      maxLength="10"
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="" id={styles.label_form}>
                      Email ID<span>*</span>{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="EMAIL"
                      onChange={collect_info}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="" id={styles.label_form}>
                      Source Of Candidate<span>*</span>
                    </label>
                    <select
                      id=""
                      className="form-control"
                      name="SOURCE_OF_CANDIDATE"
                      onChange={collect_info}
                    >
                      <option value="" selected>
                        Please Select
                      </option>
                      {source_data?.map((ele) => (
                        <>
                          <option value={ele.id}>{ele.text}</option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="" id={styles.label_form}>
                      Address<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="ADDRESS"
                      onChange={collect_info}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6" style={{ display: "flex" }}>
                    <h6>
                      Experienced?<span>*</span>{" "}
                      <input
                        type="checkbox"
                        style={{ marginTop: "20px",cursor:"pointer" }}
                        ref={exp_ref}
                        name="IS_EXP"
                        onChange={handleExp}
                      />
                    </h6>
                  </div>
                  {show_exp || show_work ? (
                    <div className="col-6">
                      <label htmlFor="" id={styles.label_form}>
                        Number Of Experience<span style={{color:"red"}}>*</span>(In years)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="EXP"
                        onChange={collect_info}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="row">
                  <div className="col-6" style={{ display: "flex" }}>
                    <h6>
                      Is Working?<span style={{color:"red"}}>*</span>
                      <input
                        type="checkbox"
                        style={{ marginTop: "20px",cursor:"pointer" }}
                        ref={work_ref}
                        name="IS_WORKING"
                        onChange={handleWork}
                      />
                    </h6>
                  </div>
                </div>
                {show_exp || show_work ? (
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="" id={styles.label_form}>
                        Current Company Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="CURRENT_COMPANY"
                        onChange={collect_info}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="" id={styles.label_form}>
                        Current Designation<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="CURRENT_DESIGNATION"
                        onChange={collect_info}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="" id={styles.label_form}>
                        Current Gross<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="CURRENT_GROSS"
                        onChange={collect_info}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="" id={styles.label_form}>
                        Notice Period<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="NOTICE_PERIOD"
                        onChange={collect_info}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </div>
            <div class="modal-footer">
              <button
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Directory;
