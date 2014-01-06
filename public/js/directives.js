/* Directives */
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('datatablesDirectives', []).directive('datatable', function ($compile) {
  return {
  	// I restricted it to A only. I initially wanted to do something like
  	// <datatable> <thead> ... </thead> </datatable>
  	// But thead elements are only valid inside table, and <datatable> is not a table. 
  	// So.. no choice to use <table datatable>
    restrict: 'A',

    link: function ($scope, $elem, attrs) {
    	var options = {};

    	// Start with the defaults. Change this to your defaults.
    	options = {
        "bFilter": false,
        "bLengthChange": false,
        "bProcessing": true, 
        "bServerSide": true,
        "fnServerData": function ( sSource, aoData, fnCallback ) {
          // add all our additional filters
          if ($scope.filters) {
            $.each($scope.filters, function(key, val) {
              // THIS WILL ONLY WORK FOR SELECTS CURRENTLY
              if(val)
                aoData.push( { "name": key, "value": val } );
            });
          }

          $.getJSON( sSource, aoData, function (json) { 
            /* Do whatever additional processing you want on the callback, then tell DataTables */
            fnCallback(json);
          } );
        },
        "fnDrawCallback": function( oSettings ) {
          // recomplie any angular directives
          $compile($('table[datatable="datatable"] tr'))($scope);

          // optional function callback
          if (typeof $scope.dtCallback !== 'undefined') {
            $scope.dtCallback();
          }
        }
      }

    	// If dtOptions is defined in the controller, extend our default option.
    	if (typeof $scope.dtOptions !== 'undefined') {
    		angular.extend(options, $scope.dtOptions);
    	}

      // If dtoptions is not declared, check the other options
      if (attrs['dtoptions'] === undefined) {

      	// Get the attributes, put it in an options
      	// We need to do a switch/case because attributes does not retain case
      	// and datatables options are case sensitive. Damn. It's okay! We need to detect
      	// the callbacks anyway and call it as functions, so it works out!
      	// I put what I needed, most of my settings are not dynamics except those 2. 
      	for (property in attrs) {
      		switch (property) {
      			// This is the ajax source
      			case 'sajaxsource':
      				options['sAjaxSource'] = attrs[property];
      			break;
      			// This is the ajax data prop. For example, your result might be
      			// {code: 200, data: [ .. ]} -> in the case, sAjaxDataProp is data
      			case 'sajaxdataprop':
      				options['sAjaxDataProp'] = attrs[property];
      			break;
      		}
      	}
      } else {
          // If dtoptions is declare, extend the current options with it. 
          angular.extend(options, $scope[attrs['dtoptions']]);
      }   
    	
    	// Just some basic validation.
    	if (typeof options['sAjaxSource'] === 'undefined') {

    		throw "Ajax Source not defined! Use sajaxsource='/api/v1/blabla'";
    	}


    	// Get the column options, put it in a aocolumn object.
    	// Obviously, mdata is the only one required.
    	// I personally just needed those 3, if you need other more feel free to add it.
    	// mData also accepts a function; I'm sure there's a more elegant way but for now
    	// it detects if it's a function, and if it is, do it.
    	options.aoColumns = [];

    	// Get the thead rows.
    	$elem.find('thead th').each(function() {
    		var colattr = angular.element(this).data();
    		
    		// Detects if it's a function. Must exist in scope.
    		if (colattr.mdata.indexOf("()") > 1) {

    			// Simple one-liner that removes the ending ()
    			var fn = $scope[colattr.mdata.substring(0, colattr.mdata.length - 2)];

    			// Throw an error if it's not a function. 
    			if (typeof fn === 'function') {

    				options.aoColumns.push({
	      			mData: fn,
	      			sClass: colattr.sclass,
	      			bVisible: colattr.bvisible
		      	});

    			} else {

    				throw "mData function does not exist in $scope.";

    			}
    			
    		} else {

    			options.aoColumns.push({
      			mData: colattr.mdata,
      			sClass: colattr.sclass,
      			bVisible: colattr.bvisible,
            sDefaultContent: ''
	      	});	
    		}
    	});

    	// Load the datatable! 
    	$elem.dataTable(options);

      // watch filters
      if ($scope.filters) {
        $.each($scope.filters, function(key, val) {

          // update core settings
          if (key === 'num_result') {
            $scope.$watch('filters.' + key, function(newValue, oldValue) {
              if(newValue !== oldValue){
                // manually change settings
                var oSettings = $elem.dataTable().fnSettings();
                oSettings._iDisplayLength = newValue;

                $elem.dataTable().fnDraw();
              }
            }, true);

            var oSettings = $elem.dataTable().fnSettings();
            oSettings._iDisplayLength = val;
          } else {
            $scope.$watch('filters.' + key, function(newValue, oldValue) {
              if(newValue !== oldValue){
                $elem.dataTable().fnDraw();
              }
            }, true);
          }
        });
      }
    }
  }
});

angular.module('stripe', []).directive('stripeForm', ['$window',
function($window) {
  Stripe.setPublishableKey('pk_test_vrk5vPZBAZgUfHcqZZzfTZHf');
  var directive = { restrict: 'A' };
  directive.link = function($scope, element, attributes) {

    var form = angular.element(element);
    form.bind('submit', function() {
      var button = form.find('button');
      button.prop('disabled', true);
      $window.Stripe.createToken(form[0], function() {
        var args = arguments;
        $scope.$apply(function() {
          $scope[attributes.stripeForm].apply($scope, args);
        });
        button.prop('disabled', false);
      });
    });
  };
  return directive;

}]);
