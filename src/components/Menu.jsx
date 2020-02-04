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
        <div></div>
        <LogoWrapper>
          <Link to="/">PlusPlus++</Link>
        </LogoWrapper>
        <LoggedOutMenuWrapper>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </LoggedOutMenuWrapper>
      </MenuWrapper>
    );
  }
  if (props.loggedIn && state.sidebarOpen === false) {
    return (
      <MenuWrapper>
        <SideBarWrapper>
          <MainMenuButton onClick={() => onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </MainMenuButton>
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
      <React.Fragment>
        <MenuWrapper>
          <SideBarWrapper>
            <MainMenuButton onClick={() => onSetSidebarOpen(false)}>
              <FontAwesomeIcon icon={faBars} />
            </MainMenuButton>
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
            sidebar={
              <div>
                <MenuWrapper>
                  <SideBarButton onClick={() => onSetSidebarOpen(false)}>
                    <FontAwesomeIcon icon={faBars} />
                  </SideBarButton>
                </MenuWrapper>
                <Projects
                  projects={props.projects}
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
      </React.Fragment>
    );
  }
}

export default Menu;

const LoggedOutMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  margin: -8px;
  padding: 10px;
  background: #333;
  > a {
    color: white;
    text-decoration: none;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -8px;
  padding: 10px;
  background: #333;
  > a {
    color: white;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  > a {
    color: white;
    text-decoration: none;
    font-size: 2em;
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

const MainMenuButton = styled.button`
  padding: 8px 10px 8px 10px;
  border-radius: 10px;
`;

const SideBarButton = styled.button`
  margin: 6px;
  padding: 8px 10px 8px 10px;
  border-radius: 10px;
`;
