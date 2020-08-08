function tab(div){
    $('.page').hide();
    $(div).show();
}



function createNotifyCard(page, title, html){
    var con = $('<div>').addClass('card').prependTo(page);
    $('<h2>').text(title).appendTo(con);
    $('<p>').html(html).appendTo(con);
    $('<button>').text('Close').appendTo(con).click(()=>{con.remove()});
}


var photoexists;


const Profile = {
    render: () => {
        var uid = firebase.auth().currentUser.uid;
        db.collection('users').doc(uid).get().then((doc)=>{
            var data = doc.data();
            if (!data.verified){
                $('#status').text('Unverified ●').css('color','red');
            } else {
                $('#status').text('Verified ●').css('color','green');
            }
            $('#grade').text(data.grade);
            $('#school').text(data.school);
            $('#bio').text(data.profile);
            if (data.picture != undefined){
                $('#picurl').attr('src', data.picture)
            }
        });
    },
    edit: () => {
        newphoto = null;
        photoexists = false;
        $('.profile-display').hide();
        $('.profile-edit').show();
        
        $('#val-photo').change(e=>{
            newphoto = e.target.files[0];
            photoexists = true;
            $('#photo-preview').attr('src', URL.createObjectURL(e.target.files[0]));
        })
        var uid = firebase.auth().currentUser.uid;
        db.collection('users').doc(uid).get().then((doc)=>{
            var data = doc.data();
            $('#val-grade').val(data.grade);
            $('#val-school').val(data.school);
            $('#val-bio').val(data.profile);
            if (data.picture != undefined){
                $('#photo-preview').attr('src', data.picture);
                photoexists = true;
            }
        });
    },
    save: () => {
        var uid = firebase.auth().currentUser.uid;
        if (newphoto != null){
            var storageRef = firebase.storage().ref();
            var ref = storageRef.child('users/'+ uid +'.jpg');
            ref.put(newphoto).then(function(snapshot) {
              }).then(()=>{
                ref.getDownloadURL().then(function(url) {
                    Profile.save2(url);
                });
              })
        } else {
            db.collection('users').doc(uid).get().then((doc)=>{
                var data = doc.data();
                if ((data.picture != undefined) && (data.picture != '') && (data.picture != null)){
                    Profile.save2(data.picture);
                } else {
                    Profile.save2('https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400.png');
                    photoexists = false;
                }
            });
        };

    },
    save2: (picture) => {
        var uid = firebase.auth().currentUser.uid;
        db.collection('users').doc(uid).update({
            grade: $('#val-grade').val(),
            school: $('#val-school').val(),
            profile: $('#val-bio').val(),
            picture: picture,
        }).then(()=>{
            if (($('#val-grade').val()!= '')&&($('#val-school').val()!= '')&&($('#val-bio').val()!= '')&&photoexists) {
                alert('Upload successful. Your profile will be reviewed ASAP.');
            } else {
                alert('Upload successful. However, your profile will not be reviewed as there are missing fields.');
            }
            
            Profile.render();
            $('.profile-display').show();
            $('.profile-edit').hide();
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}