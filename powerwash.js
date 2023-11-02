function getDeviceId(asset) {
    var optionalArgs = {
      projection: "BASIC",
      query: "asset_id:".concat("", asset),
    };
    var chromebook = AdminDirectory.Chromeosdevices.list(
      "my_customer",
      optionalArgs
    );
    var chromebookDevID = chromebook.chromeosdevices[0].deviceId;
  
    return chromebookDevID;
  }
  
  function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var r = latestResponse.getItemResponses();
    var asset = "";
    const action = {
      Powerwash: "REMOTE_POWERWASH",
      "Erase User Data": "WIPE_USERS",
      "Lock Device": "disable",
      "Unlock Device": "reenable",
    };
  
    for (var i = 0; i < r.length; i++) {
      var q = r[i].getItem().getTitle();
      var a = r[i].getResponse();
  
      if (q == "Enter Asset ID") { asset = a; }
      if (q == "Action") {
        switch (a) {
          case "Lock Device":
          case "Unlock Device":
            updateDevice(action[a], asset);
            break;
          default:
            issueCommand(action[a], asset);
        }
      }
    }
  }
  
  function updateDevice(cmd, id) {
    var deviceId = getDeviceId(id);
  
    let resource = {
      action: cmd,
    };
  
    let customerId = "my_customer";
    AdminDirectory.Chromeosdevices.action(
      resource,
      customerId,
      deviceId
    );
  }
  
  function issueCommand(cmd, id) {
    var deviceId = getDeviceId(id);
  
    let resource = {
      deviceId,
      commandType: cmd,
    };
  
    let customerId = "my_customer";
    AdminDirectory.Customer.Devices.Chromeos.issueCommand(
      resource,
      customerId,
      deviceId
    );
  }
  
