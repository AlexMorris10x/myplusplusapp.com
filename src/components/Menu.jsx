import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Projects from "./Projects";
import Sidebar from "react-sidebar";

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
        <ul className="nav">
          {/* <li>
            <Link to="/login" className="nav-link" onClick={this.props.logout}>
              Logout
            </Link>
          </li> */}
          <ProjectMenuClosed>
            <li>
              <button
                stle={{ marginTop: "1" }}
                onClick={() => this.onSetSidebarOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
          </ProjectMenuClosed>
        </ul>
      );
    } else if (this.props.loggedIn && this.state.sidebarOpen === true) {
      return (
        <React.Fragment>
          <ul className="nav">
            {/* <li>
              <Link
                to="/login"
                className="nav-link"
                onClick={this.props.logout}
              >
                Logout
              </Link>
            </li> */}
          </ul>
          <Sidebar
            sidebar={
              <b>
                <ul className="nav">
                  <ProjectMenuOpen>
                    <button onClick={() => this.onSetSidebarOpen(false)}>
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </ProjectMenuOpen>
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
            styles={sidebarStyles}
          ></Sidebar>
        </React.Fragment>
      );
    }
    // if (!this.props.loggedIn) {
    //   return (
    //     <ul className="nav">
    //       <li className="nav-item">
    //         <Link to="/login" className="nav-link">
    //           Login
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link to="/signup" className="nav-link">
    //           Sign up
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // }
  }
}

export default Menu;

const ProjectMenuClosed = styled.div`
  float: left;
  width: 100px;
  height: 100%;
  margin: 10px;
  border-right: 1px solid black;
`;

const ProjectMenuOpen = styled.div`
  float: left;
  width: 157px;
  height: 100%;
  margin: 10px;
  border-right: 1px solid black;
`;

const sidebarStyles = {
  sidebar: {
    margin: "auto",
    background: "white",
    width: 400,
    top: 0,
    bottom: 0
  }
};
