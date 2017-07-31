$('.tokenVesting-createContract').click(function() {
  $.ajax({
    type: "POST",
    url: '/grantVestedToken',
    data: {
      "to": "0x0606c95871e450183c664ea3292af08b580d845d",
      "value": 10,
      "start": 1,
      "cliff": 2,
      "vesting": 20,
      "revokable": true,
      "burnsOnRevoke": true
    },
    success: function (data) {
      console.log('Ok', data);
    },
    error: function () {
      console.log('error');
    }
  });
});

$('.tokenVesting-lastTransferDate').click(function() {
  $.ajax({
    type: "POST",
    url: '/lastTransferDate',
    data: {
      "holder": "0x0606c95871e450183c664ea3292af08b580d845d"
    },
    success: function (data) {
      console.log('Ok', data);
    },
    error: function () {
      console.log('error');
    }
  });
});

$('.tokenVesting-getTokenCount').click(function() {
  $.ajax({
    type: "POST",
    url: '/getTokenCount',
    data: {
      "holder": "0x0606c95871e450183c664ea3292af08b580d845d"
    },
    success: function (data) {
      console.log('Ok', data);
    },
    error: function () {
      console.log('error');
    }
  });
});

$('.tokenVesting-getSpecificGrant').click(function() {
  $.ajax({
    type: "POST",
    url: '/getTokenGrant',
    data: {
      "holder": "0x0606c95871e450183c664ea3292af08b580d845d",
      "index": 1
    },
    success: function (data) {
      console.log('Ok', data);
    },
    error: function () {
      console.log('error');
    }
  });
});