//get browser name and version
// by clement / Lune.xyz

// v1.00 - 22 10 2019


//detect inapp browers:
// https://github.com/f2etw/detect-inapp

/*
ipad ios 12
ios v 12,4,1
userAgent = mozilla/5.0 (ipad; cpu os 12_4_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/12.1.2 mobile/15e148 safari/604.1
*/

/*
new features by version

chrome
53 : mediaDevices.getUserMedia
57 : wasm

safari
11 : mediaDevices.getUserMedia
12.1 : share API ( fore sure ok on ios 12.4.1)
13 : DeviceOrientationEvent

firefox
53 : wasm ( also 52 but 53 is safe )
71 : share API

samsung internet
9.4 : Geolocation API exists but -> always get error "user denied permissio"


*/

//only trust .inApp value to check if link opened in a in app browser

var _browser = {name:getBrowser()[0], version:getBrowser()[1], isWebView:isWebView(), isFacebook:isFacebookApp(), isInstagram:isInstagramApp()};
var inApp = false;
if (isFacebookApp())inApp = true;
if (isInstagramApp())inApp = true;
if (isWebView())inApp = true;
_browser.inApp = inApp;





function getBrowser()
{
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = null;//navigator.appName;
	var fullVersion = null;//''+parseFloat(navigator.appVersion);
	var majorVersion = null;//parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera 15+, the true version is after "OPR/"
	if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+4);
	}
	// In older Opera, the true version is after "Opera" or after "Version"
	else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
	          (verOffset=nAgt.lastIndexOf('/')) )
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	}

	// new by clement 22 10 2019 ( samsungbrowser also include 'chrome' )
	if ((verOffset=nAgt.indexOf("SamsungBrowser"))!=-1) {
	 browserName = "SamsungBrowser";
	 fullVersion = nAgt.substring(verOffset+15);
	}

	if (fullVersion)
	{
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		   fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
		   fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		 fullVersion  = ''+parseFloat(navigator.appVersion);
		 majorVersion = parseInt(navigator.appVersion,10);
		}
	}

	var minorVersion = 0;//may need to include minor version later...

	return [browserName.toLowerCase(), majorVersion, minorVersion];
}

//nothing to catch for Skype Android

function isFacebookApp() {
	var ua = navigator.userAgent;// || navigator.vendor || window.opera;
	return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf("FB_IAB") > -1);
}

function isInstagramApp() {
	var ua = navigator.userAgent;// || navigator.vendor || window.opera;
	return (ua.indexOf('Instagram') > -1);
}

//test on android
// from : https://stackoverflow.com/questions/16383776/detect-in-app-browser-webview-with-php-javascript
// always return false on ios
function isWebView(){
	var ua = navigator.userAgent;// || navigator.vendor || window.opera;
	return (ua.indexOf('wv') > -1);
}
