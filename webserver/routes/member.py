from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/member')
def member():
    return render_template("member.html")