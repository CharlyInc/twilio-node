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
var Page = require('../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../base/deserialize');  /* jshint ignore:line */
var serialize = require('../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../base/values');  /* jshint ignore:line */

var CommandList;
var CommandPage;
var CommandInstance;
var CommandContext;

/* jshint ignore:start */
/**
 * Initialize the CommandList
 *
 * @constructor Twilio.Wireless.V1.CommandList
 *
 * @param {Twilio.Wireless.V1} version - Version of the resource
 */
/* jshint ignore:end */
CommandList = function CommandList(version) {
  /* jshint ignore:start */
  /**
   * @function commands
   * @memberof Twilio.Wireless.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Wireless.V1.CommandContext}
   */
  /* jshint ignore:end */
  function CommandListInstance(sid) {
    return CommandListInstance.get(sid);
  }

  CommandListInstance._version = version;
  // Path Solution
  CommandListInstance._solution = {};
  CommandListInstance._uri = `/Commands`;
  /* jshint ignore:start */
  /**
   * Streams CommandInstance records from the API.
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
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.sim] - The sid or unique_name of the Sim resources to read
   * @param {command.status} [opts.status] - The status of the resources to read
   * @param {command.direction} [opts.direction] -
   *          Only return Commands with this direction value
   * @param {command.transport} [opts.transport] -
   *          Only return Commands with this transport value
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
  CommandListInstance.each = function each(opts, callback) {
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
   * Lists CommandInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.sim] - The sid or unique_name of the Sim resources to read
   * @param {command.status} [opts.status] - The status of the resources to read
   * @param {command.direction} [opts.direction] -
   *          Only return Commands with this direction value
   * @param {command.transport} [opts.transport] -
   *          Only return Commands with this transport value
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
  CommandListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of CommandInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.sim] - The sid or unique_name of the Sim resources to read
   * @param {command.status} [opts.status] - The status of the resources to read
   * @param {command.direction} [opts.direction] -
   *          Only return Commands with this direction value
   * @param {command.transport} [opts.transport] -
   *          Only return Commands with this transport value
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  CommandListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Sim': _.get(opts, 'sim'),
      'Status': _.get(opts, 'status'),
      'Direction': _.get(opts, 'direction'),
      'Transport': _.get(opts, 'transport'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CommandPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of CommandInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  CommandListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new CommandPage(this._version, payload, this._solution));
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
   * create a CommandInstance
   *
   * @function create
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.command -
   *          The message body of the Command or a Base64 encoded byte string in binary mode
   * @param {string} [opts.sim] -
   *          The sid or unique_name of the SIM to send the Command to
   * @param {string} [opts.callbackMethod] -
   *          The HTTP method we use to call callback_url
   * @param {string} [opts.callbackUrl] -
   *          he URL we call when the Command has finished sending
   * @param {command.command_mode} [opts.commandMode] -
   *          The mode to use when sending the SMS message
   * @param {string} [opts.includeSid] -
   *          Whether to include the SID of the command in the message body
   * @param {boolean} [opts.deliveryReceiptRequested] -
   *          Whether to request delivery receipt from the recipient
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed CommandInstance
   */
  /* jshint ignore:end */
  CommandListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.command)) {
      throw new Error('Required parameter "opts.command" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'Command': _.get(opts, 'command'),
      'Sim': _.get(opts, 'sim'),
      'CallbackMethod': _.get(opts, 'callbackMethod'),
      'CallbackUrl': _.get(opts, 'callbackUrl'),
      'CommandMode': _.get(opts, 'commandMode'),
      'IncludeSid': _.get(opts, 'includeSid'),
      'DeliveryReceiptRequested': serialize.bool(_.get(opts, 'deliveryReceiptRequested'))
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CommandInstance(this._version, payload, this._solution.sid));
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
   * Constructs a command
   *
   * @function get
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @param {string} sid - The SID that identifies the resource to fetch
   *
   * @returns {Twilio.Wireless.V1.CommandContext}
   */
  /* jshint ignore:end */
  CommandListInstance.get = function get(sid) {
    return new CommandContext(this._version, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Wireless.V1.CommandList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  CommandListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  CommandListInstance[util.inspect.custom] = function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return CommandListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the CommandPage
 *
 * @constructor Twilio.Wireless.V1.CommandPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {CommandSolution} solution - Path solution
 *
 * @returns CommandPage
 */
/* jshint ignore:end */
CommandPage = function CommandPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(CommandPage.prototype, Page.prototype);
CommandPage.prototype.constructor = CommandPage;

/* jshint ignore:start */
/**
 * Build an instance of CommandInstance
 *
 * @function getInstance
 * @memberof Twilio.Wireless.V1.CommandPage#
 *
 * @param {CommandPayload} payload - Payload response from the API
 *
 * @returns CommandInstance
 */
/* jshint ignore:end */
CommandPage.prototype.getInstance = function getInstance(payload) {
  return new CommandInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Wireless.V1.CommandPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
CommandPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

CommandPage.prototype[util.inspect.custom] = function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the CommandContext
 *
 * @constructor Twilio.Wireless.V1.CommandInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} simSid -
 *          The SID of the Sim resource that the Command was sent to or from
 * @property {string} command - The message being sent to or from the SIM
 * @property {command.command_mode} commandMode -
 *          The mode used to send the SMS message
 * @property {command.transport} transport - The type of transport used
 * @property {boolean} deliveryReceiptRequested -
 *          Whether to request a delivery receipt
 * @property {command.status} status - The status of the Command
 * @property {command.direction} direction - The direction of the Command
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {Date} dateUpdated -
 *          The ISO 8601 date and time in GMT when the resource was last updated format
 * @property {string} url - The absolute URL of the resource
 *
 * @param {V1} version - Version of the resource
 * @param {CommandPayload} payload - The instance payload
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
CommandInstance = function CommandInstance(version, payload, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.simSid = payload.sim_sid; // jshint ignore:line
  this.command = payload.command; // jshint ignore:line
  this.commandMode = payload.command_mode; // jshint ignore:line
  this.transport = payload.transport; // jshint ignore:line
  this.deliveryReceiptRequested = payload.delivery_receipt_requested; // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.direction = payload.direction; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {sid: sid || this.sid, };
};

Object.defineProperty(CommandInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new CommandContext(this._version, this._solution.sid);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a CommandInstance
 *
 * @function fetch
 * @memberof Twilio.Wireless.V1.CommandInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CommandInstance
 */
/* jshint ignore:end */
CommandInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a CommandInstance
 *
 * @function remove
 * @memberof Twilio.Wireless.V1.CommandInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CommandInstance
 */
/* jshint ignore:end */
CommandInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Wireless.V1.CommandInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
CommandInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

CommandInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the CommandContext
 *
 * @constructor Twilio.Wireless.V1.CommandContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
CommandContext = function CommandContext(version, sid) {
  this._version = version;

  // Path Solution
  this._solution = {sid: sid, };
  this._uri = `/Commands/${sid}`;
};

/* jshint ignore:start */
/**
 * fetch a CommandInstance
 *
 * @function fetch
 * @memberof Twilio.Wireless.V1.CommandContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CommandInstance
 */
/* jshint ignore:end */
CommandContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new CommandInstance(this._version, payload, this._solution.sid));
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
 * remove a CommandInstance
 *
 * @function remove
 * @memberof Twilio.Wireless.V1.CommandContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CommandInstance
 */
/* jshint ignore:end */
CommandContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

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
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Wireless.V1.CommandContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
CommandContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

CommandContext.prototype[util.inspect.custom] = function inspect(depth, options)
    {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  CommandList: CommandList,
  CommandPage: CommandPage,
  CommandInstance: CommandInstance,
  CommandContext: CommandContext
};
