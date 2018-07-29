
const questions = [
`<h4>Which immigration document do you currently have?</h4>
<input type='radio' name='status' value='a green card' required>Green card
<p id="gc.jpg" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='a visa'>Visa
<p id="visa.png" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='a work permit'>Work permit
<p id="workpermit.png" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='no current immigration status'>None of the above
<input type='hidden' name='questnum' value='0'>
<br>
<br>
<input type='submit' value='Next'>`
,
`<h4> Do you know your A-Number </h4>
<p id="anum.png" class="showpic">What does this look like?</p>
<input type='radio' name='a-num' value='yes' required>Yes
<br>
<input type='radio' name='a-num' value='no' required>No
<br>
<br>
<input type='hidden' name='questnum' value='1'>
<input type='submit'value='Next'>`
,
`<h4> Which documents do you currently have for yourself?</h4>
<input type='checkbox' name='doc' value='passport'>Passport of your home country
<br>
<input type='checkbox' name='doc' value='birth certificate'>Birth Certificate
<br>
<input type='checkbox' name='doc' value='marriage license'>Marriage License
<br>
<input type='checkbox' name='doc' value="driver's license">Driver's License or I.D. card
<br>
<input type='checkbox' name='doc' value='social security card or ITIN number'>Social Security Card or ITIN number
<br>
<br>
<input type='hidden' name='questnum' value='2'>
<input type='submit'value='Next'>`
,

`<h4> Do you have any children under age 18?</h4>
<input type='radio' name='kid' value='yes' required>Yes
<br>
<input type='radio' name='kid' value='no' required>No
<input type='hidden' name='questnum' value='3'>
<br>
<br>
<input type='submit'value='Next'>`
,

`<h4> Is your child/children a U.S. citizen?</h4>
<input type='radio' name='kidcit' value='yes' required>Yes
<br>
<input type='radio' name='kidcit' value='no' required>No
<input type='hidden' name='questnum' value='4'>
<br>
<br>
<input type='submit'value='Next'>`

,
`<h4> Do you have these documents for your children?</h4>
<input type='checkbox' name='kiddoc' value='U.S. Passport'>U.S. Passport
<br>
<input type='checkbox' name='kiddoc' value='U.S. Birth Certificate'>U.S. Birth Certificate
<br>
<input type='checkbox' name='kiddoc' value='U.S. Registry of Birth'>U.S. Registry of Birth
<input type='hidden' name='questnum' value='5'>
<br>
<br>
<input type='submit'value='Next'>`
,
,
`<h4>Is there an adult who can care for your child if you cannot?</h4>
<input type='radio' name='kidcare' value='yes' required>Yes
<br>
<input type='radio' name='kidcare' value='no' required>No
<input type='hidden' name='questnum' value='7'>
<br>
<br>
<input type='submit'value='Next'>`

];

function showPic(evt){
    let targetID = evt.currentTarget.id;
    $("#pic").html(`<img src='static/pictures/${targetID}'>`);
}

function loadQuestion(num){
    if (num >= questions.length){
        window.location.replace("/results");
    }
    $('#pic').html("");
    if (num < 2){
        $('#picside').removeClass('noshow');
        $('#quizbox').removeClass('col-9');
        $('#quizbox').addClass('col-5');
    }

    else{
        $('#picside').addClass('noshow')
        $('#quizbox').addClass('col-9')
        $('#quizbox').removeClass('col-5')
    }

    $('#form').html(questions[num]);
    $(".showpic").on('click',showPic);
}
function getNextQuestion(evt){
    evt.preventDefault();
    let formValues = $('#form').serialize();
    console.log(formValues);
    $.get('/setanswer', formValues, loadQuestion);
}

loadQuestion(0);

$("#form").on('submit', getNextQuestion);
