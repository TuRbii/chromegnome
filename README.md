# ChromeGnome

Apps Script to powerwash, erase user data, lock, or unlock a chromebook. This utilizes Admin SDK API directory_v1, with a Google Form and Apps Script. 
If you would like to use this, you should create a Google form matching the one I've shown here. 

![screen40](https://github.com/TuRbii/powerwash/assets/16769806/464bf710-c1ca-4980-b671-e626531550af)


The script looks for the questions from the form, so make sure you have them typed exactly as shown, or edit the script to match your form.
```{ switch (q) {
      case "Enter Asset ID":
        asset = a;
        break;
      case "Action":
      }
```
## Settings

Trigger settings:
Choose which function to run - onSubmit  

Which runs at deployment - Head  

Select event source - From form  

Select event type - On form submit  


Make sure to click to add a service and choose the AdminDirectory SDK directory_v1.


