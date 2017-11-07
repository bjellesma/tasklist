/*
* File to get environmental data from the server
*/
var apiip, apiport;
function envCall(){
  $.ajax({
     url: '/env',
     async: false,
     type: "get",
     success: function(data){
       apiip = data.apiip;
       apiport = data.apiport;
       user = data.user;
       mode = data.mode;
       socketClient = data.socketClient;
       chatport = data.chatport;
       //return apiip.apiip;
     }
  });
}
module.exports = {
  getEnvVariables: function () {
    envCall();
    var vars = {
      SOCKET: socketClient,
      APIIP: apiip,
      APIPORT: apiport,
      user: user,
      MODE: mode,
      CHATPORT: chatport
    }
    return vars;
  },
};
