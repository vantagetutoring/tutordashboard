


/*
function renderChat() {
    var uid = firebase.auth().currentUser.uid;
    var piclink;
    db.collection('users').doc(uid).get().then(doc=>{
        if (doc.data().picture != undefined){
            piclink = doc.data().picture
        } else {
            piclink = doc.data().general.photo
        }
        
    });
    db.collection("users/"+uid+"/chat")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                if (change.doc.data().user == uid){
                    var msg = $('<div>').addClass('user-message').prependTo('#message-con');
                    var ts = change.doc.data().time;
                    var date = ts.toDate().toDateString();
                    var today = new Date().toDateString();
                    if (date==today){
                        $('<time>').appendTo(msg).text(ts.toDate().toLocaleTimeString([], {timeStyle: 'short'}));
                    } else {
                        $('<time>').appendTo(msg).text(ts.toDate().toLocaleString('en-En',{month: "short", day: "numeric"}));
                    }
                    $('<p>').appendTo(msg).text(change.doc.data().val);
                    $('<img>').appendTo(msg).attr('src', piclink);
                }

                $('#message-con').scrollTop($('#message-con')[0].scrollHeight);
 
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });
}

var work = true;

$('#message-input').keypress(e=>{
        if(e.which == 13) {
            if (work){
                work = false;
                e.preventDefault();
                var msg = $('#message-input').text();
                $('#message-input').html('');
                var uid = firebase.auth().currentUser.uid;
                if (msg != '' && msg.length < 500){
                    db.collection('users').doc(uid).collection('chat').doc().set({
                        user: uid,
                        time: new Date(),
                        val: msg
                    }).then(()=>{
                        setTimeout(function(){
                            work = true;
                        }, 600);
                    })
                } else (alert('There\'s nothing or too many words!'))
            } else {
                alert('😨 Please slow down!');
                $('#message-input').html('');
            }
        }
})*/