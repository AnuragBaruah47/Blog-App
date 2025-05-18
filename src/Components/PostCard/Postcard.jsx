import React from "react";
import appWriteService from "../../AppWrite/Conf";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          <img
            src={appWriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
