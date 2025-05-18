import React, { useState, useEffect } from "react";
import service from "../AppWrite/Conf";
import { Postcard, Container } from "../Components/Index";

function Allposts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      service
    .getPosts([])
    .then((post) => {
      if (post) {
        setPosts(post.documents);
      } else {
        console.log("empty");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((eachPost) => (
            <div key={eachPost.$id} className="p-2 w-1/4">
              <Postcard post={eachPost} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
