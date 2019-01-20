export default class AutomateFigmaPlugin {
  getSelection() {
    const { App } = window;
    const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
    return selectedNodes;
  }

  createComponents() {
    this.process(this.getSelection(), "create-symbol");
  }

  detachInstance() {
    this.process(this.getSelection(), "detach-instance");
  }

  createGroups() {
    this.process(this.getSelection(), "group-selection");
  }

  copyAsPng() {
    App.triggerAction("copy-as-png");
  }

  copyAsJpg() {
    App.triggerAction("copy-as-jpg");
  }

  showGuids() {
    App.triggerAction("toggle-show-guids");
  }

  async process(selectedNodes, task) {
    const { App, figmaPlugin } = window;
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
      itemLabel: "Detach Instances",
      triggerFunction: automateFigmaPlugin.detachInstance.bind(
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
      itemLabel: "Copy as PNG",
      triggerFunction: automateFigmaPlugin.copyAsPng.bind(automateFigmaPlugin),
      condition: null,
      shortcut: null
    },
    {
      itemLabel: "Copy as JPG",
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

window.createComponentsPlugin = new CreateComponentsPlugin();
