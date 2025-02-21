'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var _ = require('lodash');  /* jshint ignore:line */
var CallList = require('./v1/call').CallList;
var CallSummariesList = require('./v1/callSummaries').CallSummariesList;
var RoomList = require('./v1/room').RoomList;
var SettingList = require('./v1/setting').SettingList;
var Version = require('../../base/Version');  /* jshint ignore:line */


/* jshint ignore:start */
/**
 * Initialize the V1 version of Insights
 *
 * @constructor Twilio.Insights.V1
 *
 * @property {Twilio.Insights.V1.SettingList} settings - settings resource
 * @property {Twilio.Insights.V1.CallList} calls - calls resource
 * @property {Twilio.Insights.V1.CallSummariesList} callSummaries -
 *          callSummaries resource
 * @property {Twilio.Insights.V1.RoomList} rooms - rooms resource
 *
 * @param {Twilio.Insights} domain - The twilio domain
 */
/* jshint ignore:end */
function V1(domain) {
  Version.prototype.constructor.call(this, domain, 'v1');

  // Resources
  this._settings = undefined;
  this._calls = undefined;
  this._callSummaries = undefined;
  this._rooms = undefined;
}

_.extend(V1.prototype, Version.prototype);
V1.prototype.constructor = V1;

Object.defineProperty(V1.prototype,
  'settings', {
    get: function() {
      this._settings = this._settings || new SettingList(this);
      return this._settings;
    }
});

Object.defineProperty(V1.prototype,
  'calls', {
    get: function() {
      this._calls = this._calls || new CallList(this);
      return this._calls;
    }
});

Object.defineProperty(V1.prototype,
  'callSummaries', {
    get: function() {
      this._callSummaries = this._callSummaries || new CallSummariesList(this);
      return this._callSummaries;
    }
});

Object.defineProperty(V1.prototype,
  'rooms', {
    get: function() {
      this._rooms = this._rooms || new RoomList(this);
      return this._rooms;
    }
});

module.exports = V1;
