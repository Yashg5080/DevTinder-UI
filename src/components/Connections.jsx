import axios from "axios";
import { ConnectionCard } from "./ConnectionCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

// const connections = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//     photoUrl: "https://via.placeholder.com/150",
//     skills: "JavaScript, React, Node.js",
//     gender: "Male",
//     age: 30,
//     about: "A passionate developer.",
//   },
//   {
//     firstName: "Jane",
//     lastName: "Smith",
//     photoUrl: "https://via.placeholder.com/150",
//     skills: "Python, Django, Flask",
//     gender: "Female",
//     age: 28,
//     about: "A skilled backend developer.",
//   },
//   // Add more connections as needed
// ];

function Connections() {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setConnections(res.data.data);
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Connections</h1>
      <div className="flex flex-wrap justify-center">
        {connections.map((connection, index) => (
          <ConnectionCard key={index} connection={connection} />
        ))}
      </div>
    </div>
  );
}

export default Connections;