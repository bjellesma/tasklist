var apiip;
var workip = '172.16.21.54'
function envCall(){
  $.ajax({
     url: '/env',
     type: "get",
     data: '',
     success: function(apiip){
         var apiip = apiip;
         console.log('api' + apiip);
         return apiip;
     }
  });
}
module.exports = {
  getEnvVariables: function () {
    envCall();
    var vars = {
      APIIP: envCall(),
      APIPORT: '3000'
    }
    return vars;
  },
};
