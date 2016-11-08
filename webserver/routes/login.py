from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/another')
def another():
  return render_template("login_template.html")

# Example of adding new data to the database
@routes.route('/add', methods=['POST'])
def add():
  name = request.form['name']
  print name
  g.conn.execute('INSERT INTO test1(name) VALUES (%s)', name)
  return redirect('/')


@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print data
    returned = {}
    returned['result'] = 'success'
    passed_data = [returned]
    json_data = json.dumps(passed_data)
    resp = Response(response=json_data,status=200, mimetype="application/json")
    return(resp)
