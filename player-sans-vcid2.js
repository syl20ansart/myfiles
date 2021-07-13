var theNetworkId = 516747;
var theServerURL = "https://7e28b.v.fwmrm.net/ad/g/1";
var theAdManager = new tv.freewheel.SDK.AdManager();
theAdManager.setNetwork(theNetworkId);
theAdManager.setServer(theServerURL);

// Working Setup
var theProfileId = "514966:atres_html5_live" //Your profile name
//var theVideoAssetId = "7654321"; //Your Video Asset ID
//var theSiteSectionId  = "TariqSiteSectionLiveTest"; //Your site section ID

//Test Setup
// var theProfileId = "96749:global-js-byPratik" //Your profile name
var theVideoAssetId = "The_Flash_S01_E03"; //Your Video Asset ID
var theSiteSectionId  = "ALPHA_SA_SITESECTION_DESKTOP_1"; //Your site section ID



var theVideoDuration = 500;
theContext = theAdManager.newContext();
theContext.setProfile(theProfileId);
theContext.setVideoAsset(theVideoAssetId,theVideoDuration);
theContext.setSiteSection(theSiteSectionId);
theContext.__proto__.setAdVolume(0.1);
theContext.setParameter(tv.freewheel.SDK.PARAMETER_USE_GDPR_TCFAPI, true, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
theContext.setParameter(tv.freewheel.SDK.PARAMETER_CONSENT_RETRIEVAL_TIMEOUT, 1500, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
theContext.addKeyValue('tototo', 'bar');

theContext.addTemporalSlot("Pre_Roll Standard", tv.freewheel.SDK.ADUNIT_PREROLL, 0);

prerollSlots = [];
adResponseLoaded = false;
//videoEl = document.getElementById('video');
//originalSource=null;
//
//
//// Listen to AdManager Events
theContext.registerVideoDisplayBase("videoBase");
theContext.addEventListener(tv.freewheel.SDK.EVENT_REQUEST_COMPLETE,onRequestComplete);
theContext.addEventListener(tv.freewheel.SDK.EVENT_SLOT_STARTED, onSlotStarted);
theContext.addEventListener(tv.freewheel.SDK.EVENT_SLOT_ENDED,onSlotEnded);

theContext.setAdVolume(0);
//// Submit request
theContext.submitRequest();


function onRequestComplete(event){
	if(event.success){
        //theContext.registerVideoDisplayBase("videoBase");
        adResponseLoaded = true;
        fwTemporalSlots=theContext.getTemporalSlots();
        fwTemporalSlots.forEach(slot => {
            if(slot.getTimePositionClass()==tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL){
                prerollSlots.push(slot);
            }
        });
	}
}

function onSlotStarted(event){
}

function onSlotEnded(event){
    video.play();
}

function playAd(){
    if (prerollSlots.length) {
        slot = prerollSlots.shift();
        slot.play();

    }
    else{
        video.play();
    }
}