import React from "react";
import appWriteService from "../../AppWrite/Conf";
import { Link } from "react-router-dom";

function Postcard({post}) {
  const {$id,Title,Featuredimage}=post
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          {Featuredimage && (
            <img
              src={appWriteService.getFilePreview(Featuredimage)}
              alt={Title}
              className="rounded-xl"
            />
          )}
          <h2 className="text-xl font-bold">{Title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
