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
      return (
        <ul style={styleUl}>
          <li style={styleLi}>
            {/* <Link to="/login" onClick={this.props.logout}>
              Logout
            </Link> */}
          </li>
          <div style={styleProjectMenuClosed}>
            <li style={styleLi}>
              <button onClick={() => this.onSetSidebarOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
          </div>
        </ul>
      );
    } else if (this.props.loggedIn && this.state.sidebarOpen === true) {
      return (
        <React.Fragment>
          <ul style={styleUl}>
            <li style={styleLi}>
              <Link
                to="/login"
                onClick={this.props.logout}
                style={{ color: "#333333" }}
              >
                Logout
              </Link>
            </li>
          </ul>
          <Sidebar
            sidebar={
              <b>
                <ul style={styleUl}>
                  <div style={styleProjectMenuOpen}>
                    <button onClick={() => this.onSetSidebarOpen(false)}>
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
              </b>
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
  listStyleType: "none",
  margin: 0,
  padding: 0,
  overflow: "hidden",
  backgroundColor: "#333"
};

const styleLi = {
  float: "right",
  display: "block",
  color: "white",
  textAlign: "center",
  padding: "14px",
  textDecoration: "none"
};

const styleProjectMenuClosed = {
  float: "left",
  width: 100,
  height: "100%",
  margin: 10,
  borderRight: 1
};

const styleProjectMenuOpen = {
  float: "left",
  height: "100%",
  margin: 10,
  borderRight: 1
};
