from flask import render_template,Response
from . import routes
from server import *
import json

def table_name_extracter(name):
    cursor = g.conn.execute('SELECT column_name FROM information_schema.columns WHERE table_name= %s', name)
    names = []
    for row in cursor:
        names.append(row[0])
    return names

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
    cursor = g.conn.execute('SELECT timeslot from instruction where name = %s', data['name'])
    for row in cursor:
        availability.append(row[0])
    resp = Response(response=json.dumps(availability),status=200, mimetype="application/json")
    return(resp)

@routes.route('/coach/gettrain',methods=['POST'])
def trainning():
    data = request.get_json()
    trainning_data = []
    cursor = g.conn.execute('select time, date, coaid, name from train inner join member on (train.pid = member.pid) where coaid = %s;', data['coaid'])
    for row in cursor:
        temp = {'time':'','date':'','coaid':'','Member':''}
        temp['time'] = row[0].strftime('%H:%M:%S')
        temp['date'] = row[1].strftime('%Y-%m-%d')
        temp['coaid'] = row[2]
        temp['Member'] = row[3]
        trainning_data.append(temp)
    resp = Response(response=json.dumps(trainning_data),status=200, mimetype="application/json")
    return(resp)

@routes.route('/coach/addcourse',methods=['POST'])
def addcourse():
    data = request.get_json()
    
    if not checkcid(data['cid']):
        cursor = g.conn.execute('INSERT INTO course VALUES(%s,%s,%s,%s,%s)', data['cid'],data['name'],data['description'],data['tag'],data['memlevel'])
        resp = Response(response=json.dumps([{'result':'Success'}]),status=200, mimetype="application/json")
    else:
        resp = Response(response=json.dumps([{'result':'Failed'}]),status=200, mimetype="application/json")
    return(resp)

def checkcid(cid):
    cursor = g.conn.execute('SELECT cid from course where cid = %s', cid)
    existed = False
    for row in cursor: 
        existed = True
    return existed

@routes.route('/coach/addinstruction',methods=['POST'])
def addinstruction():
    data = request.get_json()
    if not check_time_hall(data['week'],data['time'],data['hallname']):
        cursor = g.conn.execute('INSERT INTO instruction VALUES(%s,%s,%s,%s,%s)', data['coaid'],data['cid'],data['hallname'],data['week'],data['time'])
        resp = Response(response=json.dumps([{'result':'Success'}]),status=200, mimetype="application/json")
    else:
        resp = Response(response=json.dumps([{'result':'Failed'}]),status=200, mimetype="application/json")
    return(resp)


def check_time_hall(week,time, hall):
    cursor = g.conn.execute('SELECT * from instruction where week = %s and time = %s and hallname = %s', week,time,hall)
    existed = False
    for row in cursor: 
        existed = True
    return existed

@routes.route('/coach/getinstruction',methods=['POST'])
def getinstruction():
    data = request.get_json()
    result = []
    table_names = table_name_extracter('instruction')
    cursor = g.conn.execute('SELECT * from instruction where coaid = %s',data['coaid'])
    for row in cursor:
        temp = {}
        for i in range(len(table_names)):            
            temp[table_names[i]]=row[i]
        result.append(temp)
    resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
    return(resp)
