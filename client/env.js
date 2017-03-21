var apiip;
function envCall(){
  console.log('hi');
  $.ajax({
     url: '/env',
     type: "get",
     data: '',
     success: function(apiip){
         var apiip = apiip;
     }
  });
}
module.exports = {
  getEnvVariables: function () {
    envCall();
    var vars = {
      APIIP: apiip,
      APIPORT: '3000'
    }
    return vars;
  },
};
