import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";
import windowSize from "react-window-size";
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
      <React.Fragment>
        <styleUlLoggedout>
          <div>{/*Empty Div For Flex*/}</div>
          <div>
            <h1>
              <Link to="/" style={{ color: "white", textAlign: "center" }}>
                PlusPlus++
              </Link>
            </h1>
          </div>
          <div>
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </styleUlLoggedout>
      </React.Fragment>
    );
  }
  if (props.loggedIn && state.sidebarOpen === false) {
    if (props.windowWidth > 1200) {
      return (
        <styleUl>
          <div>{/*Empty Div For Flex*/}</div>
          <styleSideBar>
            <styleLogo>
              <h1>
                <Link to="/">
                  PlusPlus++
                </Link>
              </h1>
            </styleLogo>
          </styleSideBar>
          <span>
            <Link to="/login">Logout</Link>
          </span>
        </styleUl>
      );
    } else {
      return (
        <styleUl>
          <styleSideBar>
            <button
              onClick={() => onSetSidebarOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </styleSideBar>
          <styleLogo>
            <h1>
              <Link to="/">
                PlusPlus++
              </Link>
            </h1>
          </styleLogo>
          <span>
            <Link to="/login" onClick={props.logout}>
              Logout
            </Link>
          </span>
        </styleUl>
      );
    }
  } else if (props.loggedIn && state.sidebarOpen === true) {
    return (
      <React.Fragment>
        <styleUl>
          <styleSideBar>
            <div></div>
          </styleSideBar>
          <styleLogo>
            <h1>PlusPlus++</h1>
          </styleLogo>
          <span>
            <Link to="/login" onClick={props.logout}>
              Logout
            </Link>
          </span>
        </styleUl>
        <Sidebar
          sidebar={
            <React.Fragment>
              <styleUl>
                <div >
                  <button
                    onClick={() => onSetSidebarOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </styleUl>
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
            </React.Fragment>
          }
          open={state.sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          styles={{
            sidebar: {
              position: "fixed",
              margin: "auto",
              background: "white",
              height: "100%",
              width: props.windowWidth > 400 ? "40vw" : "80vw",
              maxWidth: 400,
              top: 0,
              bottom: 0
            }
          }}
        ></Sidebar>
      </React.Fragment>
    );
  }
}

export default windowSize(Menu);

const styleUlLoggedout = styled.div`
  display: flex;
  background-color: #333;
  justify-content: space-between;
  margin: auto;
  padding: 20px;
`;

const styleUl = styled.div`
  display: flex;
  background-color: black;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 20px;
`;

const styleSideBar = styled.div`
  align-items: left;
`

const styleLogo = styled.div`
  color: white;
`
const button = styled.button`
  padding: 8px 10px 8px 10px;
  border-radius: 10px;
`