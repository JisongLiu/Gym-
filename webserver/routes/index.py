from flask import render_template
from . import routes
from server import *

@routes.route('/')
def index():
 
  print request.args
  cursor = g.conn.execute("SELECT name FROM test1")
  names = []
  for result in cursor:
    names.append(result['name'])  # can also be accessed using result[0]
  cursor.close()

  context = dict(data=names)

  return render_template("index.html", **context)
