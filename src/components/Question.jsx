import React from "react";
import "../index.css";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";

const Question = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://gdsc-au-server.onrender.com/users/currentUser/${localStorage.getItem(
          "userID"
        )}`
      );
      setCurrentUser(res.data);
      setAnswer({ ...answer, email: res.data.email, owner: res.data.name });
    })();
  }, []);

  const [answer, setAnswer] = React.useState({
    owner: "",
    email: "",
    que1: "",
    que2: "",
    que3: "",
    que4: "",
    submitedBy: localStorage.getItem("userID"),
  });
  const handleChange = (e) => {
    const { value, name } = e.target;

    setAnswer({ ...answer, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`https://gdsc-au-server.onrender.com/question/submit`, {
        ...answer,
      });
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:w-5/12 sm:w-10/12 flex flex-col my-2 relative h-auto  ">
      {!submitted ? (
        <div className="w-full flex flex-col my-2 relative h-auto">
          <div className="bg-white shadow px-7  flex flex-col my-4   py-3 rounded-xl w-full">
            <p>What is diffreence between Git and Github?</p>
            <input
              type="text"
              name="que1"
              onChange={(e) => handleChange(e)}
              value={answer.que1}
              className="px-3 py-1 text-sm focus:outline focus:outline-blue-500 my-3  rounded-md bg-gray-200 focus:bg-white"
            />
          </div>

          <div className="bg-white shadow flex flex-col  px-7 py-3 my-4 rounded-xl w-full">
            <p className="flex text-start">
              What is diffreence between Git and Github?
            </p>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="que2"
              value={answer.que2}
              className="px-3 py-1 text-sm focus:outline focus:outline-blue-500 my-3 rounded-md  bg-gray-200 focus:bg-white"
            />
          </div>

          <div className="bg-white shadow flex flex-col  px-7 py-3 my-4 rounded-xl w-full">
            <p className="flex text-start">
              What is the purpose of a Git "pull request" in the context of
              GitHub?
            </p>
            <input
              type="text"
              name="que3"
              onChange={(e) => handleChange(e)}
              value={answer.que3}
              className="px-3 py-1 text-sm focus:outline focus:outline-blue-500 my-3 rounded-md  bg-gray-200 focus:bg-white"
            />
          </div>

          <div className="bg-white shadow flex flex-col  px-7 py-3 my-4 rounded-xl w-full">
            <p className="flex text-start">
              What is the purpose of a Git "pull request" in the context of
              GitHub?
            </p>

            <main className="my-2 mt-4">
              <input
                type="radio"
                name="que4"
                id="r1"
                value="To merge changes from one branch into another"
                onChange={(e) => handleChange(e)}
                className="px-3 py-1 text-sm  my-1 rounded-md  bg-gray-200 "
              />
              <label htmlFor="r1">
                To merge changes from one branch into another
              </label>
            </main>

            <main className="my-2">
              <input
                type="radio"
                onChange={(e) => handleChange(e)}
                name="que4"
                id="r2"
                value=" To request that someone else fix a bug in your code"
                className="px-3 py-1 text-sm  my-1 rounded-md  bg-gray-200 "
              />
              <label htmlFor="r2">
                To request that someone else fix a bug in your code
              </label>
            </main>

            <main className="my-2">
              <input
                value="To revert a previous commit"
                onChange={(e) => handleChange(e)}
                type="radio"
                name="que4"
                id="r3"
                className="px-3 py-1 text-sm  my-1 rounded-md  bg-gray-200 "
              />
              <label htmlFor="r3">To revert a previous commit</label>
            </main>

            <main className="my-2">
              <input
                type="radio"
                value="To delete a repository"
                onChange={(e) => handleChange(e)}
                id="r4"
                name="que4"
                className="px-3 py-1 text-sm my-1 rounded-md  bg-gray-200 "
              />
              <label htmlFor="r4">To delete a repository</label>
            </main>
          </div>

          <div className="flex justify-center my-4 poop items-center w-full">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 px-5 hover:bg-white hover:border-blue-500 hover:text-black border-2 border-blue-500 duration-150 delay-75 ease-in-out py-3 rounded-md text-white"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="px-5 py-3 flex w-full text-3xl text-green-500 gap-3 justify-center items-center  ">
          <MdOutlineDone size={30} />
          <p>Submitted!</p>
        </div>
      )}
    </div>
  );
};

export default Question;
