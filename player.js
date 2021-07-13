var theNetworkId = 57230;
var theServerURL = "https://df8e.v.fwmrm.net/ad/g/1";
var theAdManager = new tv.freewheel.SDK.AdManager();
theAdManager.setNetwork(theNetworkId);
theAdManager.setServer(theServerURL);


var theProfileId = "394455:cpx_test_profile" //Your profile name

var theVideoAssetId = "cpxvideotest"; //Your Video Asset ID

var theSiteSectionId  = "cpxsitess"; //Your site section ID


var theVideoDuration = 500;
theContext = theAdManager.newContext();
theContext.setProfile(theProfileId);
theContext.setVideoAsset(theVideoAssetId,theVideoDuration);
theContext.setSiteSection(theSiteSectionId);


theContext.addTemporalSlot("Pre_Roll Standard", tv.freewheel.SDK.ADUNIT_PREROLL, 0);

prerollSlots = [];
adResponseLoaded = false;

theContext.registerVideoDisplayBase("videoBase");
theContext.addEventListener(tv.freewheel.SDK.EVENT_REQUEST_COMPLETE,onRequestComplete);
theContext.addEventListener(tv.freewheel.SDK.EVENT_SLOT_STARTED, onSlotStarted);
theContext.addEventListener(tv.freewheel.SDK.EVENT_SLOT_ENDED,onSlotEnded);
theContext.addEventListener(tv.freewheel.SDK.EVENT_AD, this.onAdEvent.bind(this));
theContext.setAdVolume(0);

// START CPX JS CODE  
function onAdEvent(event){
    if(event.subType === tv.freewheel.SDK.EVENT_AD_CLICK){
        var adInstance = event.adInstance;
        adInstance.getRendererController().processEvent({name: tv.freewheel.SDK.EVENT_AD_MEASUREMENT, info:{"concreteEventId": "55"}});
    }
}
// END CPX JS CODE  


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