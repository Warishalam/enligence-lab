import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import styles from "../styles/Table.module.css";
import Switch from "react-switch";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import Source_edit from "../Modals/Source_edit";
import Source_List_Modal from "../Modals/Source_List_Modal";
import swal from "sweetalert";
import nullData from "../images/data-null.gif";
import Swal from 'sweetalert2'

function Source_tbl({ data, get_source }) {
  const storage = window.sessionStorage;
  const [source, setSource] = useState("");
  const [desc, setDesc] = useState("");
  const [candidate_id, setCandidate_id] = useState("");
  const [source_add, setSource_Add] = useState("");
  const [desc_add, setDesc_Add] = useState("");

  // Modal functions

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const update_source = async () => {
    if (desc === "" || source === "") {
      // swal("All Fields Are compulsary!!");
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

    } else {
      try {
        let res = await fetch(
          "http://beta-hire.test.com/api/Master.svc/update_Source_of_candidate",
          {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              DESCRIPTION: desc,
              SOURCE_OF_CANDIDATE_ID: candidate_id,
              SOURCE_OF_CANDIDATE: source,
              USER_CODE: "3559EE6E-4D5D-4BF0-9308-6A6161B3B848",
            }),
          }
        );
        get_source();
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
          title: "source Updated Successfully"
        })
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
          icon: 'success',
          title: "Something Went Wrong"
        })
      }
    }
  };

  const add_souce = async () => {
    if (desc_add === "" || source_add === "") {
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
    } else {
      try {
        let res = await fetch(
          "http://beta-hire.test.com/api/Master.svc/insert_Source_of_candidate",
          {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              DESCRIPTION: desc_add,
              SOURCE_OF_CANDIDATE: source_add,
              CREATED_BY: "3559EE6E-4D5D-4BF0-9308-6A6161B3B848",
            }),
          }
        );
        get_source();
        handleClose2();
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
          title: "source Added Successfully"
        })
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
          icon: 'success',
          title: "Something Went Wrong"
        })
      }
    }
  };

  const handleClick = (val) => {
    setSource(val.rowData[2]);
    setDesc(val.rowData[3]);
    setCandidate_id(val.rowData[0]);
    handleOpen();
  };

  const options = {
    filterType: "checkbox",
  };
  const columns = [
    {
      name: "SOURCE_OF_CANDIDATE_ID",
      label: "SOURCE_OF_CANDIDATE_ID",
      options: {
        filter: true,
        sort: true,
        display: "none",
      },
    },
    {
      name: "ACTION",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (row, data) => {
          return (
            <>
              <EditIcon
                sx={{ color: "#007cc3", marginLeft: "10%", cursor: "pointer" }}
                onClick={() => handleClick(data)}
              />
            </>
          );
        },
      },
    },
    {
      name: "SOURCE_OF_CANDIDATE",
      label: "SOURCE OF CANDIDATE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "DESCRIPTION",
      label: "DESCRIPTION",
      options: {
        filter: true,
        sort: false,
        customBodyRender:(row)=>{
          return(
             <p style={{marginLeft:"15%",marginTop:"15px"}}>{row}</p>
          )
        }
      },
    },
    {
      name: "DELETED",
      label: "STATUS",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (row) => {
          return (
            <Switch
              checked={row === "1" ? false : true}
              offColor="#ef1049"
              width={68}
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 10,
                    color: "white",
                    paddingRight: 2,
                  }}
                >
                  Inactive
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 10,
                    color: "white",
                    paddingLeft: 2,
                  }}
                >
                  Active
                </div>
              }
              className="react-switch"
              id="icon-switch"
              disabled
            />
          );
        },
      },
    },
  ];

  if (data == null) {
    return (
      <>
        <img src={nullData} alt="" id={styles.nullGif} />
      </>
    );
  }
  return (
    <>
      <div id={styles.src_table}>
        <MUIDataTable
          title={
            <h4 style={{ textAlign: "left", color: "#007cc3" }}>Source List</h4>
          }
          data={data && data}
          columns={columns}
          options={{
            options: options,
            selectableRows: "none",
            viewColumns: false,
            print: false,
            responsive: "standard",
            download: true,
            fixedHeader: true,
            tableBodyMaxHeight: "500px",
            customToolbar: () => {
              return (
                <>
                  <IconButton>
                    <Button
                      variant="contained"
                      size="medium"
                      style={{ color: "white", backgroundColor: "#007CC3" }}
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={handleOpen2}
                    >
                      Source
                    </Button>
                  </IconButton>
                </>
              );
            },
          }}
        />
      </div>

      {/*  Modal afor adding source */}

      <Source_List_Modal
        open={open2}
        handleClose={handleClose2}
        handleOpen={handleOpen2}
        setSource_Add={setSource_Add}
        styles={styles}
        setDesc_Add={setDesc_Add}
        add_souce={add_souce}
      />

      {/*  Modal afor Editing source */}

      <Source_edit
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        source={source}
        setSource={setSource}
        desc={desc}
        setDesc={setDesc}
        update_source={update_source}
      />
    </>
  );
}

export default Source_tbl;
