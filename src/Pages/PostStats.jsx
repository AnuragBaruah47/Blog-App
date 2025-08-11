import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../AppWrite/Conf";
import {IconContext} from "react-icons"
import { FaHeart,FaRegHeart } from "react-icons/fa";

function PostStats({ post }) {
  const user = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const likeList = post.likes.map((user) => {
    user?.$id;
  });
  const [likes, setLikes] = useState(likeList);
  const checkedIfLiked = (likes, userId) => {
    return likes.includes(userId) ? true : false;
  };

  const handleLikePost = async () => {
    let likesArray = [...likes];
    if (likesArray.includes(user?.$id)) {
      likesArray = likesArray.filter((Id) => Id !== user?.$id);
    } else {
      likesArray.push(user.$id);
    }
    setLikes(likesArray);
    await appwriteService.likePost(post?.$id,likesArray)
  };

  return <div>
    <button onClick={handleLikePost}>
      <IconContext.Provider value={{size:"1.5em"}}>
        {checkedIfLiked(likes,user?.$id)?
        (<FaHeart className="text-red-700"/>):(<FaRegHeart className="text-white"/>)}
      </IconContext.Provider>
    </button>
  </div>;
}

export default PostStats;
