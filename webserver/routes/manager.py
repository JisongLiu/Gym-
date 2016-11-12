from flask import render_template,Response
from . import routes
from server import *
import json
@routes.route('/manager')
def manager():
    return render_template("manager.html")

@routes.route('/manager/getequipments',methods=['GET'])
def equipemnts():
    equipemnts_data=[]
    cursor = g.conn.execute('SELECT * from equipment;')
    for row in cursor:
        temp = {'eid':'','brand':'','status':'','category':''}
        temp['eid'] = row[0]
        temp['brand'] = row[1]
        temp['status'] = row[2]
        temp['category'] = row[3]
        equipemnts_data.append(temp)
    resp = Response(response=json.dumps(equipemnts_data),status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/getcourses',methods=['GET'])
def courses():
    courses_data=[]
    cursor = g.conn.execute('SELECT * from course;')
    for row in cursor:
        temp = {'cid':'','name':'','description':'','tag':'','memlevel':''}
        temp['cid'] = row[0]
        temp['name'] = row[1]
        temp['description'] = row[2]
        temp['tag'] = row[3]
        temp['memlevel'] = row[4]
        courses_data.append(temp)
    resp = Response(response=json.dumps(courses_data),status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/getMembers',methods=['GET'])
def members():
    members_data=[]
    cursor = g.conn.execute('SELECT * from member;')
    for row in cursor:
        temp = {'level':'','times':'','ex_date':'','pid':'','name':'','gender':'','manid':'','dob':''}
        temp['level'] = row[0]
        temp['times'] = row[1]
        temp['ex_date'] = row[2].strftime('%Y-%m-%d')
        temp['pid'] = row[3]
        temp['name'] = row[4]
        temp['gender'] = row[5]
        temp['manid'] = row[6]
        temp['dob'] = row[7].strftime('%Y-%m-%d')
        members_data.append(temp)
    resp = Response(response=json.dumps(members_data),status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/getCoaches',methods=['GET'])
def coaches():
    coaches_data=[]
    cursor = g.conn.execute('SELECT * from coach;')
    for row in cursor:
        temp = {'coaid':'','ex_date':'','name':'','gender':'','manid':'','dob':''}
        temp['coaid'] = row[0]
        temp['ex_date'] = row[1].strftime('%Y-%m-%d')
        temp['name'] = row[2]
        temp['gender'] = row[3]
        temp['manid'] = row[4]
        temp['dob'] = row[5].strftime('%Y-%m-%d')
        coaches_data.append(temp)
    resp = Response(response=json.dumps(coaches_data),status=200, mimetype="application/json")
    return(resp)

