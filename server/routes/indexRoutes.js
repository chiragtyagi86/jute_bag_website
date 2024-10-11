//initialized with the packacge here
const express = require("express");

const router = express.Router();

const std_data = [
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
  {
    id: "ey29020gh91072",
    personal_info: {
      name: "Chirag Tyagi",
      phone_no: 8650295888,
      email_id: "tyagi.chirag1234@gmail.com",
      address: {
        Street: "gali no 3",
        city: "Khatauli",
        state: "UP",
        pincode: 251201,
      },
    },
    college_name: "Abesit Ghaziabad",
    branch: "CSE",
    year: "3rd Year",
    rolle_no: 2202900100069,
    DOB: 24082004,
    blod_grp: "o-",
  },
];

router.get("/work", (req, res) => {
  res.send(std_data);
});
router.post("/sign-up", async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    console.log(email);
    
    })

module.exports = router;
