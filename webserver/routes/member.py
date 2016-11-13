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

@routes.route('/member')
def member():
    return render_template("member.html")

@routes.route('/member/equipment',methods=['GET'])
def getequipment():
	result = []
	table_names = table_name_extracter('equipment')
	cursor = g.conn.execute('SELECT * from equipment;');
	for row in cursor:
		temp = {}
		for i in range(len(table_names)):            
			temp[table_names[i]]=row[i]
		result.append(temp)
	resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/courses',methods=['GET'])
def getmembercourse():
	result = []
	table_names = table_name_extracter('course')
	cursor = g.conn.execute('SELECT * from course;');
	for row in cursor:
		temp = {}
		for i in range(len(table_names)):            
			temp[table_names[i]]=row[i]
		result.append(temp)
	resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
	return(resp)
