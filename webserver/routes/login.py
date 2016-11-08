from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/another')
def another():
    return render_template("login_template.html")



@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    returned = {'id':'', 'identity':''}
    #print type(data) data type dict
    #  yg5632 Yu Gu
    cursor = g.conn.execute('SELECT pid from member where pid = %s and name = %s;', data['name'],data['password'])
    for row in cursor:
        returned['id'] = row[0]
        returned['identity'] = 'member'
    cursor = g.conn.execute('SELECT coaid from coach where coaid = %s and name = %s;', data['name'],data['password'])
    for row in cursor:
        returned['id'] = row[0]
        returned['identity'] = 'coach'
    cursor = g.conn.execute('SELECT manid from manager where manid = %s and name = %s;', data['name'],data['password'])
    for row in cursor:
        returned['id'] = row[0]
        returned['identity'] = 'manager'
    passed_data = [returned]
    json_data = json.dumps(passed_data)
    resp = Response(response=json_data,status=200, mimetype="application/json")
    return(resp)
