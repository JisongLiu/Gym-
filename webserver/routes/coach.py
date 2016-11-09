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
    
