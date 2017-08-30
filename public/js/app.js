console.log('Do some app');

$(document).ready( function($) {
    var socket = io.connect();
    var gameForm = $('#newGame');
    var name = $('#name');
    var group = $('#groupName');
    var joinForm = $('#joinGame');
    var joinShow = $('#joinShow');
    var nameJ = $('#nameJ');
    var groupJ = $('#groupJ');
    joinForm.hide();

    gameForm.submit(function(e) {
        e.preventDefault();
        socket.emit('newGame', {hostName:name.val(), members: [name.val()], group: group.val() })
    });
    joinShow.on('click',function(e) {
        joinForm.show();
    })
    joinForm.submit(function(e){
        e.preventDefault();
        socket.emit('joinReq', {reqName: nameJ.val(), group: groupJ.val() })
    })

})
