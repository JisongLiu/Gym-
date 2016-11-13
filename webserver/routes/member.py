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

@routes.route('/member/myborrow',methods=['POST'])
def getborrow():
	result = []
	data = request.get_json()
	cursor = g.conn.execute('SELECT brand, catagory, time, date, borrow.eid from borrow inner join equipment on equipment.eid = borrow.eid where pid = %s', data['pid']);
	for row in cursor:
		temp = {'brand':'','catagory':'','time':'','date':''}
		temp['brand']=row[0]
		temp['catagory'] = row[1]
		temp['time'] = row[2].strftime('%H:%M:%S')
		temp['date'] = row[3].strftime('%Y-%m-%d')
		temp['eid'] = row[4]
		result.append(temp)
	resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/courses',methods=['GET'])
def getallcourse():
	result = []
	table_names = table_name_extracter('course')
	cursor = g.conn.execute('SELECT * from course order by memlevel ASC;');
	for row in cursor:
		temp = {}
		for i in range(len(table_names)):	
			temp[table_names[i]]=row[i]
		result.append(temp)
	resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/mycourse',methods=['POST'])
def getmycourse():
	result = []
	data = request.get_json()
	table_names = table_name_extracter('course')
	table_names.remove('memlevel')
	table_names.append('ex_date')
	cursor = g.conn.execute('SELECT study.cid, name, description, tag, ex_date from study inner join course on (study.cid = course.cid) where pid = %s;', data['pid']);
	for row in cursor:
		temp = {}
		for i in range(len(table_names)):	
			if table_names[i] == "ex_date":
				temp[table_names[i]] = row[i].strftime("%Y-%m-%d")
			else:
				temp[table_names[i]]=row[i]
		result.append(temp)
	resp = Response(response=json.dumps(result),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/gettrain',methods=['POST'])
def gettrain():
	data = request.get_json()
	trainning_data = []
	cursor = g.conn.execute('select time, date, coach.coaid, name from train inner join coach on (train.coaid = coach.coaid) where pid = %s;', data['pid'])
	for row in cursor:
		temp = {'time':'','date':'','coaid':'','Coach':''}
		temp['time'] = row[0].strftime('%H:%M:%S')
		temp['date'] = row[1].strftime('%Y-%m-%d')
		temp['coaid'] = row[2]
		temp['Coach'] = row[3]
		trainning_data.append(temp)
	resp = Response(response=json.dumps(trainning_data),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/getcoach',methods=['POST'])
def getcoach():
	data = request.get_json()
	trainning_data = []
	cursor = g.conn.execute('select time, date, pid, coach.name from train inner join coach on (train.coaid = coach.coaid) where pid = %s;', data['pid'])
	for row in cursor:
		temp = {'time':'','date':'','pid':'','Coach':''}
		temp['time'] = row[0].strftime('%H:%M:%S')
		temp['date'] = row[1].strftime('%Y-%m-%d')
		temp['pid'] = row[2]
		temp['Coach'] = row[3]
	trainning_data.append(temp)
	resp = Response(response=json.dumps(trainning_data),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/studymat',methods=['POST'])
def studymat():
	study_data = [{"course":[]}]
	data = request.get_json()
	cursor = g.conn.execute('select cid, course.name from course inner join member on (course.memlevel <= member.level) where member.pid = %s;', data['pid'])
	for row in cursor:
		study_data[0]['course'].append(row[0]+":"+row[1])
	resp = Response(response=json.dumps(study_data),status=200, mimetype="application/json")
	return(resp)


@routes.route('/member/trainmat',methods=['GET'])
def trainmat():
	study_data = [{"coach":[]},{"timeslot":[]}]
	cursor = g.conn.execute('select coaid, name from coach;')
	for row in cursor:
		study_data[0]['coach'].append(row[0]+":"+row[1])
	for i in range(9,19):
		study_data[1]['timeslot'].append(str(i)+":00:00")
	resp = Response(response=json.dumps(study_data),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/equipmat',methods=['GET'])
def equipmat():
	equip_data = [{"equipment":[]},{"timeslot":[]}]
	cursor = g.conn.execute('select eid, catagory from equipment;')
	for row in cursor:
		equip_data[0]['equipment'].append(row[0]+":"+row[1])
	for i in range(9,22):
		equip_data[1]['timeslot'].append(str(i)+":00:00")
	resp = Response(response=json.dumps(equip_data),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/borrow',methods=['POST'])
def borrowequip():
	data = request.get_json()
	try:
		cursor = g.conn.execute('insert into borrow values(%s,%s,%s,%s);',data['time'],data['date'],data['eid'],data['pid'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/borrow',methods=['DELETE'])
def delequip():
	data = request.get_json()
	try:
		cursor = g.conn.execute('delete from borrow where eid = %s and time = %s and date = %s',data['eid'],data['time'],data['date'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/addtrain',methods=['POST'])
def addtrain():
	data = request.get_json()
	try:
		cursor = g.conn.execute('insert into train values(%s,%s,%s,%s);',data['time'],data['date'],data['coaid'],data['pid'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/addtrain',methods=['DELETE'])
def deletetrain():
	data = request.get_json()
	try:
		cursor = g.conn.execute('delete from train where coaid = %s and pid = %s',data['coaid'],data['pid'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/addstudy',methods=['POST'])
def addstudy():
	data = request.get_json()
	try:
		cursor = g.conn.execute('insert into study values(%s,%s,%s);',data['cid'],data['pid'],data['ex_date'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

@routes.route('/member/addstudy',methods=['DELETE'])
def deletestudy():
	data = request.get_json()
	try:
		cursor = g.conn.execute('delete from study where pid = %s and cid = %s',data['pid'],data['cid'])
		resp = Response(response=json.dumps({"result":"Success"}),status=200, mimetype="application/json")
	except Exception:
		resp = Response(response=json.dumps({"result":"Failed"}),status=200, mimetype="application/json")
	return(resp)

