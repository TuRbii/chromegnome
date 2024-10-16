const elementaryou = "/Devices/Chrome Devices/Elementary 1:1";
const middleou = "/Devices/Chrome Devices/Middle School 1:1";
const highou = "/Devices/Chrome Devices/High School 1:1";

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
    "Elementary" : elementaryou,
    "Middle" : middleou,
    "High" : highou,
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
        case "Elementary":
        case "Middle":
        case "High":
          changeOu(action[a], asset);
          Utilities.sleep(5000); 
          issueCommand("WIPE_USERS", asset);
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

  if (!deviceId) {
    Logger.log("No device ID found for asset: " + id);
    return;
  }

  Logger.log("Issuing command '" + cmd + "' for device ID: " + deviceId);

  let resource = {
    commandType: cmd,
    parameters: {},
  };

  let customerId = "my_customer";

  try {
    AdminDirectory.Customer.Devices.Chromeos.issueCommand({
      commandType: cmd,
      deviceId: deviceId,
    }, customerId, deviceId);
    Logger.log("Command issued successfully.");
  } catch (e) {
    Logger.log("Error issuing command: " + e.message);
  }
}

function changeOu(path, id) {
  var deviceId = getDeviceId(id);

  if (!deviceId) {
    Logger.log("No device ID found for asset: " + id);
    return;
  }

  let customerId = "my_customer";

  try {
    AdminDirectory.Chromeosdevices.update({
      orgUnitPath: path,
    }, customerId, deviceId);
    Logger.log("Successfully moved device to OU: " + path);
  } catch (e) {
    Logger.log("Error changing OU for device: " + e.message);
  }
}
