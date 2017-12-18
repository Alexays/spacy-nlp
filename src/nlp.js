// assuming server is started and ready
const polyIO = require('poly-socketio');
/* istanbul ignore next */
process.env.IOPORT = process.env.IOPORT || 6466;

module.exports = {
  // call the python spacy nlp parser via socketIO
  // output: [{text, len, tokens, noun_phrases, parse_tree, parse_list}]
  parse: (text) => {
    polyIO.client({ port: process.env.IOPORT });
    const msg = {
      input: text,
      to: 'nlp.cgkb-py',
      intent: 'parse',
    };
    return global.client.pass(msg)
      .then(reply => reply.output);
  },
};
