from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/coach')
def coach():
    return render_template("coach.html")


