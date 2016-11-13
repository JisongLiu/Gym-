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
@routes.route('/manager/search/<keyword>',methods=['GET'])
def search(keyword):
    search_data=[]
    cursor = g.conn.execute('SELECT * from equipment where eid=%s;',keyword)
    for row in cursor:
        temp = {'eid':'','brand':'','status':'','category':''}
        temp['eid'] = row[0]
        temp['brand'] = row[1]
        temp['status'] = row[2]
        temp['category'] = row[3]
        search_data.append(temp)
    cursor = g.conn.execute('SELECT * from course where cid=%s;', keyword)
    for row in cursor:
        temp = {'cid':'','name':'','description':'','tag':'','memlevel':''}
        temp['cid'] = row[0]
        temp['name'] = row[1]
        temp['description'] = row[2]
        temp['tag'] = row[3]
        temp['memlevel'] = row[4]
        search_data.append(temp)
    cursor = g.conn.execute('SELECT * from coach where coaid=%s;', keyword)
    for row in cursor:
        temp = {'coaid':'','ex_date':'','name':'','gender':'','manid':'','dob':''}
        temp['coaid'] = row[0]
        temp['ex_date'] = row[1].strftime('%Y-%m-%d')
        temp['name'] = row[2]
        temp['gender'] = row[3]
        temp['manid'] = row[4]
        temp['dob'] = row[5].strftime('%Y-%m-%d')
        search_data.append(temp)
    cursor = g.conn.execute('SELECT * from member where pid=%s;', keyword)
    for row in cursor:
        temp = {'level': '', 'times': '', 'ex_date': '', 'pid': '','name': '','gender': '','manid': '','dob':''}
        temp['level'] = row[0]
        temp['times'] = row[1]
        temp['ex_date'] = row[2]
        temp['pid'] = row[3]
        temp['name'] = row[4]
        temp['gender'] = row[5]
        temp['manid'] = row[6]
        temp['dob'] = row[7]
        search_data.append(temp)
    resp = Response(response=json.dumps(search_data),status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/delete/<keyword>',methods=['GET'])
def delete(keyword):
    resp = search(keyword)
    g.conn.execute('DELETE from equipment where eid=%s;', keyword)
    g.conn.execute('DELETE from course where cid=%s;', keyword)
    g.conn.execute('DELETE from member where pid=%s;', keyword)
    g.conn.execute('DELETE from coach where coaid=%s;', keyword)
    return(resp)
@routes.route('/manager/insmat1',methods=['GET'])
def getManager():
    cursor = g.conn.execute('SELECT manid,name from manager;')
    data1 = []
    for row in cursor:
        data1.append(row[0]+':'+row[1])
    data1 = {'manid':data1}
    resp = Response(response=json.dumps([data1]),status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/addinstruction',methods=['POST'])
def createcoach():
    data = request.get_json()
    print("this part has been executed")
    try:
        g.conn.execute('INSERT INTO coach VALUES(%s,%s,%s,%s,%s,%s)', data['coaid'], data['ex_date'],data['name'], data['gender'], data['manid'],data['dob'])
        resp = Response(response=json.dumps([{'result': 'Success'}]), status=200, mimetype="application/json")
    except Exception:
        resp = Response(response=json.dumps([]), status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/addinstruction2',methods=['POST'])
def createmember():
    data = request.get_json()
    print("this part has been executed")
    try:
        g.conn.execute('INSERT INTO member VALUES(%s,%s,%s,%s,%s,%s,%s,%s)', data['level'], data['times'],data['ex_date'], data['pid'], data['name'],data['gender'],data['manid'],data['dob'])
        resp = Response(response=json.dumps([{'result': 'Success'}]), status=200, mimetype="application/json")
    except Exception:
        resp = Response(response=json.dumps([]), status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/addinstruction3',methods=['POST'])
def createequipment():
    data = request.get_json()
    print("this part has been executed")
    try:
        g.conn.execute('INSERT INTO equipment VALUES(%s,%s,%s,%s)', data['eid'], data['brand'],data['status'], data['category'])
        resp = Response(response=json.dumps([{'result': 'Success'}]), status=200, mimetype="application/json")
    except Exception:
        resp = Response(response=json.dumps([]), status=200, mimetype="application/json")
    return(resp)
@routes.route('/manager/addinstruction4',methods=['POST'])
def createcourse():
    data = request.get_json()
    print("this part has been executed")
    try:
        g.conn.execute('INSERT INTO equipment VALUES(%s,%s,%s,%s,%s)', data['cid'], data['name'],data['description'], data['tag'],data['memlevel'])
        resp = Response(response=json.dumps([{'result': 'Success'}]), status=200, mimetype="application/json")
    except Exception:
        resp = Response(response=json.dumps([]), status=200, mimetype="application/json")
    return(resp)
# @routes.route('/manager/searchequipments<equipment><keyword>',methods=['GET'])
# def equipements(equipment,keyword):
#     equipements_data=[]
#     cursor = g.conn.execute('SELECT * from %s where eid=%s;' %equipment %keyword)
#     for row in cursor:
#         temp = {'eid':'','brand':'','status':'','category':''}
#         temp['eid'] = row[0]
#         temp['brand'] = row[1]
#         temp['status'] = row[2]
#         temp['category'] = row[3]
#         equipements_data.append(temp)
#     resp = Response(response=json.dumps(equipements_data),status=200, mimetype="application/json")
#     return(resp)
