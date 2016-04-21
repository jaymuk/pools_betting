angular.module('game', []);

angular.module('game').controller('GameController', ['$scope', '$log', 'PoolsService', function($scope, $log, PoolsService) {
  var self = this;

  self.poolsData;
  self.categoryOnDisplay;
  self.poolOnDisplay;
  self.legOnDisplay;

  function getPools(url) {
    var promise = PoolsService.getPoolsData(url);

    promise.then(function(payload) {
      $log.info(payload);
      self.poolsData = payload.data; // store data on controller/scope
    }, function(error) {
      $log.error('Failure: ' + error);
    });
  }

  self.setGroup = function(category) {
    return self.categoryOnDisplay = category;
  }

  // retrieve pools
  getPools('https://colossusdevtest.herokuapp.com/api/pools.json');

  self.getPool = function(id) {

    var promise = PoolsService.getPool('https://colossusdevtest.herokuapp.com/api/pools/' + id + '.json');

    promise.then(function(payload) {
      console.log(payload.data);
      self.poolOnDisplay = payload.data;
    }, function(error) {
      $log.error('Failure: ' + error);
    });
  };

  self.setLeg = function(leg) {
    self.legOnDisplay = leg;
  };

  var calculateLineTotal = function(selectionsObj) {
    var total = 1; // initialise at one line

      for (leg in selectionsObj) {
        total = total * selectionsObj[leg].length;
      }
       return self.lineTotal = total;
  };

  // == Data concerning bet selection == //
  self.betSelections = {};
  self.lineTotal = 1;
  self.stakes = [2, 1, 0.50, 0.20];
  self.betTotal = 0;

  self.addSelection = function(selection) {
    if (self.betSelections.hasOwnProperty("leg" + self.legOnDisplay.leg_order)) {
      $log.info("Already has leg" + self.legOnDisplay.leg_order);
      $log.info("Adding selection to that array....");
      self.betSelections['leg' + self.legOnDisplay.leg_order].push(selection);
      $log.info("complete");
      calculateLineTotal(self.betSelections);
    } else {
      self.betSelections['leg' + self.legOnDisplay.leg_order] = [];
      self.betSelections['leg' + self.legOnDisplay.leg_order].push(selection);
      calculateLineTotal(self.betSelections);
    }
  };

  self.addStake = function(stake) {
    self.betTotal = self.betTotal + stake;
  };

  self.placeBet = function() {
    function getSelectionIds(selections) {
      var ids = [];
      for (leg in selections) {
        selections[leg].forEach(function(selection) {
          ids.push(selection.id);
        });
      }
      return ids;
    }

    var bet = {
      lineTotal: self.lineTotal,
      betTotal: self.betTotal,
      selectionIds: getSelectionIds(self.betSelections)
    };

    var promise = PoolsService.placeBet('https://colossusdevtest.herokuapp.com/api/tickets.json', bet); // was not able to do post request to this URL!
    
    promise.then(function(payload) {
      $log.info(payload);
    }, function(error) {
      $log.error('Failure: ' + error);
    });
  };
}]);

angular.module('game').service('PoolsService', ['$http', '$log', function($http) {
  var onSuccess = function(data) {
    console.log("request completed successfully");
    return data;
  };

  var onFailure = function(error) {
    $log.error(error);
  };

  this.getPoolsData = function(url) { return $http.get(url).then(onSuccess, onFailure); };

  this.getPool = function(url) { return $http.get(url).then(onSuccess, onFailure); };

  this.placeBet = function(url, data) { return $http.get(url, data).then(onSuccess, onFailure); } 

}]);