import sqlalchemy
import sqlite3
import numpy as np
import datetime as dt
import pandas as pd

from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

####

app = Flask(__name__)

#def get_db_connection():
#    conn = sqlite3.connect('US_Elections_Statistics.sqlite')
#    conn.row_factory = sqlite3.Row
#    return conn

#def get_db_connectionTot():
#    conn = sqlite3.connect('US_Elections_StatisticsTot.sqlite')
#    conn.row_factory = sqlite3.Row
#    return conn

@app.route('/')
def index():
#    conn = get_db_connection()
#    posts = conn.execute('SELECT * FROM US_Elections').fetchall()
#    conn.close()
    #return render_template('index.html', posts=posts)
    return render_template('index.html')


##Endpoints


if __name__ == '__main__':
    app.run(debug=True)    


