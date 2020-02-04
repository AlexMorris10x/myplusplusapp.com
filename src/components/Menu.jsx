import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";
import styled from "styled-components";

function Menu(props) {
  const [state, setState] = useState({
    redirectTo: null,
    sidebarOpen: false
  });

  const onSetSidebarOpen = open => {
    setState({ sidebarOpen: open });
  };

  if (!props.loggedIn) {
    return (
      <MenuWrapper>
        <div>{/*Flex-Div*/}</div>
        <Link to="/">PlusPlus++</Link>
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      </MenuWrapper>
    );
  }
  if (props.loggedIn && state.sidebarOpen === false) {
    return (
      <MenuWrapper>
        <SideBarWrapper>
          <Button onClick={() => onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </SideBarWrapper>
        <LogoWrapper>
          <Link to="/">PlusPlus++</Link>
        </LogoWrapper>
        <Link to="/login" onClick={props.logout}>
          Logout
        </Link>
      </MenuWrapper>
    );
  }
  if (props.loggedIn && state.sidebarOpen === true) {
    return (
      <div>
        <MenuWrapper>
          <SideBarWrapper>
            <Button onClick={() => onSetSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </SideBarWrapper>
          <LogoWrapper>
            <Link to="/">PlusPlus++</Link>
          </LogoWrapper>
          <Link to="/login" onClick={props.logout}>
            Logout
          </Link>
        </MenuWrapper>
        <SideBarWrapper>
          <Sidebar
            className="superman"
            sidebar={
              <div>
                <MenuWrapper>
                  <div>
                    <Button onClick={() => onSetSidebarOpen(false)}>
                      <FontAwesomeIcon icon={faBars} />
                    </Button>
                  </div>
                </MenuWrapper>
                <Projects
                  projects={props.projects}
                  username={props.username}
                  addProject={props.addProject}
                  updateProject={props.updateProject}
                  deleteProject={props.deleteProject}
                  moveProject={props.moveProject}
                  projectText={props.projectText}
                  writeProject={props.writeProject}
                />
              </div>
            }
            open={state.sidebarOpen}
            onSetOpen={onSetSidebarOpen}
          ></Sidebar>
        </SideBarWrapper>
      </div>
    );
  }
}

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  background-color: #333;
  align-items: center;
  justify-content: space-between;
  margin: -10px;
  padding: 20px;
  > a {
    color: white;
  }
`;

const LogoWrapper = styled.div`
  > a {
    color: white;
  }
`;

const SideBarWrapper = styled.div`
  > div {
    > div {
      > div {
        background: white;
        height: 100vh;
        width: 80vw;
      }
    }
  }
`;

const Button = styled.button`
  padding: 8px 10px 8px 10px;
  border-radius: 10px;
`;
