'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../base/deserialize');  /* jshint ignore:line */
var serialize = require(
    '../../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var MemberList;
var MemberPage;
var MemberInstance;
var MemberContext;

/* jshint ignore:start */
/**
 * Initialize the MemberList
 *
 * @constructor Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList
 *
 * @param {Twilio.Chat.V2} version - Version of the resource
 * @param {string} serviceSid -
 *          The SID of the Service that the resource is associated with
 * @param {string} channelSid - The SID of the Channel for the member
 */
/* jshint ignore:end */
MemberList = function MemberList(version, serviceSid, channelSid) {
  /* jshint ignore:start */
  /**
   * @function members
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext}
   */
  /* jshint ignore:end */
  function MemberListInstance(sid) {
    return MemberListInstance.get(sid);
  }

  MemberListInstance._version = version;
  // Path Solution
  MemberListInstance._solution = {serviceSid: serviceSid, channelSid: channelSid};
  MemberListInstance._uri = `/Services/${serviceSid}/Channels/${channelSid}/Members`;
  /* jshint ignore:start */
  /**
   * create a MemberInstance
   *
   * @function create
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.identity -
   *          The `identity` value that identifies the new resource's User
   * @param {string} [opts.roleSid] - The SID of the Role to assign to the member
   * @param {number} [opts.lastConsumedMessageIndex] -
   *          The index of the last Message in the Channel the Member has read
   * @param {Date} [opts.lastConsumptionTimestamp] -
   *          The ISO 8601 based timestamp string representing the datetime of the last Message read event for the member within the Channel
   * @param {Date} [opts.dateCreated] -
   *          The ISO 8601 date and time in GMT when the resource was created
   * @param {Date} [opts.dateUpdated] -
   *          The ISO 8601 date and time in GMT when the resource was updated
   * @param {string} [opts.attributes] -
   *          A valid JSON string that contains application-specific data
   * @param {member.webhook_enabled_type} [opts.xTwilioWebhookEnabled] -
   *          The X-Twilio-Webhook-Enabled HTTP request header
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed MemberInstance
   */
  /* jshint ignore:end */
  MemberListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.identity)) {
      throw new Error('Required parameter "opts.identity" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'Identity': _.get(opts, 'identity'),
      'RoleSid': _.get(opts, 'roleSid'),
      'LastConsumedMessageIndex': _.get(opts, 'lastConsumedMessageIndex'),
      'LastConsumptionTimestamp': serialize.iso8601DateTime(_.get(opts, 'lastConsumptionTimestamp')),
      'DateCreated': serialize.iso8601DateTime(_.get(opts, 'dateCreated')),
      'DateUpdated': serialize.iso8601DateTime(_.get(opts, 'dateUpdated')),
      'Attributes': _.get(opts, 'attributes')
    });
    var headers = values.of({'X-Twilio-Webhook-Enabled': _.get(opts, 'xTwilioWebhookEnabled')});

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data, headers: headers});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberInstance(
        this._version,
        payload,
        this._solution.serviceSid,
        this._solution.channelSid,
        this._solution.sid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Streams MemberInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function each
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          The `identity` value of the resources to read
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  MemberListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          callback(instance, onComplete);
        });

        if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        } else {
          onComplete();
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists MemberInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          The `identity` value of the resources to read
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of MemberInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          The `identity` value of the resources to read
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Identity': serialize.map(_.get(opts, 'identity'), function(e) { return e; }),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of MemberInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a member
   *
   * @function get
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @param {string} sid - The SID of the Member resource to fetch
   *
   * @returns {Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext}
   */
  /* jshint ignore:end */
  MemberListInstance.get = function get(sid) {
    return new MemberContext(this._version, this._solution.serviceSid, this._solution.channelSid, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  MemberListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  MemberListInstance[util.inspect.custom] = function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return MemberListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the MemberPage
 *
 * @constructor Twilio.Chat.V2.ServiceContext.ChannelContext.MemberPage
 *
 * @param {V2} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {MemberSolution} solution - Path solution
 *
 * @returns MemberPage
 */
/* jshint ignore:end */
MemberPage = function MemberPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(MemberPage.prototype, Page.prototype);
MemberPage.prototype.constructor = MemberPage;

/* jshint ignore:start */
/**
 * Build an instance of MemberInstance
 *
 * @function getInstance
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberPage#
 *
 * @param {MemberPayload} payload - Payload response from the API
 *
 * @returns MemberInstance
 */
/* jshint ignore:end */
MemberPage.prototype.getInstance = function getInstance(payload) {
  return new MemberInstance(
    this._version,
    payload,
    this._solution.serviceSid,
    this._solution.channelSid
  );
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
MemberPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

MemberPage.prototype[util.inspect.custom] = function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the MemberContext
 *
 * @constructor Twilio.Chat.V2.ServiceContext.ChannelContext.MemberInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} channelSid - The SID of the Channel for the member
 * @property {string} serviceSid -
 *          The SID of the Service that the resource is associated with
 * @property {string} identity - The string that identifies the resource's User
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {Date} dateUpdated -
 *          The ISO 8601 date and time in GMT when the resource was last updated
 * @property {string} roleSid - The SID of the Role assigned to the member
 * @property {number} lastConsumedMessageIndex -
 *          The index of the last Message that the Member has read within the Channel
 * @property {Date} lastConsumptionTimestamp -
 *          The ISO 8601 based timestamp string that represents the datetime of the last Message read event for the Member within the Channel
 * @property {string} url - The absolute URL of the Member resource
 * @property {string} attributes -
 *          The JSON string that stores application-specific data
 *
 * @param {V2} version - Version of the resource
 * @param {MemberPayload} payload - The instance payload
 * @param {sid} serviceSid -
 *          The SID of the Service that the resource is associated with
 * @param {sid} channelSid - The SID of the Channel for the member
 * @param {sid_like} sid - The SID of the Member resource to fetch
 */
/* jshint ignore:end */
MemberInstance = function MemberInstance(version, payload, serviceSid,
                                          channelSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.channelSid = payload.channel_sid; // jshint ignore:line
  this.serviceSid = payload.service_sid; // jshint ignore:line
  this.identity = payload.identity; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.roleSid = payload.role_sid; // jshint ignore:line
  this.lastConsumedMessageIndex = deserialize.integer(payload.last_consumed_message_index); // jshint ignore:line
  this.lastConsumptionTimestamp = deserialize.iso8601DateTime(payload.last_consumption_timestamp); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.attributes = payload.attributes; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {serviceSid: serviceSid, channelSid: channelSid, sid: sid || this.sid, };
};

Object.defineProperty(MemberInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new MemberContext(
          this._version,
          this._solution.serviceSid,
          this._solution.channelSid,
          this._solution.sid
        );
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a MemberInstance
 *
 * @function fetch
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a MemberInstance
 *
 * @function remove
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {member.webhook_enabled_type} [opts.xTwilioWebhookEnabled] -
 *          The X-Twilio-Webhook-Enabled HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.remove = function remove(opts, callback) {
  return this._proxy.remove(opts, callback);
};

/* jshint ignore:start */
/**
 * update a MemberInstance
 *
 * @function update
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.roleSid] - The SID of the Role to assign to the member
 * @param {number} [opts.lastConsumedMessageIndex] -
 *          The index of the last consumed Message for the Channel for the Member
 * @param {Date} [opts.lastConsumptionTimestamp] -
 *          The ISO 8601 based timestamp string representing the datetime of the last Message read event for the Member within the Channel
 * @param {Date} [opts.dateCreated] -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @param {Date} [opts.dateUpdated] -
 *          The ISO 8601 date and time in GMT when the resource was updated
 * @param {string} [opts.attributes] -
 *          A valid JSON string that contains application-specific data
 * @param {member.webhook_enabled_type} [opts.xTwilioWebhookEnabled] -
 *          The X-Twilio-Webhook-Enabled HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
MemberInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

MemberInstance.prototype[util.inspect.custom] = function inspect(depth, options)
    {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the MemberContext
 *
 * @constructor Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext
 *
 * @param {V2} version - Version of the resource
 * @param {sid} serviceSid - The SID of the Service to fetch the resource from
 * @param {sid_like} channelSid - The SID of the channel the member belongs to
 * @param {sid_like} sid - The SID of the Member resource to fetch
 */
/* jshint ignore:end */
MemberContext = function MemberContext(version, serviceSid, channelSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {serviceSid: serviceSid, channelSid: channelSid, sid: sid, };
  this._uri = `/Services/${serviceSid}/Channels/${channelSid}/Members/${sid}`;
};

/* jshint ignore:start */
/**
 * fetch a MemberInstance
 *
 * @function fetch
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new MemberInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.channelSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a MemberInstance
 *
 * @function remove
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext#
 *
 * @param {object} [opts] - Options for request
 * @param {member.webhook_enabled_type} [opts.xTwilioWebhookEnabled] -
 *          The X-Twilio-Webhook-Enabled HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.remove = function remove(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var headers = values.of({'X-Twilio-Webhook-Enabled': _.get(opts, 'xTwilioWebhookEnabled')});

  var promise = this._version.remove({uri: this._uri, method: 'DELETE', headers: headers});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a MemberInstance
 *
 * @function update
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.roleSid] - The SID of the Role to assign to the member
 * @param {number} [opts.lastConsumedMessageIndex] -
 *          The index of the last consumed Message for the Channel for the Member
 * @param {Date} [opts.lastConsumptionTimestamp] -
 *          The ISO 8601 based timestamp string representing the datetime of the last Message read event for the Member within the Channel
 * @param {Date} [opts.dateCreated] -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @param {Date} [opts.dateUpdated] -
 *          The ISO 8601 date and time in GMT when the resource was updated
 * @param {string} [opts.attributes] -
 *          A valid JSON string that contains application-specific data
 * @param {member.webhook_enabled_type} [opts.xTwilioWebhookEnabled] -
 *          The X-Twilio-Webhook-Enabled HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'RoleSid': _.get(opts, 'roleSid'),
    'LastConsumedMessageIndex': _.get(opts, 'lastConsumedMessageIndex'),
    'LastConsumptionTimestamp': serialize.iso8601DateTime(_.get(opts, 'lastConsumptionTimestamp')),
    'DateCreated': serialize.iso8601DateTime(_.get(opts, 'dateCreated')),
    'DateUpdated': serialize.iso8601DateTime(_.get(opts, 'dateUpdated')),
    'Attributes': _.get(opts, 'attributes')
  });
  var headers = values.of({'X-Twilio-Webhook-Enabled': _.get(opts, 'xTwilioWebhookEnabled')});

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data, headers: headers});

  promise = promise.then(function(payload) {
    deferred.resolve(new MemberInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.channelSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
MemberContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

MemberContext.prototype[util.inspect.custom] = function inspect(depth, options)
    {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  MemberList: MemberList,
  MemberPage: MemberPage,
  MemberInstance: MemberInstance,
  MemberContext: MemberContext
};
