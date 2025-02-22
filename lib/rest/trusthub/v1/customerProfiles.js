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
var CustomerProfilesChannelEndpointAssignmentList = require(
    './customerProfiles/customerProfilesChannelEndpointAssignment').CustomerProfilesChannelEndpointAssignmentList;
var CustomerProfilesEntityAssignmentsList = require(
    './customerProfiles/customerProfilesEntityAssignments').CustomerProfilesEntityAssignmentsList;
var CustomerProfilesEvaluationsList = require(
    './customerProfiles/customerProfilesEvaluations').CustomerProfilesEvaluationsList;
var Page = require('../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../base/values');  /* jshint ignore:line */

var CustomerProfilesList;
var CustomerProfilesPage;
var CustomerProfilesInstance;
var CustomerProfilesContext;

/* jshint ignore:start */
/**
 * Initialize the CustomerProfilesList
 *
 * @constructor Twilio.Trusthub.V1.CustomerProfilesList
 *
 * @param {Twilio.Trusthub.V1} version - Version of the resource
 */
/* jshint ignore:end */
CustomerProfilesList = function CustomerProfilesList(version) {
  /* jshint ignore:start */
  /**
   * @function customerProfiles
   * @memberof Twilio.Trusthub.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Trusthub.V1.CustomerProfilesContext}
   */
  /* jshint ignore:end */
  function CustomerProfilesListInstance(sid) {
    return CustomerProfilesListInstance.get(sid);
  }

  CustomerProfilesListInstance._version = version;
  // Path Solution
  CustomerProfilesListInstance._solution = {};
  CustomerProfilesListInstance._uri = `/CustomerProfiles`;
  /* jshint ignore:start */
  /**
   * create a CustomerProfilesInstance
   *
   * @function create
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.friendlyName -
   *          The string that you assigned to describe the resource
   * @param {string} opts.email - The email address
   * @param {string} opts.policySid - The unique string of a policy.
   * @param {string} [opts.statusCallback] -
   *          The URL we call to inform your application of status changes.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed CustomerProfilesInstance
   */
  /* jshint ignore:end */
  CustomerProfilesListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.friendlyName)) {
      throw new Error('Required parameter "opts.friendlyName" missing.');
    }
    if (_.isUndefined(opts.email)) {
      throw new Error('Required parameter "opts.email" missing.');
    }
    if (_.isUndefined(opts.policySid)) {
      throw new Error('Required parameter "opts.policySid" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': _.get(opts, 'friendlyName'),
      'Email': _.get(opts, 'email'),
      'PolicySid': _.get(opts, 'policySid'),
      'StatusCallback': _.get(opts, 'statusCallback')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CustomerProfilesInstance(this._version, payload, this._solution.sid));
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
   * Streams CustomerProfilesInstance records from the API.
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
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {object} [opts] - Options for request
   * @param {customer_profiles.status} [opts.status] -
   *          The verification status of the Customer-Profile resource
   * @param {string} [opts.friendlyName] -
   *          The string that you assigned to describe the resource
   * @param {string} [opts.policySid] - The unique string of a policy.
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
  CustomerProfilesListInstance.each = function each(opts, callback) {
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
   * Lists CustomerProfilesInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {object} [opts] - Options for request
   * @param {customer_profiles.status} [opts.status] -
   *          The verification status of the Customer-Profile resource
   * @param {string} [opts.friendlyName] -
   *          The string that you assigned to describe the resource
   * @param {string} [opts.policySid] - The unique string of a policy.
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
  CustomerProfilesListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {object} [opts] - Options for request
   * @param {customer_profiles.status} [opts.status] -
   *          The verification status of the Customer-Profile resource
   * @param {string} [opts.friendlyName] -
   *          The string that you assigned to describe the resource
   * @param {string} [opts.policySid] - The unique string of a policy.
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  CustomerProfilesListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Status': _.get(opts, 'status'),
      'FriendlyName': _.get(opts, 'friendlyName'),
      'PolicySid': _.get(opts, 'policySid'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CustomerProfilesPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  CustomerProfilesListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new CustomerProfilesPage(this._version, payload, this._solution));
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
   * Constructs a customer_profiles
   *
   * @function get
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @param {string} sid - The unique string that identifies the resource.
   *
   * @returns {Twilio.Trusthub.V1.CustomerProfilesContext}
   */
  /* jshint ignore:end */
  CustomerProfilesListInstance.get = function get(sid) {
    return new CustomerProfilesContext(this._version, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Trusthub.V1.CustomerProfilesList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  CustomerProfilesListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  CustomerProfilesListInstance[util.inspect.custom] = function inspect(depth,
      options) {
    return util.inspect(this.toJSON(), options);
  };

  return CustomerProfilesListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the CustomerProfilesPage
 *
 * @constructor Twilio.Trusthub.V1.CustomerProfilesPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {CustomerProfilesSolution} solution - Path solution
 *
 * @returns CustomerProfilesPage
 */
/* jshint ignore:end */
CustomerProfilesPage = function CustomerProfilesPage(version, response,
                                                      solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(CustomerProfilesPage.prototype, Page.prototype);
CustomerProfilesPage.prototype.constructor = CustomerProfilesPage;

/* jshint ignore:start */
/**
 * Build an instance of CustomerProfilesInstance
 *
 * @function getInstance
 * @memberof Twilio.Trusthub.V1.CustomerProfilesPage#
 *
 * @param {CustomerProfilesPayload} payload - Payload response from the API
 *
 * @returns CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesPage.prototype.getInstance = function getInstance(payload) {
  return new CustomerProfilesInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.CustomerProfilesPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
CustomerProfilesPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

CustomerProfilesPage.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the CustomerProfilesContext
 *
 * @constructor Twilio.Trusthub.V1.CustomerProfilesInstance
 *
 * @property {string} sid - The unique string that identifies the resource.
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} policySid - The unique string of a policy.
 * @property {string} friendlyName -
 *          The string that you assigned to describe the resource
 * @property {customer_profiles.status} status -
 *          The verification status of the Customer-Profile resource
 * @property {Date} validUntil -
 *          The ISO 8601 date and time in GMT when the resource will be valid until.
 * @property {string} email - The email address
 * @property {string} statusCallback -
 *          The URL we call to inform your application of status changes.
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {Date} dateUpdated -
 *          The ISO 8601 date and time in GMT when the resource was last updated
 * @property {string} url - The absolute URL of the Customer-Profile resource
 * @property {string} links -
 *          The URLs of the Assigned Items of the Customer-Profile resource
 *
 * @param {V1} version - Version of the resource
 * @param {CustomerProfilesPayload} payload - The instance payload
 * @param {sid} sid - The unique string that identifies the resource.
 */
/* jshint ignore:end */
CustomerProfilesInstance = function CustomerProfilesInstance(version, payload,
    sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.policySid = payload.policy_sid; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.validUntil = deserialize.iso8601DateTime(payload.valid_until); // jshint ignore:line
  this.email = payload.email; // jshint ignore:line
  this.statusCallback = payload.status_callback; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {sid: sid || this.sid, };
};

Object.defineProperty(CustomerProfilesInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new CustomerProfilesContext(this._version, this._solution.sid);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a CustomerProfilesInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a CustomerProfilesInstance
 *
 * @function update
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {customer_profiles.status} [opts.status] -
 *          The verification status of the Customer-Profile resource
 * @param {string} [opts.statusCallback] -
 *          The URL we call to inform your application of status changes.
 * @param {string} [opts.friendlyName] -
 *          The string that you assigned to describe the resource
 * @param {string} [opts.email] - The email address
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * remove a CustomerProfilesInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Access the customerProfilesEntityAssignments
 *
 * @function customerProfilesEntityAssignments
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @returns {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesEntityAssignmentsList}
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.customerProfilesEntityAssignments = function
    customerProfilesEntityAssignments() {
  return this._proxy.customerProfilesEntityAssignments;
};

/* jshint ignore:start */
/**
 * Access the customerProfilesEvaluations
 *
 * @function customerProfilesEvaluations
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @returns {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesEvaluationsList}
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.customerProfilesEvaluations = function
    customerProfilesEvaluations() {
  return this._proxy.customerProfilesEvaluations;
};

/* jshint ignore:start */
/**
 * Access the customerProfilesChannelEndpointAssignment
 *
 * @function customerProfilesChannelEndpointAssignment
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @returns {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesChannelEndpointAssignmentList}
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.customerProfilesChannelEndpointAssignment =
    function customerProfilesChannelEndpointAssignment() {
  return this._proxy.customerProfilesChannelEndpointAssignment;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.CustomerProfilesInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
CustomerProfilesInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

CustomerProfilesInstance.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the CustomerProfilesContext
 *
 * @constructor Twilio.Trusthub.V1.CustomerProfilesContext
 *
 * @property {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesEntityAssignmentsList} customerProfilesEntityAssignments -
 *          customerProfilesEntityAssignments resource
 * @property {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesEvaluationsList} customerProfilesEvaluations -
 *          customerProfilesEvaluations resource
 * @property {Twilio.Trusthub.V1.CustomerProfilesContext.CustomerProfilesChannelEndpointAssignmentList} customerProfilesChannelEndpointAssignment -
 *          customerProfilesChannelEndpointAssignment resource
 *
 * @param {V1} version - Version of the resource
 * @param {sid} sid - The unique string that identifies the resource.
 */
/* jshint ignore:end */
CustomerProfilesContext = function CustomerProfilesContext(version, sid) {
  this._version = version;

  // Path Solution
  this._solution = {sid: sid, };
  this._uri = `/CustomerProfiles/${sid}`;

  // Dependents
  this._customerProfilesEntityAssignments = undefined;
  this._customerProfilesEvaluations = undefined;
  this._customerProfilesChannelEndpointAssignment = undefined;
};

/* jshint ignore:start */
/**
 * fetch a CustomerProfilesInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.CustomerProfilesContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new CustomerProfilesInstance(this._version, payload, this._solution.sid));
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
 * update a CustomerProfilesInstance
 *
 * @function update
 * @memberof Twilio.Trusthub.V1.CustomerProfilesContext#
 *
 * @param {object} [opts] - Options for request
 * @param {customer_profiles.status} [opts.status] -
 *          The verification status of the Customer-Profile resource
 * @param {string} [opts.statusCallback] -
 *          The URL we call to inform your application of status changes.
 * @param {string} [opts.friendlyName] -
 *          The string that you assigned to describe the resource
 * @param {string} [opts.email] - The email address
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Status': _.get(opts, 'status'),
    'StatusCallback': _.get(opts, 'statusCallback'),
    'FriendlyName': _.get(opts, 'friendlyName'),
    'Email': _.get(opts, 'email')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new CustomerProfilesInstance(this._version, payload, this._solution.sid));
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
 * remove a CustomerProfilesInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.CustomerProfilesContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CustomerProfilesInstance
 */
/* jshint ignore:end */
CustomerProfilesContext.prototype.remove = function remove(callback) {
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

Object.defineProperty(CustomerProfilesContext.prototype,
  'customerProfilesEntityAssignments', {
    get: function() {
      if (!this._customerProfilesEntityAssignments) {
        this._customerProfilesEntityAssignments = new CustomerProfilesEntityAssignmentsList(
          this._version,
          this._solution.sid
        );
      }
      return this._customerProfilesEntityAssignments;
    }
});

Object.defineProperty(CustomerProfilesContext.prototype,
  'customerProfilesEvaluations', {
    get: function() {
      if (!this._customerProfilesEvaluations) {
        this._customerProfilesEvaluations = new CustomerProfilesEvaluationsList(
          this._version,
          this._solution.sid
        );
      }
      return this._customerProfilesEvaluations;
    }
});

Object.defineProperty(CustomerProfilesContext.prototype,
  'customerProfilesChannelEndpointAssignment', {
    get: function() {
      if (!this._customerProfilesChannelEndpointAssignment) {
        this._customerProfilesChannelEndpointAssignment = new CustomerProfilesChannelEndpointAssignmentList(
          this._version,
          this._solution.sid
        );
      }
      return this._customerProfilesChannelEndpointAssignment;
    }
});

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.CustomerProfilesContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
CustomerProfilesContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

CustomerProfilesContext.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  CustomerProfilesList: CustomerProfilesList,
  CustomerProfilesPage: CustomerProfilesPage,
  CustomerProfilesInstance: CustomerProfilesInstance,
  CustomerProfilesContext: CustomerProfilesContext
};
