import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";

function Signup() {
  return (
    <div className="bg-slate-300 h-screen justify-center flex">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <Inputbox placeholder={"John"} title={"First Name"} />
          <Inputbox placeholder={"Doe"} title={"Last Name"} />
          <Inputbox placeholder={"johndoe@gmail.com"} title={"Email"} />
          <Inputbox placeholder={"123456"} title={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
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
