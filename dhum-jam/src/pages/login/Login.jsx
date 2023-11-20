import React, { useState } from 'react'
import EyeIcon from '../../assets/svg/EyeIcon';
import SlashEyeIcon from '../../assets/svg/SlashEyeIcon';
import { logIn } from '../../apiClient/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isPassword, setIsPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogIn = async ()=>{
        const payload = {
            "username": username,
            "password": password
        }
        await logIn(payload).then((res)=>{
            localStorage.setItem("user",JSON.stringify(res?.data?.data));
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div className="bg-[#030303] flex w-screen h-full min-h-screen justify-center items-center">
      <div className="flex flex-col full">
        <div className="flex justify-center w-[600px]">
          <p className="text-white text-4xl w-[600px] flex items-center justify-center">Venue Admin Login</p>
        </div>
        <div className="flex justify-center gap-10 m-2 w-[600px]">
          <input
            type="text"
            className="w-[500px] bg-[#030303] h-8 rounded-lg text-white px-2 py-1"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            style={{
              borderColor: "white",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          />
        </div>
        <div className="flex justify-center gap-10 m-2">
          <input
            type={`${isPassword?"password":"text"}`}
            className="w-[500px] bg-[#030303] h-8 rounded-lg text-white px-2 py-1"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              borderColor: "white",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          />
          <span
            className="absolute right-[525px] top-[378px] transform -translate-y-1/2 cursor-pointer"
            onClick={()=>{setIsPassword((prevState)=> !prevState)}}
          >
            {isPassword?(
                <EyeIcon/>
            ):(
                <SlashEyeIcon/>
            )}
          </span>
        </div>
        <div className="flex justify-center">
          <button className="rounded-md bg-blue-900 w-[500px] h-8 mt-4" onClick={handleLogIn}>
            <p className="text-white">Sign In</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login