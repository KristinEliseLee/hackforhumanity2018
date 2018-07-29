
const questions = [
{'html':`<h4>Which document do you currently have?</h4>
<input type='radio' name='status' value='gc'>Green card
<p id="gc.jpg" class="showpic">what does this look like?</p>
<input type='radio' name='status' value='v'>Visa
<input type='radio' name='status' value='wp'>Work permit
<input type='radio' name='status' value='no'>None of the above
<input type='hidden' name='questnum' value='0'>
<input type='submit'>`}
,
{'html':`<h4> Do you know your A-Number </h4>
<input type='radio' name='a-num' value='yes'>yes
<input type='radio' name='a-num' value='no'>no
<input type='hidden' name='questnum' value='1'>
<input type='submit'>`}
,
{'html':`<h4> Which documents do you currently have for yourself?</h4>
<input type='checkbox' name='doc' value='pass'>Passport of your home country
<input type='checkbox' name='doc' value='bc'>Birth Certificate
<input type='checkbox' name='doc' value='ml'>Marriage License
<input type='checkbox' name='doc' value='dl'>Driver's License or I.D. card
<input type='checkbox' name='doc' value='ssc'>Social Security Card or ITIN number
<input type='hidden' name='questnum' value='2'>
<input type='submit'>`}

]

function showPic(evt){
    let target = evt.currentTarget
    let targetID = target.id
    $("#pic").html(`<img src='static/pictures/${targetID}'>`)
}

function loadQuestion(num){
    if (num >= questions.length){

        window.location.replace("/results")
        
    }
    $('#pic').html("")
    $('#form').html(questions[num]['html'])
    $(".showpic").on('click',showPic)
}
function getNextQuestion(evt){
    evt.preventDefault();
    let formValues = $('#form').serialize();
    console.log(formValues)
    $.get('/setanswer', formValues, loadQuestion)

}

loadQuestion(0);

$("#form").on('submit', getNextQuestion);