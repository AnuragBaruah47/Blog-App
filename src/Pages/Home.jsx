import React, { useEffect, useState } from "react";
import service from "../AppWrite/Conf";
import { Container, Postcard } from "../Components/Index";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.userData);
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
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {!user && (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login To Read Post
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((eachPost) => {
            <div key={eachPost.$id} className="p-2 w-1/4">
              <Postcard {...eachPost} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
