export default class AutomateFigmaPlugin {
  getSelection = () => {
    const { App } = window;
    const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
    return selectedNodes;
  };

  createComponents = () => {
    this.process(this.getSelection(), "create-symbol");
  };

  breakComponents = async () => {
    const { App } = window;
    for (const [index, node] of this.getSelection().entries()) {
      App.sendMessage("clearSelection");
      App.sendMessage("addToSelection", { nodeIds: [node] });
      App.triggerAction("duplicate-in-place");
      App.triggerAction("detach-instance");
      App.triggerAction("select-next-sibling");
      App.triggerAction("delete-selection");
    }
  };

  createGroups = () => {
    this.process(this.getSelection(), "group-selection");
  };

  copyAsPng = () => {
    App.triggerAction("copy-as-png");
  };

  showGuids = () => {
    App.triggerAction("toggle-show-guids");
  };

  process = async (selectedNodes, task) => {
    const { App } = window;
    for (const [index, node] of selectedNodes.entries()) {
      App.sendMessage("clearSelection");
      App.sendMessage("addToSelection", { nodeIds: [node] });
      App.triggerAction(task);
      App.sendMessage("clearSelection");
    }
  };
}

const automateFigmaPlugin = new AutomateFigmaPlugin();
window.automateFigmaPlugin = automateFigmaPlugin;

const menuItem = {
  label: "Automate",
  action: () => {},
  submenu: [
    {
      label: "Create Components",
      action: automateFigmaPlugin.createComponents
    },
    {
      label: "Break Components",
      action: automateFigmaPlugin.breakComponents
    },
    {
      label: "Create Groups",
      action: automateFigmaPlugin.createGroups
    },
    {
      label: "Copy as Image",
      action: automateFigmaPlugin.copyAsPng
    },
    {
      label: "Show GUIDs",
      action: automateFigmaPlugin.showGuids
    }
  ]
};

window.figmaPlus.addCommand(menuItem);
