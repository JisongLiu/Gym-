from flask import render_template
from . import routes
from server import *

@routes.route('/')
def index():
  return render_template("index.html")
