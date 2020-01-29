import { Link, Route } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";
import windowSize from "react-window-size";

class Menu extends React.Component {
  state = {
    redirectTo: null,
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <ul style={styleUlLoggedout}>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </ul>
      );
    }
    if (this.props.loggedIn && this.state.sidebarOpen === false) {
      if (this.props.windowWidth > 1200) {
        return (
          <ul style={styleUl}>
            <span style={styleSideBar}></span>
            <span style={styleLogo}>
              <h1>
                <Link to="/" style={{ color: "white" }}>
                  PlusPlus++
                </Link>
              </h1>
            </span>
            <span>
              <Link to="/login">Logout</Link>
            </span>
          </ul>
        );
      } else {
        return (
          <ul style={styleUl}>
            <span style={styleSideBar}>
              <button
                style={{ padding: "8px 10px 8px 10px", borderRadius: 10 }}
                onClick={() => this.onSetSidebarOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </span>
            <span style={styleLogo}>
              <h1>
                <Link to="/" style={{ color: "white" }}>
                  PlusPlus++
                </Link>
              </h1>
            </span>
            <span>
              <Link to="/login" onClick={this.props.logout}>
                Logout
              </Link>
            </span>
          </ul>
        );
      }
    } else if (this.props.loggedIn && this.state.sidebarOpen === true) {
      return (
        <React.Fragment>
          <ul style={styleUl}>
            <span style={styleSideBar}>
              <div style={{ margin: "18px" }}></div>
            </span>
            <span style={styleLogo}>
              <h1>PlusPlus++</h1>
            </span>
            <span>
              <Link to="/login" onClick={this.props.logout}>
                Logout
              </Link>
            </span>
          </ul>
          <Sidebar
            sidebar={
              <React.Fragment>
                <ul style={styleUl}>
                  <div style={{}}>
                    <button
                      style={{ padding: "8px 10px 8px 10px", borderRadius: 10 }}
                      onClick={() => this.onSetSidebarOpen(false)}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </ul>
                <Projects
                  projects={this.props.projects}
                  username={this.props.username}
                  addProject={this.props.addProject}
                  updateProject={this.props.updateProject}
                  deleteProject={this.props.deleteProject}
                  moveProject={this.props.moveProject}
                  projectText={this.props.projectText}
                  writeProject={this.props.writeProject}
                />
              </React.Fragment>
            }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{
              sidebar: {
                position: "fixed",
                margin: "auto",
                background: "white",
                height: "100%",
                width: this.props.windowWidth > 400 ? "40vw" : "80vw",
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
}
const styleUl = {
  display: "flex",
  backgroundColor: "#333",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "auto",
  padding: 20
};
const styleUlLoggedout = {
  display: "flex",
  backgroundColor: "#333",
  alignItems: "flex-end",
  justifyContent: "space-between",
  margin: "auto",
  padding: 20,
  flexDirection: "column"
};

const styleLogo = {
  color: "white"
};

const styleSideBar = {
  alignItems: "left"
};

export default windowSize(Menu);
