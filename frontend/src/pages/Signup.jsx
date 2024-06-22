import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen justify-center flex">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <Inputbox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"John"}
            title={"First Name"}
          />
          <Inputbox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Doe"}
            title={"Last Name"}
          />
          <Inputbox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"johndoe@gmail.com"}
            title={"Email"}
          />
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"123456"}
            title={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <Bottomwarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
