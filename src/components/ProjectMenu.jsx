import React from "react";
import Projects from "./Projects";
import Sidebar from "react-sidebar";

class ProjectMenu extends React.Component {
  state = {
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    if (this.state.sidebarOpen === false)
      return (
        <div>
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open Projects
          </button>
        </div>
      );
    return (
      <Sidebar
        sidebar={
          <b>
            <button onClick={() => this.onSetSidebarOpen(false)}>
              Close Projects
            </button>
            <Projects
              projects={this.props.projects}
              username={this.props.username}
              addProject={this.props.addProject}
              updateProject={this.props.updateProject}
              deleteProject={this.props.deleteProject}
              projectHandleOpen={this.props.projectHandleOpen}
              projectHandleCloset={this.props.projectHandleClose}
            />
          </b>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      ></Sidebar>
    );
  }
}

export default ProjectMenu;
