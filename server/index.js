fs = require('fs');

const socket = require('socket.io')();
const port = 3003;

const messageTmpl = {
  messageId: 1,
  text: 'income 1',
  out: true,
  date: new Date(),
  authorName: 'anddrews',
  read: false
};

let messages = Array(5).fill(0).map((item, index) => ({...messageTmpl, messageId: index}));

socket.on('connection', (client) => {
  client.on('subscribeToMessages', (props) => {
    client.emit('message:history', messages);
    
    client.on('message:out', (text) => {
      const newMessage = {
        messageId: messages.length + 1,
        text,
        out: false,
        read: false,
        authorName: 'Anonymous',
        date: new Date()
      };
      messages = [...messages, newMessage];
      
      client.emit('message:new', [newMessage]);
      setTimeout(() => {
        const newMessage = {
          messageId: messages.length + 1,
          text: `response for \n${messages[messages.length - 1].text}`,
          out: true,
          read: false,
          authorName: 'anddrews',
          date: new Date()
        };
        messages = [...messages, newMessage];
        client.emit('message:new', [newMessage]);
        client.emit('message:read', [messages[messages.length - 2].messageId])
      }, 2000)
    });
    
    client.on('upload:file', file => {
      let stream = fs.createWriteStream(file.fileName);
      stream.once("open", function() {
        stream.write(file.bufferArray, "base64");
        stream.on('finish', function() {
          console.log('upload finished');
          stream.close();
        });
      });
    })
  })
  
});

socket.listen(port);

console.log(`listening on port ${port}`);
