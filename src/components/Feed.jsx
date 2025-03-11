import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const feedData = feed?.data;
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      console.log(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return <p className="flex justify-center margin-auto">Loading...</p>;
  if (!feedData.length) return <h3 className="flex justify-center mt-4">No more users to show</h3>;

  return feedData && <UserCard user={feedData[0]} />;
};
