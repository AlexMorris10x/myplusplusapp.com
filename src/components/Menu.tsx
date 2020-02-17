import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";
import styled from "styled-components";

function Menu(props: any): any {
  const [state, setState] = useState<any>({
    redirectTo: null,
    sidebarOpen: false
  });

  const onSetSidebarOpen = (open: boolean) => {
    setState({ sidebarOpen: open });
  };

  if (props.loggedIn && props.projects.length === 0) {
    state.sidebarOpen = true;
  }

  if (!props.loggedIn) {
    return (
      <MenuWrapper>
        <div></div>
        <LoggedOutLogoWrapper>
          <Link to="/">PlusPlus</Link>
        </LoggedOutLogoWrapper>
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
          <Link to="/">PlusPlus</Link>
        </LogoWrapper>
        <Link to="/" onClick={props.logout}>
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
            <Link to="/">PlusPlus</Link>
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
  background: #f9fafb;
  > a {
    color: #25282c;
    text-decoration: none;
    border-radius: 10px;
    font-weight: bold;
    &:hover {
      background: #e9ebee;
      border-radius: 10px;
    }
  }
`;

const LoggedOutLogoWrapper = styled.div`
  margin: 0 0 0 60px;
  > a {
    font-size: 1.7em;
    font-family: Arial;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 10px;
  background: #f9fafb;
  > div {
    &:hover {
      background: #e9ebee;
      border-radius: 10px;
    }
  }
  > a {
    color: #25282c;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      background: #e9ebee;
      border-radius: 10px;
    }
  }
`;

const LogoWrapper = styled.div`
  > a {
    color: #25282c;
    font-size: 1.7em;
    font-family: Arial;
  }
`;

const SideBarWrapper = styled.div`
  > div {
    > div {
      > div {
        margin: -4px;
        height: 100vh;
        background: #f9fafb;
        max-width: 400px;
        width: 40vw;
        @media (max-width: 600px) {
          width: 80vw;
        }
      }
    }
  }
`;

const MainMenuButton = styled.div`
  padding: 8px 10px 8px 10px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const SideBarButton = styled.div`
  margin: 6px;
  padding: 8px 10px 8px 10px;
  border: 1.5px solid black;
  border-radius: 10px;
`;
