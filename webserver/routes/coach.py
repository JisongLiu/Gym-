from flask import render_template,Response
from . import routes
from server import *
import json

@routes.route('/coach')
def coach():
    return render_template("coach.html")


@routes.route('/coach/gethalls',methods=['GET'])
def halls():
    halls_data=[]
    cursor = g.conn.execute('SELECT * from hall;')
    for row in cursor:
        temp = {'location':'','name':'','capacity':''}
        temp['location'] = row[0]
        temp['name'] = row[1]
        temp['capacity'] = row[2]
        halls_data.append(temp)
    resp = Response(response=json.dumps(halls_data),status=200, mimetype="application/json")
    return(resp)
    
@routes.route('/coach/getavailablehall',methods=['POST'])
def available_hall():
    data = request.get_json()
    availability = []
    cursor = g.conn.execute('SELECT timeslot from instruction; where name = \"%s\"', data['name'])
    for row in cursor:
        availability.append(row[0])
    resp = Response(response=json.dumps(availability),status=200, mimetype="application/json")
    return(resp)

@routes.route('/coach/gettrain',methods=['POST'])
def trainning():
    data = request.get_json()
    trainning_data = []
    cursor = g.conn.execute('SELECT * from train where coaid = %s;', data['coaid'])
    for row in cursor:
        temp = {'time':'','date':'','coaid':'','pid':''}
        temp['time'] = row[0].strftime('%H:%M:%S')
        temp['date'] = row[1].strftime('%Y-%m-%d')
        temp['coaid'] = row[2]
        temp['pid'] = row[3]
        trainning_data.append(temp)
    resp = Response(response=json.dumps(trainning_data),status=200, mimetype="application/json")
    return(resp)