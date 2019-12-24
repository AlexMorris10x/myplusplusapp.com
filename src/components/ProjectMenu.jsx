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
              // projectText={this.state.projectText}
            />
          </b>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <div>
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open Projects
          </button>
        </div>
      </Sidebar>
    );
  }
}

export default ProjectMenu;
