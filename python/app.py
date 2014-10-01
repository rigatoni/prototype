import socket
import nltk

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
        print(message)

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

app = App()
app.run()
