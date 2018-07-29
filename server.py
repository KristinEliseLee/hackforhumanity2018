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

    
    def quest0():
        answer = request.args.get('status')
        session['status'] = answer
        if answer != 'no':
            return '1'
        return '2'

    def quest1():
        answer = request.args.get('a-num')
        session['a-num'] = answer
        return '2'

    def quest2():
        doc = request.args.getlist('doc')
        session['doc'] = doc
        return '3'

    def quest3():
        kids = request.args.get('kids')
        session['kids'] = kids
        if kids == 'yes':
            return '4'
        return '5'

    def quest4():
        kidscit = request.args.get('kidscit')
        session['kidscit'] = kidscit
        if kidscit == 'yes':
            return '6'
        return '5'

    def quest5():
        return '12'

    quest_num_dict = {
    '0': quest0,
    '1': quest1,
    '2': quest2,
    '3': quest3,
    '4': quest4,
    '5': quest5,
    }

    return quest_num_dict[questnum]()

    # if questnum == '0':
    #     answer = request.args.get('status')
    #     session['status'] = answer
    #     if answer != 'no':
    #         return '1'
    #     return '2'

    # elif questnum =='1':
    #     answer = request.args.get('a-num')
    #     session['a-num'] = answer
    #     return '2'

    # elif questnum == '2':
    #     doc = request.args.getlist('doc')
    #     session['doc'] = doc
    #     return '3'

    # elif questnum == "3":
    #     kids = request.args.getlist('kids')
    #     session['kids'] = kids
    #     if kids == 'yes':
    #         return '4'
    #     return '5'

    # elif questnum == "4":
    #     kids_cit = request.args.getlist('kids-cit')
    #     session['kids-cit'] = kids_cit
    #     if kids_cit == 'yes':
    #         return '6'
    #     return '5'

    # elif questnum == '5':
    #     pass


    # return 0


@app.route('/results')
def show_results():
   return render_template('results.html')


if __name__ == '__main__':

    app.debug = True

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(host="0.0.0.0")