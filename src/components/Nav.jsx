import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Flowbite,
  DarkThemeToggle,
} from "flowbite-react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const Nav = ({ setSearch }) => {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore();


  const logoutHandler = () => {
    logout("/");
    navigate("/");
  };

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Code Snipper AI
          </span>
          <Flowbite>
            <DarkThemeToggle className="ml-16" />
          </Flowbite>
        </NavbarBrand>
        {userInfo ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={userInfo.pic}
                  rounded
                  status="away"
                  statusPosition="bottom-right"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{userInfo.name}</span>
                <span className="block truncate text-sm font-medium">
                  {userInfo.email}
                </span>
              </DropdownHeader>
              <Link to="/mynotes">
                <span className="block text-sm">My Notes</span>
              </Link>
              <DropdownDivider />
              <Link to="/profile">
                {" "}
                <DropdownItem>Dashboard</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={logoutHandler}>Sign out</DropdownItem>
            </Dropdown>

            <NavbarToggle />
          </div>
        ) : (
          <Link to="/login">
            <NavbarLink>Login</NavbarLink>
          </Link>
        )}
        <NavbarCollapse>
          <NavbarLink href="/" active>
            Home
          </NavbarLink>
          <NavbarLink href="/about">About</NavbarLink>
          <NavbarLink href="https://www.markdownguide.org/basic-syntax/">How To use</NavbarLink>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
