import React, { useEffect, useState } from 'react'
import { getAdminDetails, updateAdminDetails } from '../../apiClient/dashboard';
import BarGraph from './graph/BarGraph';

const Dashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [isCharged, setIsCharged] = useState(null);
  const [category, setCategory] = useState([]);
  const categoryMin = [99, 79, 59, 39, 19];

  useEffect(()=>{
    const {id} = JSON.parse(localStorage.getItem("user"));
    getAdminDetails(id).then((res)=>{
      const amount = res?.data?.data?.amount
      setCategory([
        amount?.category_6,
        amount?.category_7,
        amount?.category_8,
        amount?.category_9,
        amount?.category_10
      ]);
      setAdminDetails(res?.data?.data);
      setIsCharged(res?.data?.data?.charge_customers);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  const isDisabled = ()=>{
    const hasInvalidCategory = category.some(
      (ele, index) => ele < categoryMin[index]
    );
    return hasInvalidCategory;
  }
 const data = {
   labels: ["custom", "category 7", "category 8", "category 9", "category 10"],
   datasets: [
     {
       label: "",
       data: category,
       backgroundColor: "#F0C3F1",
       borderWidth: 2,
       borderRadius: 2,
       borderSkipped: true,
     },
   ],
 };

 const option = {
   maintainAspectRatio: false,
   borderSkipped: false,
   barPercentage: 0.8,
   maxBarThickness: 20,
   height: 600,
   width: 600,
 };

 const handleSave =async ()=>{
    const {id} = JSON.parse(localStorage.getItem("user"));
  let amount = {};
  if(adminDetails?.amount?.category_6 !== category[0]){
    amount.category_6 = category[0]
  }
  if (adminDetails?.amount?.category_7 !== category[1]) {
    amount.category_7 = category[1]
  }
  if (adminDetails?.amount?.category_8 !== category[2]) {
    amount.category_8 = category[2]
  }
  if (adminDetails?.amount?.category_9 !== category[3]) {
    amount.category_9 = category[3];
  }
  if (adminDetails?.amount?.category_10 !== category[4]) {
    amount.category_10 = category[4];
  }
  const payload = {
    amount: amount
  }
  await updateAdminDetails({id:id,payload:payload}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
  await getAdminDetails(id).then((res)=>{
    setAdminDetails(res?.data?.data);
    setIsCharged(res?.data?.data?.charge_customers);
  }).catch((err)=>{
    console.log(err);
  })
 }


  return (
    <div className="bg-[#030303] flex w-screen min-h-screen h-full justify-center items-center py-10">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center w-[600px]">
          <p className="text-white text-4xl flex w-full justify-center pb-4">
            {adminDetails?.name}, {adminDetails?.location} on Dhum Jam
          </p>
        </div>

        <div className="flex flex-col gap-4 w-[600px]">
          <div className="flex gap-4 justify-between">
            <p className="text-white max-w-[300px]">
              Do you want to charge your costumers for requesting songs?
            </p>
            <div className="flex items-center w-[300px] gap-1 justify-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="Yes"
                  className={
                    !adminDetails?.charge_customers
                      ? "appearance-none border rounded-full w-3 h-3 checked:border-[#C2C2C2]"
                      : ""
                  }
                  checked={isCharged}
                  onClick={() => setIsCharged((prevState) => !prevState)}
                  disabled={!adminDetails?.charge_customers}
                />
                <p className="text-white">Yes</p>
              </div>
              <div className="text-white flex items-center gap-2">
                <input
                  type="radio"
                  name="Yes"
                  className={`
                    ${
                      !adminDetails?.charge_customers
                        ? "appearance-none border rounded-full w-3 h-3 checked:border-white checked:bg-[#C2C2C2]"
                        : ""
                    }
                  `}
                  checked={!isCharged}
                  onClick={() => setIsCharged((prevState) => !prevState)}
                  disabled={!adminDetails?.charge_customers}
                />
                <p>No</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between">
            <p className="text-white max-w-[300px]">
              Custom song request amount
            </p>
            <div className="text-white max-w-[300px]">
              <input
                type="number"
                value={category[0]}
                className={`bg-[#030303] w-[300px] h-8 rounded-lg ${
                  adminDetails?.charge_customers
                    ? "text-white"
                    : "text-[#C2C2C2]"
                } px-2 py-1 text-center`}
                style={{
                  borderColor: `${
                    adminDetails?.charge_customers ? "white" : "#C2C2C2"
                  }`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                min={categoryMin[0]}
                onChange={(e) => {
                  let newCategory = [...category];
                  newCategory[0] = e.target.value;
                  setCategory(newCategory);
                }}
                readOnly={!adminDetails?.charge_customers}
              />
            </div>
          </div>
          <div className="flex gap-4 w-[600px] mb-5">
            <p className="text-white max-w-[300px]">
              Regular song request amounts, from high to low
            </p>
            <div className="flex w-full max-w-[300px] justify-between">
              <input
                type="number"
                value={category[1]}
                className={`bg-[#030303] w-[60px] h-8 rounded-lg ${
                  adminDetails?.charge_customers
                    ? "text-white"
                    : "text-[#C2C2C2]"
                } px-2 py-1 text-center`}
                style={{
                  borderColor: `${
                    adminDetails?.charge_customers ? "white" : "#C2C2C2"
                  }`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                min={categoryMin[1]}
                onChange={(e) => {
                  let newCategory = [...category];
                  newCategory[1] = e.target.value;
                  setCategory(newCategory);
                }}
                readOnly={!adminDetails?.charge_customers}
              />
              <input
                type="number"
                value={category[2]}
                className={`bg-[#030303] w-[60px] h-8 rounded-lg ${
                  adminDetails?.charge_customers
                    ? "text-white"
                    : "text-[#C2C2C2]"
                } px-2 py-1 text-center`}
                style={{
                  borderColor: `${
                    adminDetails?.charge_customers ? "white" : "#C2C2C2"
                  }`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                min={categoryMin[2]}
                onChange={(e) => {
                  let newCategory = [...category];
                  newCategory[2] = e.target.value;
                  setCategory(newCategory);
                }}
                readOnly={!adminDetails?.charge_customers}
              />
              <input
                type="number"
                value={category[3]}
                className={`bg-[#030303] w-[60px] h-8 rounded-lg ${
                  adminDetails?.charge_customers
                    ? "text-white"
                    : "text-[#C2C2C2]"
                } px-2 py-1 text-center`}
                style={{
                  borderColor: `${
                    adminDetails?.charge_customers ? "white" : "#C2C2C2"
                  }`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                min={categoryMin[3]}
                onChange={(e) => {
                  let newCategory = [...category];
                  newCategory[3] = e.target.value;
                  setCategory(newCategory);
                }}
                readOnly={!adminDetails?.charge_customers}
              />
              <input
                type="number"
                value={category[4]}
                className={`bg-[#030303] w-[60px] h-8 rounded-lg ${
                  adminDetails?.charge_customers
                    ? "text-white"
                    : "text-[#C2C2C2]"
                } px-2 py-1 text-center`}
                style={{
                  borderColor: `${
                    adminDetails?.charge_customers ? "white" : "#C2C2C2"
                  }`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                min={categoryMin[4]}
                onChange={(e) => {
                  let newCategory = [...category];
                  newCategory[4] = e.target.value;
                  setCategory(newCategory);
                }}
                readOnly={!adminDetails?.charge_customers}
              />
            </div>
          </div>
        </div>
        {adminDetails?.charge_customers && (
          <BarGraph data={data} options={option} />
        )}

        <div className="flex justify-center w-[600px] mt-2">
          {console.log(isDisabled())}
          <button
            className={`${
              adminDetails?.charge_customers && isDisabled() === false
                ? "bg-[#6741D9]"
                : "bg-[#C2C2C2]"
            } rounded-md  w-full h-8 mt-4 hover:border hover:border-[#F0C3F1]`}
            disabled={isDisabled() || !adminDetails?.charge_customers}
            onClick={handleSave}
          >
            <p className="text-white">Save</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard