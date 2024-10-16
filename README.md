# ChromeGnome
The name comes from the original implementation of this. I tossed an image of one of my WoW characters as the Google Form image which was a gnome warlock. 
![screen41](https://github.com/TuRbii/chromegnome/assets/16769806/31746630-0136-4fbb-8213-c9d6aea768f0)


This is a Google Apps Script to powerwash, erase user data, lock, or unlock a chromebook. This utilizes Admin SDK API directory_v1, with a Google Form and Apps Script. 
If you would like to use this, you should create a Google form matching the one I've shown here. 
The script can now change a device's OU. To use this feature you'll need to add options to the action menu in the form.
For us we use the OU names "Elementary 1:1, Middle School 1:1, and High School 1:1". Take a look at the script and modify the OU paths and names to match your organization.

![screen206](https://github.com/user-attachments/assets/bce2dec7-ddbd-466a-9cd2-df4cd27d1965)


The script looks for the questions from the form, so make sure you have them typed exactly as shown, or edit the script to match your form.
```if (q == "Enter Asset ID") { asset = a; }
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
```
## Settings

Trigger settings:
Choose which function to run - onSubmit  

Which runs at deployment - Head  

Select event source - From form  

Select event type - On form submit  


Make sure to click to add a service and choose the AdminDirectory SDK directory_v1.


