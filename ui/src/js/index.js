$('.tokenVesting-createContract').click(function() {
  $.ajax({
    type: "POST",
    url: '/grantVestedToken',
    data: {
      "to": "0x7838648829eef73ada65a1659f7259ed414e22a2",
      "value": 100,
      "start": 1,
      "cliff": 10,
      "vesting": 200,
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
