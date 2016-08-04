'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/request');
var Response = require('../../../../../../../lib/http/response');
var RestException = require('../../../../../../../lib/base/RestException');
var Twilio = require('../../../../../../../lib');


var client;
var holodeck;

describe('TaskQueuesStatistics', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', holodeck);
  });
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.taskrouter.v1.workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .taskQueues
                                        .statistics.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        //expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        workspaceSid: 'WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://taskrouter.twilio.com/v1/Workspaces/<%= workspaceSid %>/TaskQueues/Statistics')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'first_page_url': 'https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics?PageSize=50&Page=0',
              'key': 'task_queues_statistics',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics?PageSize=50&Page=0'
          },
          'task_queues_statistics': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'cumulative': {
                      'avg_task_acceptance_time': 0.0,
                      'end_time': '2015-08-18T00:46:15Z',
                      'reservations_accepted': 0,
                      'reservations_canceled': 0,
                      'reservations_created': 0,
                      'reservations_rejected': 0,
                      'reservations_rescinded': 0,
                      'reservations_timed_out': 0,
                      'start_time': '2015-08-18T00:31:15Z',
                      'tasks_canceled': 0,
                      'tasks_deleted': 0,
                      'tasks_entered': 0,
                      'tasks_moved': 0
                  },
                  'realtime': {
                      'activity_statistics': [
                          {
                              'friendly_name': 'Offline',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          },
                          {
                              'friendly_name': 'Idle',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          },
                          {
                              'friendly_name': '80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          },
                          {
                              'friendly_name': 'Reserved',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          },
                          {
                              'friendly_name': 'Busy',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          },
                          {
                              'friendly_name': '817ca1c5-3a05-11e5-9292-98e0d9a1eb73',
                              'sid': 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              'workers': 0
                          }
                      ],
                      'longest_task_waiting_age': 0,
                      'longest_task_waiting_sid': null,
                      'tasks_by_status': {
                          'assigned': 0,
                          'pending': 0,
                          'reserved': 0
                      },
                      'total_available_workers': 0,
                      'total_eligible_workers': 0,
                      'total_tasks': 0
                  },
                  'task_queue_sid': 'WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'workspace_sid': 'WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      });

      holodeck.mock(new Response(200, body));

      var promise = client.taskrouter.v1.workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .taskQueues
                                        .statistics.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'first_page_url': 'https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics?PageSize=50&Page=0',
              'key': 'task_queues_statistics',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics?PageSize=50&Page=0'
          },
          'task_queues_statistics': []
      });

      holodeck.mock(new Response(200, body));

      var promise = client.taskrouter.v1.workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .taskQueues
                                        .statistics.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

