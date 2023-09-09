import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Inquiry = () => {
  const resID = window.location.href.slice(29);
  const navigate = useNavigate();
  const [response, setResponse] = React.useState({});
  const [point, setPoint] = React.useState();
  const [updated, setUpdated] = React.useState(false);
  const userID = localStorage.getItem("userID");

  React.useEffect(() => {
    if (!userID) {
      return navigate("/");
    }
    (async () => {
      const res = await axios.get(
        `https://gdsc-au-server.onrender.com/question/singleResponse/${resID}`
      );
      setResponse(res.data);
    })();
    (async () => {
      const user = await axios.get(
        `https://gdsc-au-server.onrender.com/users/singleUser/${resID}`
      );
      setPoint(user.data.points);
    })();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://gdsc-au-server.onrender.com/users/updatePoints/${resID}`, {
        point,
      });
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100 w-screen flex-col h-screen  items-center ">
      <div className="w-screen">
        <Navbar />
      </div>

      {!updated ? (
        <div className="flex flex-col w-10/12  text-black mt-32 gap-2">
          <p className="my-5 text-lg bg-white py-3 px-5 shadow ">
            {response[0]?.que1}
          </p>
          <p className="my-5 text-lg bg-white py-3 px-5 shadow">
            {response[0]?.que2}
          </p>
          <p className="my-5 text-lg bg-white py-3 px-5 shadow">
            {response[0]?.que3}
          </p>

          <div className="bg-white shadow my-5 px-5 py-4 h-auto w-auto">
            <p className="my-2">Set points </p>
            <input
              type="number"
              onChange={(e) => {
                setPoint(e.target.value);
              }}
              value={point}
              className="bg-blue-100 outline-none shadow px-5 py-3 rounded-xl"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white  px-5 py-3 hover:bg-white delay-75 hover:border-2 translate duration-150 border-2 border-white  hover:border-blue-500 hover:text-black rounded-md poop "
          >
            Update Points
          </button>
        </div>
      ) : (
        <div
          className="flex mt-32 text-green-500  px-8 gap-2 py-3 
         text-3xl rounded-lg items-center justify-center"
        >
          <MdOutlineDone size={29} />
          Updated!
        </div>
      )}
    </div>
  );
};

export default Inquiry;
