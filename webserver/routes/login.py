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
    #print type(data) data type dict
    #  yg5632 Yu Gu
    cursor = g.conn.execute('SELECT name from member where pid = %s and name = %s;', data['name'],data['password'])
    returned = {'name':''}
    for row in cursor:
        returned['name'] = row[0]
    passed_data = [returned]
    json_data = json.dumps(passed_data)
    resp = Response(response=json_data,status=200, mimetype="application/json")
    return(resp)
