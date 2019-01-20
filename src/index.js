export default class AutomateFigmaPlugin {
  getSelection() {
    const { App } = window;
    const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
    return selectedNodes;
  }

  createComponents() {
    this.process(this.getSelection(), "create-symbol");
  }

  async breakComponents() {
    const { App } = window;
    for (const [index, node] of this.getSelection().entries()) {
      App.sendMessage("clearSelection");
      App.sendMessage("addToSelection", { nodeIds: [node] });
      App.triggerAction("duplicate-in-place");
      App.triggerAction("detach-instance");
      App.triggerAction("select-next-sibling");
      App.triggerAction("delete-selection");
    }
  }

  createGroups() {
    this.process(this.getSelection(), "group-selection");
  }

  copyAsPng() {
    App.triggerAction("copy-as-png");
  }

  showGuids() {
    App.triggerAction("toggle-show-guids");
  }

  async process(selectedNodes, task) {
    const { App } = window;
    for (const [index, node] of selectedNodes.entries()) {
      App.sendMessage("clearSelection");
      App.sendMessage("addToSelection", { nodeIds: [node] });
      App.triggerAction(task);
      App.sendMessage("clearSelection");
    }
  }
}

const automateFigmaPlugin = new AutomateFigmaPlugin();
window.automateFigmaPlugin = automateFigmaPlugin;

const menuItems = [
  "Automate",
  () => {},
  null,
  null,
  [
    {
      itemLabel: "Create Components",
      triggerFunction: automateFigmaPlugin.createComponents.bind(
        automateFigmaPlugin
      ),
      condition: null,
      shortcut: null
    },
    {
      itemLabel: "Break Components",
      triggerFunction: automateFigmaPlugin.breakComponents.bind(
        automateFigmaPlugin
      ),
      condition: null,
      shortcut: null
    },
    {
      itemLabel: "Create Groups",
      triggerFunction: automateFigmaPlugin.createGroups.bind(
        automateFigmaPlugin
      ),
      condition: null,
      shortcut: null
    },
    {
      itemLabel: "Copy as Image",
      triggerFunction: automateFigmaPlugin.copyAsPng.bind(automateFigmaPlugin),
      condition: null,
      shortcut: null
    },
    {
      itemLabel: "Show GUIDs",
      triggerFunction: automateFigmaPlugin.showGuids.bind(automateFigmaPlugin),
      condition: null,
      shortcut: null
    }
  ]
];

window.figmaPlugin.createPluginsMenuItem(...menuItems);
