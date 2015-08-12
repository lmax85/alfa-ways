var ServerActionCreators = require('../actions/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if (res) {
    var json = JSON.parse(res.text);
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = AppConstants.APIEndpoints;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: { 
        email: email, 
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ username: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  loadTrips: function() {
    console.log('TripsWebUtils__loadTrips (APIEndpoints.Trips) = ' + APIEndpoints.Trips);
    request.get(APIEndpoints.Trips)
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__loadTrips (json) = ');
          console.log(json);
          ServerActionCreators.receiveTrips(json);
        }
      });
  },

  loadTrip: function(tripId) {
    request.get(APIEndpoints.Trip + '/' + tripId)
      .set('Accept', 'application/json')
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveTrip(json);
          console.log('TripsWebUtils__loadTrip (json) = ');
          console.log(json);
        }
      });
  },

  createTrip: function(data) {
    request.post(APIEndpoints.AddTrip)
    .set('Accept', 'application/json')
    .type('json')
    .send({"description":data.description, "user_id": data.driver, "from": data.from, "to": data.to, "departureDay": data.departureDay, "departureTime": data.departureTime})
    .end(function(error, res){
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        if (res.error) {
          var errorMsgs = _getErrors(res);
          ServerActionCreators.receiveCreatedTrip(null, errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__createTrip___________');
          console.log(json);
          ServerActionCreators.receiveCreatedTrip(json, null);
        }
      }
    });
  }

};