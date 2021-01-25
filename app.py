from flask import Flask, redirect, url_for, request, render_template, jsonify
import pandas as pd
from joblib import dump, load
import sklearn
import json

with open(f'model/FBRandomForest_model_vf.joblib', 'rb') as f:
    model = load(f)


app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')    

@app.route('/postmeter', methods=['POST'])
def modelP():

    avgpagelikes = request.json['avgpagelikes']
    posttype = request.json['posttype']
    postcategory = request.json['postcategory']
    month = request.json['month']
    weekday = request.json['weekday']
    hour = request.json['hour']
    paid = request.json['paid']
    unique = request.json['unique']

    input_variables = pd.DataFrame([[avgpagelikes, posttype, postcategory, month, weekday, hour, paid, unique]],
                                    columns=['avgpagelikes','posttype','postcategory', 'month', 'weekday', 'hour','paid', 'unique'],
                                    dtype='float',
                                    index=['input'])

    predictions = model.predict(input_variables)[0]
    #if predictions == 0:
    #    result = 'unsuccessful'
    #else:
    #    result = 'successful'
    #print(predictions)

    return jsonify(result = int(predictions))

    

if __name__ == '__main__':
    app.run(debug=True)