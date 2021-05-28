window.pemcpxExtension = class {
	constructor() {
		this.onAdEvent = this._onAdEvent.bind(this);
	}

	init(adContext){
		this.adContext = adContext;
		this.adContext.addEventListener(tv.freewheel.SDK.EVENT_AD, this.onAdEvent);
	}
	dispose() {
		this.adContext.removeEventListner(tv.freewheel.SDK.EVENT_AD, this.onAdEvent);
		this.adContext = null;
	}

	_onAdEvent(event) {
		if (event.subType === tv.freewheel.SDK.EVENT_AD_CLICK) {
			var adInstance = event.adInstance;
			adInstance.getRendererController().processEvent({name: tv.freewheel.SDK.EVENT_AD_MEASUREMENT, info:{"concreteEventId": "55"}});
		}
	}
};