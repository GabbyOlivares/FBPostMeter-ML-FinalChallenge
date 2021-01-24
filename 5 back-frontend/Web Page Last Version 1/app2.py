from flask import Flask, jsonify
from sklearn.externals import joblib
import pandas as pd
app = Flask(__name__)
@app.route('/predict')
def predict(request):
    if request.method == 'POST':
      user = request.form['nm']
      return redirect(url_for('success',name = user))
      json_ = request.json
      query_df = pd.DataFrame(json_)
      query = pd.get_dummies(query_df)
      prediction = clf.predict(query)
      return jsonify({'prediction': list(prediction)})


    else:
      user = request.args.get('nm')
      return redirect(url_for('success',name = user))

if __name__ == '__main__':
     clf = joblib.load('./FBRandomForest_model.sav')
     app.run(debug=True)