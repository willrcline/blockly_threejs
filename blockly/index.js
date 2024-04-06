// // Require Blockly core.
// const Blockly = require('blockly/core');
// // Require the default blocks.
// const libraryBlocks = require('blockly/blocks');
// // Require a generator.
// const {javascriptGenerator} =  require('blockly/javascript');
// // Require a message file.
// const En = require('blockly/msg/en');

// const {javascriptGenerator} = require('blockly/javascript');

// Create the definition.
// const definitions = Blockly.createBlockDefinitionsFromJsonArray([
//   {
//     // The type is like the "class name" for your block. It is used to construct
//     // new instances. E.g. in the toolbox.
//     type: 'move_forward',
//     // The message defines the basic text of your block, and where inputs or
//     // fields will be inserted.
//     message0: 'move forward',
//     args0: [
//       // Each arg is associated with a %# in the message.
//       // This one gets substituted for %1.
//       {
//         // The type specifies the kind of input or field to be inserted.
//         type: 'field_number',
//         // The name allows you to reference the field and get its value.
//         name: 'FIELD_NAME',
//       }
//     ],
//     // Adds an untyped previous connection to the top of the block.
//     previousStatement: null,
//     // Adds an untyped next connection to the bottom of the block.
//     nextStatement: null,
//   }
// ]);

// // Register the definition.
// Blockly.defineBlocks(definitions);


// const toolbox = {
//   // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
//   kind: 'flyoutToolbox',
//   // The contents is the blocks and other items that exist in your toolbox.
//   contents: [
//     {
//       kind: 'block',
//       type: 'controls_if'
//     },
//     {
//       kind: 'block',
//       type: 'controls_whileUntil'
//     }
//     // You can add more blocks to this array.
//   ]
// };

// const workspace = Blockly.inject('blocklyContainer', {toolbox: toolbox});

// javascriptGenerator.forBlock['move_forward'] = function(block, generator) {
//   return `moveForward`;
// }

// const code = javascriptGenerator.workspaceToCode(workspace);
// console.log("blockly code___", code);

const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'controls_if',
    },
    {
      kind: 'block',
      type: 'logic_compare',
    },
    {
      kind: 'block',
      type: 'controls_repeat_ext',
    },
    {
      kind: 'block',
      type: 'math_number',
      fields: {
        NUM: 123,
      },
    },
    {
      kind: 'block',
      type: 'math_arithmetic',
    },
    {
      kind: 'block',
      type: 'text',
    },
    {
      kind: 'block',
      type: 'text_print',
    },
  ],
};

const workspace = Blockly.inject('blocklyContainer', {
  media: './node_modules/blockly/media/',
  toolbox: toolbox,
});

export { workspace };