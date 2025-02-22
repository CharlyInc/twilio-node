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
var Page = require(
    '../../../../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../../../../base/deserialize');  /* jshint ignore:line */
var values = require(
    '../../../../../../../../base/values');  /* jshint ignore:line */

var AuthRegistrationsCredentialListMappingList;
var AuthRegistrationsCredentialListMappingPage;
var AuthRegistrationsCredentialListMappingInstance;
var AuthRegistrationsCredentialListMappingContext;

/* jshint ignore:start */
/**
 * Initialize the AuthRegistrationsCredentialListMappingList
 *
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The SID of the Account that created the resource
 * @param {string} domainSid - The unique string that identifies the resource
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingList = function
    AuthRegistrationsCredentialListMappingList(version, accountSid, domainSid) {
  /* jshint ignore:start */
  /**
   * @function credentialListMappings
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext}
   */
  /* jshint ignore:end */
  function AuthRegistrationsCredentialListMappingListInstance(sid) {
    return AuthRegistrationsCredentialListMappingListInstance.get(sid);
  }

  AuthRegistrationsCredentialListMappingListInstance._version = version;
  // Path Solution
  AuthRegistrationsCredentialListMappingListInstance._solution = {
    accountSid: accountSid,
    domainSid: domainSid
  };
  AuthRegistrationsCredentialListMappingListInstance._uri = `/Accounts/${accountSid}/SIP/Domains/${domainSid}/Auth/Registrations/CredentialListMappings.json`;
  /* jshint ignore:start */
  /**
   * create a AuthRegistrationsCredentialListMappingInstance
   *
   * @function create
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.credentialListSid -
   *          The SID of the CredentialList resource to map to the SIP domain
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed AuthRegistrationsCredentialListMappingInstance
   */
  /* jshint ignore:end */
  AuthRegistrationsCredentialListMappingListInstance.create = function
      create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.credentialListSid)) {
      throw new Error('Required parameter "opts.credentialListSid" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({'CredentialListSid': _.get(opts, 'credentialListSid')});

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new AuthRegistrationsCredentialListMappingInstance(
        this._version,
        payload,
        this._solution.accountSid,
        this._solution.domainSid,
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
   * Streams AuthRegistrationsCredentialListMappingInstance records from the API.
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
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {object} [opts] - Options for request
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
  AuthRegistrationsCredentialListMappingListInstance.each = function each(opts,
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
   * Lists AuthRegistrationsCredentialListMappingInstance records from the API as a
   * list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {object} [opts] - Options for request
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
  AuthRegistrationsCredentialListMappingListInstance.list = function list(opts,
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
   * Retrieve a single page of AuthRegistrationsCredentialListMappingInstance records
   * from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  AuthRegistrationsCredentialListMappingListInstance.page = function page(opts,
      callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new AuthRegistrationsCredentialListMappingPage(
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
   * Retrieve a single target page of AuthRegistrationsCredentialListMappingInstance
   * records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  AuthRegistrationsCredentialListMappingListInstance.getPage = function
      getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new AuthRegistrationsCredentialListMappingPage(
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
   * Constructs a auth_registrations_credential_list_mapping
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @param {string} sid - The unique string that identifies the resource
   *
   * @returns {Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext}
   */
  /* jshint ignore:end */
  AuthRegistrationsCredentialListMappingListInstance.get = function get(sid) {
    return new AuthRegistrationsCredentialListMappingContext(
      this._version,
      this._solution.accountSid,
      this._solution.domainSid,
      sid
    );
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  AuthRegistrationsCredentialListMappingListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  AuthRegistrationsCredentialListMappingListInstance[util.inspect.custom] =
      function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return AuthRegistrationsCredentialListMappingListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the AuthRegistrationsCredentialListMappingPage
 *
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingPage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {AuthRegistrationsCredentialListMappingSolution} solution - Path solution
 *
 * @returns AuthRegistrationsCredentialListMappingPage
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingPage = function
    AuthRegistrationsCredentialListMappingPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(AuthRegistrationsCredentialListMappingPage.prototype, Page.prototype);
AuthRegistrationsCredentialListMappingPage.prototype.constructor = AuthRegistrationsCredentialListMappingPage;

/* jshint ignore:start */
/**
 * Build an instance of AuthRegistrationsCredentialListMappingInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingPage#
 *
 * @param {AuthRegistrationsCredentialListMappingPayload} payload -
 *          Payload response from the API
 *
 * @returns AuthRegistrationsCredentialListMappingInstance
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingPage.prototype.getInstance = function
    getInstance(payload) {
  return new AuthRegistrationsCredentialListMappingInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.domainSid
  );
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingPage.prototype.toJSON = function toJSON()
    {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

AuthRegistrationsCredentialListMappingPage.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the AuthRegistrationsCredentialListMappingContext
 *
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingInstance
 *
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {Date} dateCreated -
 *          The RFC 2822 date and time in GMT that the resource was created
 * @property {Date} dateUpdated -
 *          The RFC 2822 date and time in GMT that the resource was last updated
 * @property {string} friendlyName -
 *          The string that you assigned to describe the resource
 * @property {string} sid - The unique string that identifies the resource
 *
 * @param {V2010} version - Version of the resource
 * @param {AuthRegistrationsCredentialListMappingPayload} payload -
 *          The instance payload
 * @param {sid} accountSid - The SID of the Account that created the resource
 * @param {sid} domainSid - The unique string that identifies the resource
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingInstance = function
    AuthRegistrationsCredentialListMappingInstance(version, payload, accountSid,
    domainSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {accountSid: accountSid, domainSid: domainSid, sid: sid || this.sid, };
};

Object.defineProperty(AuthRegistrationsCredentialListMappingInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new AuthRegistrationsCredentialListMappingContext(
          this._version,
          this._solution.accountSid,
          this._solution.domainSid,
          this._solution.sid
        );
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a AuthRegistrationsCredentialListMappingInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed AuthRegistrationsCredentialListMappingInstance
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingInstance.prototype.fetch = function
    fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a AuthRegistrationsCredentialListMappingInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed AuthRegistrationsCredentialListMappingInstance
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingInstance.prototype.remove = function
    remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingInstance.prototype.toJSON = function
    toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

AuthRegistrationsCredentialListMappingInstance.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the AuthRegistrationsCredentialListMappingContext
 *
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext
 *
 * @param {V2010} version - Version of the resource
 * @param {sid} accountSid -
 *          The SID of the Account that created the resource to fetch
 * @param {sid} domainSid -
 *          The SID of the SIP domain that contains the resource to fetch
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingContext = function
    AuthRegistrationsCredentialListMappingContext(version, accountSid,
    domainSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {accountSid: accountSid, domainSid: domainSid, sid: sid, };
  this._uri = `/Accounts/${accountSid}/SIP/Domains/${domainSid}/Auth/Registrations/CredentialListMappings/${sid}.json`;
};

/* jshint ignore:start */
/**
 * fetch a AuthRegistrationsCredentialListMappingInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed AuthRegistrationsCredentialListMappingInstance
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingContext.prototype.fetch = function
    fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new AuthRegistrationsCredentialListMappingInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.domainSid,
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
 * remove a AuthRegistrationsCredentialListMappingInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed AuthRegistrationsCredentialListMappingInstance
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingContext.prototype.remove = function
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
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.AuthTypesContext.AuthTypeRegistrationsContext.AuthRegistrationsCredentialListMappingContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
AuthRegistrationsCredentialListMappingContext.prototype.toJSON = function
    toJSON() {
  return this._solution;
};

AuthRegistrationsCredentialListMappingContext.prototype[util.inspect.custom] =
    function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  AuthRegistrationsCredentialListMappingList: AuthRegistrationsCredentialListMappingList,
  AuthRegistrationsCredentialListMappingPage: AuthRegistrationsCredentialListMappingPage,
  AuthRegistrationsCredentialListMappingInstance: AuthRegistrationsCredentialListMappingInstance,
  AuthRegistrationsCredentialListMappingContext: AuthRegistrationsCredentialListMappingContext
};
