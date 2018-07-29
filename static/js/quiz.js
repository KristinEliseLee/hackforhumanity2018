
const questions = [
`<h4>Which document do you currently have?</h4>
<input type='radio' name='status' value='gc' required>Green card
<p id="gc.jpg" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='v'>Visa
<p id="visa.jpg" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='wp'>Work permit
<p id="workpermit.jpg" class="showpic">What does this look like?</p>
<input type='radio' name='status' value='no'>None of the above
<input type='hidden' name='questnum' value='0'>
<input type='submit'>`
,
`<h4> Do you know your A-Number </h4>
<p id="Anum.jpg" class="showpic">What does this look like?</p>
<input type='radio' name='a-num' value='yes' required>yes
<input type='radio' name='a-num' value='no' required>no
<br>
<input type='hidden' name='questnum' value='1'>
<input type='submit'>`
,
`<h4> Which documents do you currently have for yourself?</h4>
<input type='checkbox' name='doc' value='pass'>Passport of your home country
<br>
<input type='checkbox' name='doc' value='bc'>Birth Certificate
<br>
<input type='checkbox' name='doc' value='ml'>Marriage License
<br>
<input type='checkbox' name='doc' value='dl'>Driver's License or I.D. card
<br>
<input type='checkbox' name='doc' value='ssc'>Social Security Card or ITIN number
<br>
<input type='hidden' name='questnum' value='2'>
<input type='submit'>`
,

`<h4> Do you have any children under age 18?</h4>
<input type='radio' name='kid' value='yes' required>yes
<input type='radio' name='kid' value='no' required>no
<input type='hidden' name='questnum' value='3'>
<input type='submit'>`
,

`<h4> Is your child/children a U.S. citizen?</h4>
<input type='radio' name='kidcit' value='yes' required>yes
<input type='radio' name='kidcit' value='no' required>no
<input type='hidden' name='questnum' value='4'>
<input type='submit'>`

,
`<h4> Do you have these documents for your children?</h4>
<input type='checkbox' name='kiddoc' value='pass'>U.S. Passport
<br>
<input type='checkbox' name='kiddoc' value='bc'>U.S. Birth Certificate
<input type='hidden' name='questnum' value='5'>
<input type='submit'>`
,
`<h4> Do you have a copy of registry of their birth?</h4>
<input type='radio' name='kidreg' value='yes' required>yes
<input type='radio' name='kidreg' value='no' required>no
<input type='hidden' name='questnum' value='6'>
<input type='submit'>`
,
`<h4>Is there an adult who can care for your child if you cannot?</h4>
<input type='radio' name='kidcare' value='yes' required>yes
<input type='radio' name='kidcare' value='no' required>no
<input type='hidden' name='questnum' value='7'>
<input type='submit'>`

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
