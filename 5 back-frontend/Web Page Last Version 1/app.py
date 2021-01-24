import flask
import pandas as pd
from joblib import dump, load
import sklearn

with open(f'model/FBRandomForest_model_vf.joblib', 'rb') as f:
    model = load(f)


app = flask.Flask(__name__, template_folder='templates')


@app.route('/', methods=['GET', 'POST'])
def main():
    if flask.request.method == 'GET':
        return (flask.render_template('index.html'))

    if flask.request.method == 'POST':
        avgpagelikes = flask.request.form['avgpagelikes']
        posttype = flask.request.form['posttype']
        postcategory = flask.request.form['postcategory']
        month = flask.request.form['month']
        weekday = flask.request.form['weekday']
        hour = flask.request.form['hour']
        paid = flask.request.form['paid']
        unique = flask.request.form['unique']

        input_variables = pd.DataFrame([[avgpagelikes, posttype, postcategory, month, weekday, hour, paid, unique]],
                                       columns=['avgpagelikes','posttype','postcategory', 'month', 'weekday', 'hour','paid', 'unique'],
                                       dtype='float',
                                       index=['input'])

        predictions = model.predict(input_variables)[0]
        print(predictions)

        return flask.render_template('index.html', original_input={'avgpagelikes': avgpagelikes, 'Type': posttype, 'Category': postcategory, 'Post Month': month, 'Post Weekday': weekday, 'Paid': paid, 'Unique Users': unique},
                                     result=predictions)


if __name__ == '__main__':
    app.run(debug=True)