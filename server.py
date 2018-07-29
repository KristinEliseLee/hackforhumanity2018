from flask import Flask, render_template, flash, redirect, request, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.secret_key = 'totallysecret123'


@app.route('/')
def homepage():
    return render_template('newpage.html')


@app.route('/quiz')
def start_quiz():
    """"""

    return render_template('quiz.html')


@app.route("/setanswer")
def set_answer():
    questnum = request.args.get("questnum")
    if questnum == '0':
        answer = request.args.get('status')
        session['status'] = answer
        if answer != 'no':
            return '1'
        return '2'

    elif questnum =='1':
        answer = request.args.get('a-num')
        session['a-num'] = answer
        return '2'

    elif questnum == '2':
        doc = request.args.getlist('doc')
        session['doc'] = doc
        return '3'
    return 0


@app.route('/results')
def show_results():
   return render_template('results.html')


if __name__ == '__main__':

    app.debug = True

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(host="0.0.0.0")