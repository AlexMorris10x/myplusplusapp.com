import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";
import windowSize from "react-window-size";
class Menu extends React.Component {
  state = {
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    if (this.props.loggedIn && this.state.sidebarOpen === false) {
      if (this.props.windowWidth > 1200) {
        return (
          <ul style={styleUl}>
            <span style={styleSideBar}>
              {/* <button onClick={() => this.onSetSidebarOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </button> */}
            </span>
            <span style={styleLogo}>
              <h1>PlusPlus++</h1>
            </span>
            <span>
              <Link
                to="/login"
                onClick={this.props.logout}
                style={{ color: "#333333" }}
              >
                Logout
              </Link>
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
              <h1>PlusPlus++</h1>
            </span>
            <span>
              <Link
                to="/login"
                onClick={this.props.logout}
                style={{ color: "#333333" }}
              >
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
              {/* <button onClick={() => this.onSetSidebarOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </button> */}
            </span>
            <span style={styleLogo}>
              <h1>PlusPlus++</h1>
            </span>
            <span>
              <Link
                to="/login"
                onClick={this.props.logout}
                style={{ color: "#333333" }}
              >
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
    // if (!this.props.loggedIn) {
    //   return (
    //     <ul style={styleUl}>
    //       <li style={styleLi}>
    //         <Link to="/login">Login</Link>
    //       </li>
    //       <li style={styleLi}>
    //         <Link to="/signup">Sign up</Link>
    //       </li>
    //     </ul>
    // );
    // }
  }
}

export default windowSize(Menu);

const styleUl = {
  display: "flex",
  backgroundColor: "#333",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "auto",
  padding: 20
};

const styleLogo = {
  color: "white"
};

const styleSideBar = {
  alignItems: "left"
};
