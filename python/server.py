import tornado.ioloop
import tornado.web
import nltk

class PosHandler(tornado.web.RequestHandler):

  def get(self):
    self.write(self.parse_data(self.get_query_argument('text')))

  def parse_data(self, data):
    tokens =  nltk.word_tokenize(data)
    tagged = nltk.pos_tag(tokens)
    entities = nltk.chunk.ne_chunk(tagged)
    return {'tree': self.tree_to_dict(entities)}

  def tree_to_dict(self, tree):
    return {tree.label(): [self.tree_to_dict(t)  if isinstance(t, nltk.Tree) else t
                    for t in tree]}

application = tornado.web.Application([
    (r"/pos", PosHandler),
])

if __name__ == "__main__":
    application.listen(1234)
    tornado.ioloop.IOLoop.instance().start()
