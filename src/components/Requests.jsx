import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

export const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getConectionRequests = async () => {
    setErrorMessage(""); // Clear previous error message
    try {
      const response = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRequests(
          response?.data?.data?.map((req) => ({
            ...req.senderId,
            _id: req._id,
          }))
        );
      }
    } catch (err) {
      setErrorMessage(err?.response?.data || "Failed to fetch requests.");
    }
  };

  const acceptOrRejectRequest = async (status, id) => {
    setErrorMessage(""); // Clear previous error message
    try {
      const response = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRequests(requests.filter((req) => req._id !== id));
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data || `Failed to ${status} the request.`
      );
    }
  };

  const handleRequest = (status, id) => {
    acceptOrRejectRequest(status, id);
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    getConectionRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Connection Requests
      </h1>
      {errorMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md border border-red-300 rounded-lg p-4 flex items-center justify-between pr-8 bg-red-100">
          <div className="flex-1 text-center">
            <label>{errorMessage}</label>
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={closeErrorMessage}
          >
            ✕
          </button>
        </div>
      )}
      {requests.length === 0 && !errorMessage && (
        <div className="margin-auto text-center text-xl">
            <label>No Requests found</label>
        </div>
      )}
      <div className="flex flex-wrap justify-center">
        {requests.map((request) => (
          <RequestCard
            key={request._id}
            request={request}
            onAccept={() => handleRequest("accepted", request._id)}
            onReject={() => handleRequest("rejected", request._id)}
          />
        ))}
      </div>
    </div>
  );
};