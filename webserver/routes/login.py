from flask import render_template
from . import routes
from server import *

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
    User_ID = request.form['UserID']
    Password = request.form["PSW"]
    print "ID: " + User_ID + " Password: " + Password
    return redirect('/')