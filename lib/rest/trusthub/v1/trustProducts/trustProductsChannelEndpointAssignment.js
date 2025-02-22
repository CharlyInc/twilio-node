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
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var TrustProductsChannelEndpointAssignmentList;
var TrustProductsChannelEndpointAssignmentPage;
var TrustProductsChannelEndpointAssignmentInstance;
var TrustProductsChannelEndpointAssignmentContext;

/* jshint ignore:start */
/**
 * Initialize the TrustProductsChannelEndpointAssignmentList
 *
 * @constructor Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList
 *
 * @param {Twilio.Trusthub.V1} version - Version of the resource
 * @param {string} trustProductSid -
 *          The unique string that identifies the CustomerProfile resource.
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentList = function
    TrustProductsChannelEndpointAssignmentList(version, trustProductSid) {
  /* jshint ignore:start */
  /**
   * @function trustProductsChannelEndpointAssignment
   * @memberof Twilio.Trusthub.V1.TrustProductsContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext}
   */
  /* jshint ignore:end */
  function TrustProductsChannelEndpointAssignmentListInstance(sid) {
    return TrustProductsChannelEndpointAssignmentListInstance.get(sid);
  }

  TrustProductsChannelEndpointAssignmentListInstance._version = version;
  // Path Solution
  TrustProductsChannelEndpointAssignmentListInstance._solution = {trustProductSid: trustProductSid};
  TrustProductsChannelEndpointAssignmentListInstance._uri = `/TrustProducts/${trustProductSid}/ChannelEndpointAssignments`;
  /* jshint ignore:start */
  /**
   * create a TrustProductsChannelEndpointAssignmentInstance
   *
   * @function create
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.channelEndpointType - The type of channel endpoint
   * @param {string} opts.channelEndpointSid - The sid of an channel endpoint
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed TrustProductsChannelEndpointAssignmentInstance
   */
  /* jshint ignore:end */
  TrustProductsChannelEndpointAssignmentListInstance.create = function
      create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.channelEndpointType)) {
      throw new Error('Required parameter "opts.channelEndpointType" missing.');
    }
    if (_.isUndefined(opts.channelEndpointSid)) {
      throw new Error('Required parameter "opts.channelEndpointSid" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'ChannelEndpointType': _.get(opts, 'channelEndpointType'),
      'ChannelEndpointSid': _.get(opts, 'channelEndpointSid')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new TrustProductsChannelEndpointAssignmentInstance(
        this._version,
        payload,
        this._solution.trustProductSid,
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
   * Streams TrustProductsChannelEndpointAssignmentInstance records from the API.
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
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.channelEndpointSid] - The sid of an channel endpoint
   * @param {string} [opts.channelEndpointSids] -
   *          comma separated list of channel endpoint sids
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
  TrustProductsChannelEndpointAssignmentListInstance.each = function each(opts,
      callback) {
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
   * Lists TrustProductsChannelEndpointAssignmentInstance records from the API as a
   * list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.channelEndpointSid] - The sid of an channel endpoint
   * @param {string} [opts.channelEndpointSids] -
   *          comma separated list of channel endpoint sids
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
  TrustProductsChannelEndpointAssignmentListInstance.list = function list(opts,
      callback) {
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
   * Retrieve a single page of TrustProductsChannelEndpointAssignmentInstance records
   * from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.channelEndpointSid] - The sid of an channel endpoint
   * @param {string} [opts.channelEndpointSids] -
   *          comma separated list of channel endpoint sids
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  TrustProductsChannelEndpointAssignmentListInstance.page = function page(opts,
      callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'ChannelEndpointSid': _.get(opts, 'channelEndpointSid'),
      'ChannelEndpointSids': _.get(opts, 'channelEndpointSids'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new TrustProductsChannelEndpointAssignmentPage(
        this._version,
        payload,
        this._solution
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
   * Retrieve a single target page of TrustProductsChannelEndpointAssignmentInstance
   * records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  TrustProductsChannelEndpointAssignmentListInstance.getPage = function
      getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new TrustProductsChannelEndpointAssignmentPage(
        this._version,
        payload,
        this._solution
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
   * Constructs a trust_products_channel_endpoint_assignment
   *
   * @function get
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @param {string} sid - The unique string that identifies the resource
   *
   * @returns {Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext}
   */
  /* jshint ignore:end */
  TrustProductsChannelEndpointAssignmentListInstance.get = function get(sid) {
    return new TrustProductsChannelEndpointAssignmentContext(
      this._version,
      this._solution.trustProductSid,
      sid
    );
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  TrustProductsChannelEndpointAssignmentListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  TrustProductsChannelEndpointAssignmentListInstance[util.inspect.custom] =
      function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return TrustProductsChannelEndpointAssignmentListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the TrustProductsChannelEndpointAssignmentPage
 *
 * @constructor Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {TrustProductsChannelEndpointAssignmentSolution} solution - Path solution
 *
 * @returns TrustProductsChannelEndpointAssignmentPage
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentPage = function
    TrustProductsChannelEndpointAssignmentPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(TrustProductsChannelEndpointAssignmentPage.prototype, Page.prototype);
TrustProductsChannelEndpointAssignmentPage.prototype.constructor = TrustProductsChannelEndpointAssignmentPage;

/* jshint ignore:start */
/**
 * Build an instance of TrustProductsChannelEndpointAssignmentInstance
 *
 * @function getInstance
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentPage#
 *
 * @param {TrustProductsChannelEndpointAssignmentPayload} payload -
 *          Payload response from the API
 *
 * @returns TrustProductsChannelEndpointAssignmentInstance
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentPage.prototype.getInstance = function
    getInstance(payload) {
  return new TrustProductsChannelEndpointAssignmentInstance(
    this._version,
    payload,
    this._solution.trustProductSid
  );
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentPage.prototype.toJSON = function toJSON()
    {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

TrustProductsChannelEndpointAssignmentPage.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the TrustProductsChannelEndpointAssignmentContext
 *
 * @constructor Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} trustProductSid -
 *          The unique string that identifies the CustomerProfile resource.
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} channelEndpointType - The type of channel endpoint
 * @property {string} channelEndpointSid - The sid of an channel endpoint
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {string} url - The absolute URL of the Identity resource
 *
 * @param {V1} version - Version of the resource
 * @param {TrustProductsChannelEndpointAssignmentPayload} payload -
 *          The instance payload
 * @param {sid} trustProductSid -
 *          The unique string that identifies the CustomerProfile resource.
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentInstance = function
    TrustProductsChannelEndpointAssignmentInstance(version, payload,
    trustProductSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.trustProductSid = payload.trust_product_sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.channelEndpointType = payload.channel_endpoint_type; // jshint ignore:line
  this.channelEndpointSid = payload.channel_endpoint_sid; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {trustProductSid: trustProductSid, sid: sid || this.sid, };
};

Object.defineProperty(TrustProductsChannelEndpointAssignmentInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new TrustProductsChannelEndpointAssignmentContext(
          this._version,
          this._solution.trustProductSid,
          this._solution.sid
        );
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a TrustProductsChannelEndpointAssignmentInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TrustProductsChannelEndpointAssignmentInstance
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentInstance.prototype.fetch = function
    fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a TrustProductsChannelEndpointAssignmentInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TrustProductsChannelEndpointAssignmentInstance
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentInstance.prototype.remove = function
    remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentInstance.prototype.toJSON = function
    toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

TrustProductsChannelEndpointAssignmentInstance.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the TrustProductsChannelEndpointAssignmentContext
 *
 * @constructor Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} trustProductSid - The unique string that identifies the resource.
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentContext = function
    TrustProductsChannelEndpointAssignmentContext(version, trustProductSid, sid)
    {
  this._version = version;

  // Path Solution
  this._solution = {trustProductSid: trustProductSid, sid: sid, };
  this._uri = `/TrustProducts/${trustProductSid}/ChannelEndpointAssignments/${sid}`;
};

/* jshint ignore:start */
/**
 * fetch a TrustProductsChannelEndpointAssignmentInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TrustProductsChannelEndpointAssignmentInstance
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentContext.prototype.fetch = function
    fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new TrustProductsChannelEndpointAssignmentInstance(
      this._version,
      payload,
      this._solution.trustProductSid,
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
 * remove a TrustProductsChannelEndpointAssignmentInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TrustProductsChannelEndpointAssignmentInstance
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentContext.prototype.remove = function
    remove(callback) {
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
 * @memberof Twilio.Trusthub.V1.TrustProductsContext.TrustProductsChannelEndpointAssignmentContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
TrustProductsChannelEndpointAssignmentContext.prototype.toJSON = function
    toJSON() {
  return this._solution;
};

TrustProductsChannelEndpointAssignmentContext.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  TrustProductsChannelEndpointAssignmentList: TrustProductsChannelEndpointAssignmentList,
  TrustProductsChannelEndpointAssignmentPage: TrustProductsChannelEndpointAssignmentPage,
  TrustProductsChannelEndpointAssignmentInstance: TrustProductsChannelEndpointAssignmentInstance,
  TrustProductsChannelEndpointAssignmentContext: TrustProductsChannelEndpointAssignmentContext
};
