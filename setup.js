var data = {
    profile: {},
    picture: '',
    picuploaded: false,
}




var s = $('#setup-card');


const Setup = {
    part0: ()=>{
        s.html("<h2>📦 Setting Up</h2><p>Welcome to the dashboard! We will be opening for student registration soon, so we need you to set up a profile that will appear on the website.</p> <br>")
        $('<button>').text('Profile Setup').appendTo(s).click(()=>{Setup.part1();})
    },
    part1:()=>{
        s.html(" <h2>👩‍💻 Your Profile</h2> <p>Please write a short introduction of yourself, your hobbies, tutoring style, etc. Also include your achievements and any experiences you had working as a tutor (if applicable). You can also take a look at <a href='https://vantagetutoring.github.io/tutors' target='_blank'> my bio for reference here </a>. (Max 1000 characters) </p>");
        $('<span>').attr('id','wordcount').appendTo(s);
        $('<textarea>').attr({'id':'introduction','maxlength':'1000'}).css('height','300px').appendTo(s).keypress(()=>{
            var str = $('#introduction').val();
            $('#wordcount').text(str.length +' characters')
        });
        $('<br><br>').appendTo(s);
        $('<button>').text('Next').appendTo(s).click(()=>{
            data.profile = $('#introduction').val();
            Setup.part2(s);
        })
    },
    part2: (con)=>{
        con.html(" <h2>📷 Tutor Photo</h2> <p>We need a photo for confirmation reasons as it is part of your profile. You can choose a photo later, but you won't be verified until you upload one. </p>");
        $('<span>').text('Your photo must contain your face and upper body, without sunglasses or masks. It could be any casual photo!').appendTo(con);
        $('<br><br>').appendTo(con);
        $('<input type="file"id="avatar" name="avatar"accept="image/png, image/jpeg">').appendTo(con).change((e)=>{
            con.html('<p>⏱ One sec, uploading your beautiful photo....</p>');
            var file = e.target.files[0]; 
            var storageRef = firebase.storage().ref();
            var ref = storageRef.child('users/'+ firebase.auth().currentUser.uid +'.jpg');
            ref.put(file).then(function(snapshot) {
                console.log('recieved photo')
                data.picuploaded = true;
              }).then(()=>{
                ref.getDownloadURL().then(function(url) {
                    console.log('recieved url: ' + url)
                    data.picture = url;
                    Setup.part3();
                });
              })
        });

        $('<span> </span>').appendTo(con);

        var setup;

        db.collection('users').doc(firebase.auth().currentUser.uid).get().then(shot=>{
            setup = shot.data().setup;
        })
        
        if (!setup){
            $('<button>').text('Later').appendTo(con).click(()=>{
                Setup.part3();
                data.picuploaded = false;
            })
        }
        
    },

    part3: ()=>{
        s.html('<p>⏱ One sec, grinding out the backend code....</p>');
        var uid = firebase.auth().currentUser.uid;
    
        db.collection('users').doc(uid).update(
            {
                picture: data.picture,
                profile: data.profile,
                setup: true,
            }
        ).then(function() {
            location.reload();
        })
        .catch(function(error) {
            s.html('<h2>Something Went Wrong...</h2><p>This may be due to connection issues or it might be our fault, give us a moment as we are creating an archive of your doc and saving it in your browser so you don\'t lose your data.')
            console.error("Error updating document: ", error);
        });
    }}



function setupDone(){
    s.html(" <h2>👏  You're Done!</h2> <p>We're soooo hyped to have you on our team! We'll verify your profile ASAP and it will be displayed on the website. Upon verification, we will also assign your subjects (depending on what you chose in the google form).</p><p> <ul><li>Don't forget to upload your picture if you haven't</li><li><a href='https://vantagetutoring.github.io/tutor/dashboard'>Take a look here</a> at how the dashboard works and how to accept lesson requests.</li><li>Most features will be available when we launch and initiate enrollment on August 10th.</li><li>We'll DM or email you any updates or questions we have about your profile. In the meantime, sit back and relax! </li></ul></p><br>");
            $('<button>').text('Okie').appendTo(s).click(()=>{
                $('#setup-card').remove();
            })
}


function profileSetup(){
    s.html('<h2>☕️ Grab a Coffee</h2><p>This setup is to be completed in one sitting. Refreshing or leaving the page may result in a loss of data. </p><button onclick="Setup.part1()">Continue</button>')
}