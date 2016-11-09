from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/manager')
def manager():
    return render_template("manager.html")