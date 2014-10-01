import socket
import nltk
import json

class App:
    def setup(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect(('localhost', 1234))

    def event_loop(self):
        while True:
            self.handle_read()

    def handle_read(self):
        length = int(self.recv_until_newline())
        message = str(self.socket.recv(length), encoding='UTF-8')
        data = json.loads(message)
        self.socket.send(json.dumps(self.parseData(data)).encode('utf-8'))

    def recv_until_newline(self):
        message = ""
        while True:
            chunk = str(self.socket.recv(1), encoding='UTF-8')
            if chunk == "" or chunk == '\n':
                break
            message += chunk
        return message

    def run(self):
        self.setup()
        self.event_loop()

    def parseData(self, data):
        tokens =  nltk.word_tokenize(data['text'])
        tagged = nltk.pos_tag(tokens)
        entities = nltk.chunk.ne_chunk(tagged)
        return {'id': data['id'], 'tree': self.tree_to_dict(entities)}

    def tree_to_dict(self, tree):
        return {tree.label(): [self.tree_to_dict(t)  if isinstance(t, nltk.Tree) else t
                        for t in tree]}


app = App()
app.run()


