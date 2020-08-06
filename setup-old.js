/*
const Setup = {
    part0: ()=>{
        s.html("<h2>Setting Up</h2><p>Welcome to the Vantage tutor dashboard. We will be launching soon (open for student registration) so we need you to set up a profile to be added to the website!</p><p>Dashboard features have been locked as you have not yet been verified as a tutor. Complete your profile to be verified.</p> <br>")
        $('<button>').text('Profile Setup').appendTo(s).click(()=>{Setup.part1();})
    },
    part1: ()=>{
        s.html("<h2>Part 1 - Academic Info</h2><p>Please fill in the following academic information:</p><br> <div class='flex'> <p>School Name</p> <input id='school'> </div> <div class='flex'> <p>Grade (Going into September)</p> <input id='grade'> </div> <div class='flex'> <p>Program (Normal, Gifted, IB, TOPS, MACS, etc.)</p> <input id='program'> </div> <div> <p>What makes a good teacher / tutor? (Just a quick sentence on your opinion)</p> <textarea id='q-teacher'></textarea> </div>")
        $('<button>').text('Next').appendTo(s).click(()=>{
            data.academics = {
                school: $('#school').val(),
                grade: $('#grade').val(),
                q_teacher: $('#q-teacher').val(),
                program: $('#program').val(),
            }
            Setup.part2();
        })
    },
    part2: ()=>{
        s.html("<h2>Part 2 - Courses & Skills</h2><p>This section is to fill out your hobbies and skills and choose courses you want to teach. Based on tutor availibility, some courses may have too many tutors, hence we may contact you later regarding course assignments.</p><br> <div> <p>List your hobbies and extracurricular activities:</p> <textarea id='hobbies'></textarea> </div> <p>Select your top 3 course options that you would like to teach. Select blank as a placeholder. </p> <p>Option 1</p><select id='courseselect1'> </select> ");
        db.collection("courses")
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    $('<option>').text(doc.data().name).attr('value',doc.id).appendTo('#courseselect1');
                });}).then(function(){
                    $('<p>').text('Option 2').appendTo(s);
                    $('#courseselect1').clone().attr('id','courseselect2').appendTo(s);
                    $('<p>').text('Option 3').appendTo(s);
                    $('#courseselect1').clone().attr('id','courseselect3').appendTo(s);
                    $('<p>').html('<b>Important:</b> Please indicate your most recent marks for the choices above (if a main subject) or if non applicable, please include you reason along with any achievements, certificates, or experiences relating to the course. Please do not leave this section blank as it is the main factor in deciding your elegibility to teach selected courses. View <a href="vantagetutoring.github.io/terms">Terms and Service</a> for confidentiality and honesty statements.').appendTo(s);
                    $('<textarea>').attr('id','elegibility').appendTo(s);
                    $('<br><br>').appendTo(s);
                    $('<button>').text('Next').appendTo(s).click(()=>{
                        data.courses = {
                            q_hobby: $('#hobbies').val(),
                            course1: $('#courseselect1').val(),
                            course2: $('#courseselect2').val(),
                            course3: $('#courseselect3').val(),
                            elegibility_statement: $('#elegibility').val(),
                        };
                        Setup.part3();
                    })
                }).catch(function(error) {alert("There was a problem fetching courses. Please check your internet connection or it may be on us. Try again later. ", error);});
    },
    part3: ()=>{
        s.html(" <h2>Part 3 - Your Schedule</h2> <p>To find the best times and match students with teachers, we need to know your availability. Please fill out below.</p> <div class='flex'> <p>Sun</p><div></div><input id='sun-1' type='time'><p>to</p><input id='sun-2' type='time'> </div> <div class='flex'> <p>Mon</p><div></div><input id='mon-1' type='time'><p>to</p><input id='mon-2' type='time'> </div> <div class='flex'> <p>Tue</p><div></div><input id='tue-1' type='time'><p>to</p><input id='tue-2' type='time'> </div> <div class='flex'> <p>Wed</p><div></div><input id='wed-1' type='time'><p>to</p><input id='wed-2' type='time'> </div> <div class='flex'> <p>Thu</p><div></div><input id='thu-1' type='time'><p>to</p><input id='thu-2' type='time'> </div> <div class='flex'> <p>Fri</p><div></div><input id='fri-1' type='time'><p>to</p><input id='fri-2' type='time'> </div> <div class='flex'> <p>Sat</p><div></div><input id='sat-1' type='time'><p>to</p><input id='sat-2' type='time'> </div>");
        $('<p>').html('If you have a looser schedule or have full days free, please indicate (feel free to skip the inputs above and type out your schedule here):').appendTo(s);
        $('<textarea>').attr('id','written').appendTo(s);
        $('<br><br>').appendTo(s);
        $('<button>').text('Next').appendTo(s).click(()=>{
            data.schedule = {
                mon: [$('#mon-1').val(), $('#mon-2').val()],
                tue: [$('#tue-1').val(), $('#tue-2').val()],
                wed: [$('#wed-1').val(), $('#wed-2').val()],
                thu: [$('#thu-1').val(), $('#thu-2').val()],
                fri: [$('#fri-1').val(), $('#fri-2').val()],
                sat: [$('#sat-1').val(), $('#sat-2').val()],
                sun: [$('#sun-1').val(), $('#sun-2').val()],
                written: $('#written').val(),
            };
            Setup.part4();
        })
    },
    part4: ()=>{
        s.html(" <h2>Part 4 - Your Profile</h2> <p>Please write a short introduction of yourself, your hobbies, tutoring style, etc. This will be placed on the website! (Max 1000 characters) </p>");
        $('<span>').attr('id','wordcount').appendTo(s);
        $('<textarea>').attr({'id':'introduction','maxlength':'1000'}).css('height','300px').appendTo(s).keypress(()=>{
            var str = $('#introduction').val();
            $('#wordcount').text(str.length +' characters')
        });
        $('<br><br>').appendTo(s);
        $('<button>').text('Next').appendTo(s).click(()=>{
            data.profile = $('#introduction').val();
            console.log(data);
            Setup.part5();
        })
    },
    part5: ()=>{
        s.html(" <h2>Part 5 - Profile Photo</h2> <p>We need a photo! If you don't have one at this time, don't worry - you can always upload one later. However, you must submit a photo for fraud prevention and confirmation reasons as it will also be uploaded onto the Vantage website. </p>");
        $('<span>').text('Your photo must contain a center view of your face and upper body. Please submit a photo without sunglasses or masks. Casual photos and hats are fine. Tip: crop your photo into a square').appendTo(s);
        $('<br><br>').appendTo(s);
        $('<input type="file"id="avatar" name="avatar"accept="image/png, image/jpeg">').appendTo(s).change((e)=>{
            s.html('<p>⏱ One sec, uploading your beautiful photo....</p>');
            var file = e.target.files[0]; 
            var storageRef = firebase.storage().ref();
            var ref = storageRef.child('users/'+ firebase.auth().currentUser.uid +'.jpg');
            ref.put(file).then(function(snapshot) {
                Setup.part6();
                data.picuploaded = true;
              });
        });
        $('<span> </span>').appendTo(s);
        $('<button>').text('Later').appendTo(s).click(()=>{
            Setup.part6();
            data.picuploaded = false;
        })
    },
    part6: ()=>{
        s.html('<p>⏱ One sec, grinding out the backend code....</p>');
        var uid = firebase.auth().currentUser.uid;

        db.collection('users').doc(uid).update(
            {
                academics: data.academics,
                courses: data.courses,
                schedule: data.schedule,
                profile: data.profile,
                picuploaded: data.picuploaded,
                setup: true,
            }
        ).then(function() {
            location.reload();
        })
        .catch(function(error) {
            s.html('<h2>Something Went Wrong...</h2><p>This may be due to connection issues or it might be our fault, give us a moment as we are creating an archive of your doc and saving it in your browser so you don\'t lose your data.')
            console.error("Error updating document: ", error);
        });
        
    
    }
}
*/