import React from "react";
import { Container, LogoutButton, Logo } from "../Index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.statusUpdate);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px"></Logo>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(items.slug)}
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
