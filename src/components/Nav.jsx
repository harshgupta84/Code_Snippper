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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Nav = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout("/"));
    navigate("/");
  };

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Code Snipper
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
              <DropdownItem href="/profile">Dashboard</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logoutHandler}>Sign out</DropdownItem>
            </Dropdown>

            <NavbarToggle />
          </div>
        ) : (
          <NavbarLink href="/login">Login</NavbarLink>
        )}
        <NavbarCollapse>
          <NavbarLink href="/" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">How To use</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
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
