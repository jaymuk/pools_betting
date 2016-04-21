'use strict';

describe('Pools Betting Game', function() {
  it('should work', function() {
    expect(true).toBe(true);
  });

  var PoolsService, $httpBackend, poolsRequestHandler, GameController, scope;

  describe('PoolsService', function() {
    beforeEach(function() {
      module('game');
      inject(function(_PoolsService_, _$httpBackend_) {
        PoolsService = _PoolsService_;
        $httpBackend = _$httpBackend_;
      });

      poolsRequestHandler = $httpBackend.when('GET', '/pools.json').respond([{id: 1}, {id: 2}]);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function() {
      expect(PoolsService).toBeDefined();
    });

    it('can query colossus API and receive array of pools', function() {
      $httpBackend.expectGET('/pools.json');
      var pools = PoolsService.getPoolData('/pools.json');
      $httpBackend.flush();
    });


  });


  describe('Game Controller', function() {
    beforeEach(function() {
      module('game');
      inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        GameController = $controller('GameController', {
          $scope: scope
        });
      });
    });

    
  });
});