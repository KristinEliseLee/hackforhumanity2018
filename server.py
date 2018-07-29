from flask import Flask, render_template, flash, redirect, request, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.secret_key = 'totallysecret123'


@app.route('/')
def homepage():
    return redirect('/quiz')


@app.route('/quiz')
def start_quiz():
    """"""

    return render_template('newpage.html')


@app.route("/setanswer")
def set_answer():
    questnum = request.args.get("questnum")

    
    def quest0():
        """Immigration status: gc = greencard, v = visa, wp = work permit, no = none
        """
        answer = request.args.get('status')
        session['status'] = answer
        if answer != 'no':
            return '1'
        return '2'

    def quest1():
        """Do they know their A-number, y/n"""
        answer = request.args.get('a-num')
        session['a-num'] = answer
        return '2'

    def quest2():
        """What documents do they have? pass = passport, bc = birth certificate
        ml  = marriage license, dl = driver's licence, ssc = social security or ITIN number
        """
        doc = request.args.getlist('doc')
        session['doc'] = doc
        return '3'

    def quest3():
        """Any kids under age 18? y/n"""
        kid = request.args.get('kid')
        session['kid'] = kid
        if kid == 'yes':
            return '4'
        return '12'

    def quest4():
        """Are they all US citizens y/n """
        kidcit = request.args.get('kidcit')
        session['kidcit'] = kidcit
        if kidcit == 'yes':
            return '5'
        return '7'

    def quest5():
        """what documents do they have for kids if they are US citizens?
        pass=passport, bc=US birth certificate

        """
        kiddoc = request.args.getlist('kiddoc')
        session['kiddoc'] = kiddoc
        return '7'

    def quest6():
        """if kid isn't a US citizen, do they have the registry of their birth
        y/n
        """
        kidreg = request.args.get('kidreg')
        session['kidreg'] = kidreg
        return '7'

    def quest7():
        """An adult to care for kids, y/n"""
        kidcare = request.args.get('kidcare')
        session['kidcare'] = kidcare
        return '8'

    quest_num_dict = {
    '0': quest0,
    '1': quest1,
    '2': quest2,
    '3': quest3,
    '4': quest4,
    '5': quest5,
    '6': quest6,
    '7': quest7,
    }

    return quest_num_dict[questnum]()


@app.route('/results')
def show_results():



   return render_template('results.html')


if __name__ == '__main__':

    app.debug = True

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(host="0.0.0.0")