Blockly.defineBlocksWithJsonArray([
  {
    "type": "moveForward",
    "message0": "move forward",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "rotateLeft",
    "message0": "rotate left",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "rotateRight",
    "message0": "rotate right",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  }
]);

Blockly.JavaScript['moveForward'] = function(block) {
  const code = 'moveForward();\n';
  return code;
};

Blockly.JavaScript['rotateLeft'] = function(block) {
  const code = 'rotateLeft();\n';
  return code;
};

Blockly.JavaScript['rotateRight'] = function(block) {
  const code = 'rotateRight();\n';
  return code;
};

const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'moveForward',
    },
    {
      kind: 'block',
      type: 'rotateLeft',
    },
    {
      kind: 'block',
      type: 'rotateRight',
    },
  ],
};

const blocklyContainer = document.getElementById("blocklyContainer")

const workspace = Blockly.inject(blocklyContainer, {
  media: './node_modules/blockly/media/',
  toolbox: toolbox,
});

export { workspace };