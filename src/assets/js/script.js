// Main Source for view Map
!function(t,e){if("function"==typeof define&&define.amd)define("SnazzyInfoWindow",["module","exports"],e);else if("undefined"!=typeof exports)e(module,exports);else{var o={exports:{}};e(o,o.exports),t.SnazzyInfoWindow=o.exports}}(this,function(t,e){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function r(t,e){t&&e&&Object.keys(e).forEach(function(o){t[o]=e[o]})}function n(t){var e={};return r(e,g),r(e,t),Object.keys(g).forEach(function(t){var o=g[t];if("object"===("undefined"==typeof o?"undefined":d(o))){var i={};r(i,o),r(i,e[t]),e[t]=i}}),e}function h(t,e){var o=/^(-{0,1}\.{0,1}\d+(\.\d+)?)[\s|\.]*(\w*)$/;if(t&&o.test(t)){var i=o.exec(t),s=i[1],r=i[3]||"px";return{value:1*s,units:r,original:t}}return e?h(e):{original:e}}function p(t,e){if(t){for(;t.firstChild;)t.removeChild(t.firstChild);e&&("string"==typeof e?t.innerHTML=e:t.appendChild(e))}}function a(t){return"top"===t?"bottom":"bottom"===t?"top":"left"===t?"right":"right"===t?"left":t}function l(t){return t.charAt(0).toUpperCase()+t.slice(1)}Object.defineProperty(e,"__esModule",{value:!0});var _=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c="si-",u=1.41421356237,f=.7071067811865474,m={h:"0px",v:"3px",blur:"6px",spread:"0px",color:"#000"},g={position:"top",pointer:!0,openOnMarkerClick:!0,closeOnMapClick:!0,showCloseButton:!0,panOnOpen:!0,edgeOffset:{top:20,right:20,bottom:20,left:20}},v=function(t){function e(t){o(this,e);var s=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));s._html=null,s._opts=n(t),s._callbacks=s._opts.callbacks||{},s._marker=s._opts.marker,s._isOpen=!1,s._listeners=[],google&&s._marker&&s._opts.openOnMarkerClick&&(s._openOnMarkerClickListener=google.maps.event.addListener(s._marker,"click",function(){s.getMap()||s.open()}));var r=s._opts.position;return r&&(r=r.toLowerCase()),"top"!==r&&"bottom"!==r&&"left"!==r&&"right"!==r&&(s._opts.position=g.position),void 0!==s._opts.border&&s._opts.border!==!0||(s._opts.border={}),void 0===s._opts.pointer&&(s._opts.pointer=g.pointer),void 0!==s._opts.shadow&&s._opts.shadow!==!0||(s._opts.shadow={}),s}return s(e,t),_(e,[{key:"activateCallback",value:function(t){var e=this._callbacks[t];return e?e.apply(this):void 0}},{key:"clearListeners",value:function(){google&&(this._listeners&&this._listeners.forEach(function(t){google.maps.event.removeListener(t)}),this._listeners=[])}},{key:"open",value:function(){var t=this.activateCallback("beforeOpen");(void 0===t||t)&&this._marker&&this.setMap(this._marker.getMap())}},{key:"close",value:function(){var t=this.activateCallback("beforeClose");(void 0===t||t)&&(this.clearListeners(),this.setMap(null))}},{key:"destroy",value:function(){this.getMap()&&this.setMap(null),google&&this._openOnMarkerClickListener&&(google.maps.event.removeListener(this._openOnMarkerClickListener),this._openOnMarkerClickListener=null),this.clearListeners()}},{key:"setContent",value:function(t){this._opts.content=t,this._html&&this._html.content&&p(this._html.content,t)}},{key:"getWrapper",value:function(){return this._html?this._html.wrapper:null}},{key:"draw",value:function(){var t=this;if(this._marker&&this._html){var e=this._opts.offset;e&&(e.left&&(this._html.wrapper.style.marginLeft=e.left),e.top&&(this._html.wrapper.style.marginTop=e.top));var o=this._opts.backgroundColor;if(o&&(this._html.contentWrapper.style.backgroundColor=o,this._opts.pointer&&(this._html.pointerBg.style["border"+l(this._opts.position)+"Color"]=o)),this._opts.padding&&(this._html.contentWrapper.style.padding=this._opts.padding,this._opts.shadow&&(this._html.shadowFrame.style.padding=this._opts.padding)),this._opts.borderRadius&&(this._html.contentWrapper.style.borderRadius=this._opts.borderRadius,this._opts.shadow&&(this._html.shadowFrame.style.borderRadius=this._opts.borderRadius)),this._opts.fontSize&&(this._html.wrapper.style.fontSize=this._opts.fontSize),this._opts.fontColor&&(this._html.contentWrapper.style.color=this._opts.fontColor),this._opts.pointer&&this._opts.pointer!==!0&&(this._opts.shadow&&(this._html.shadowPointer.style.width=this._opts.pointer,this._html.shadowPointer.style.height=this._opts.pointer),this._html.pointerBorder&&(this._html.pointerBorder.style.borderWidth=this._opts.pointer),this._html.pointerBg.style.borderWidth=this._opts.pointer),this._opts.border){var i=0;if(void 0!==this._opts.border.width&&(i=h(this._opts.border.width,"0px"),this._html.contentWrapper.style.borderWidth=i.value+i.units),i=Math.round((this._html.contentWrapper.offsetWidth-this._html.contentWrapper.clientWidth)/2),i=h(i+"px","0px"),this._opts.pointer){var s=Math.min(this._html.pointerBorder.offsetHeight,this._html.pointerBorder.offsetWidth);s=h(s+"px","0px");var r=Math.round(i.value*(u-1));r=Math.min(r,s.value),this._html.pointerBg.style.borderWidth=s.value-r+s.units;var n=l(a(this._opts.position));this._html.pointerBg.style["margin"+n]=r+i.units,this._html.pointerBg.style[this._opts.position]=-i.value+i.units}var p=this._opts.border.color;p&&(this._html.contentWrapper.style.borderColor=p,this._html.pointerBorder&&(this._html.pointerBorder.style["border"+l(this._opts.position)+"Color"]=p))}this._opts.shadow&&!function(){var e=t._opts.shadow,o=function(t){var o=e[t];return void 0!==o&&null!=o};(o("h")||o("v")||o("blur")||o("spread")||o("color"))&&!function(){var o=h(e.h,m.h),i=h(e.v,m.v),s=h(e.blur,m.blur),r=h(e.spread,m.spread),n=e.color||m.color,p=function(t,e){return t+" "+e+" "+s.original+" "+r.original+" "+n};t._html.shadowFrame.style.boxShadow=p(o.original,i.original);var a=f*(o.value-i.value)+o.units,l=f*(o.value+i.value)+i.units;t._html.shadowPointerInner.style.boxShadow=p(a,l)}(),t._opts.shadow.opacity&&(t._html.shadowWrapper.style.opacity=t._opts.shadow.opacity)}();var _=this.getProjection().fromLatLngToDivPixel(this._marker.position);this._html.floatWrapper.style.top=Math.floor(_.y)+"px",this._html.floatWrapper.style.left=Math.floor(_.x)+"px",this._isOpen||(this._isOpen=!0,this.resize(),this.reposition(),this.activateCallback("afterOpen"))}}},{key:"onAdd",value:function(){var t=this;if(!this._html){var e=function(t,e){if(t&&e)for(var o=0;o<e.length;o++){var i=e[o];i&&(t.className&&(t.className+=" "),t.className+=c+i)}},o=function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];var s=document.createElement("div");return e(s,o),s};if(this._html={},this._html.wrapper=o("wrapper-"+this._opts.position),this._opts.wrapperClass&&(this._html.wrapper.className+=" "+this._opts.wrapperClass),this._opts.border&&e(this._html.wrapper,["has-border"]),this._opts.shadow&&(this._html.shadowWrapper=o("shadow-wrapper-"+this._opts.position),this._html.shadowFrame=o("frame","shadow-frame"),this._html.shadowWrapper.appendChild(this._html.shadowFrame),this._opts.pointer&&(this._html.shadowPointer=o("shadow-pointer-"+this._opts.position),this._html.shadowPointerInner=o("shadow-inner-pointer-"+this._opts.position),this._html.shadowPointer.appendChild(this._html.shadowPointerInner),this._html.shadowWrapper.appendChild(this._html.shadowPointer)),this._html.wrapper.appendChild(this._html.shadowWrapper)),this._html.contentWrapper=o("frame","content-wrapper"),this._html.content=o("content"),this._opts.content&&p(this._html.content,this._opts.content),this._opts.showCloseButton){if(this._opts.closeButtonMarkup){var i=document.createElement("div");p(i,this._opts.closeButtonMarkup),this._html.closeButton=i.firstChild}else this._html.closeButton=document.createElement("button"),this._html.closeButton.setAttribute("type","button"),this._html.closeButton.innerHTML="&#215;",e(this._html.closeButton,["close-button"]);this._html.contentWrapper.appendChild(this._html.closeButton)}this._html.contentWrapper.appendChild(this._html.content),this._html.wrapper.appendChild(this._html.contentWrapper),this._opts.pointer&&(this._opts.border&&(this._html.pointerBorder=o("pointer-"+this._opts.position,"pointer-border-"+this._opts.position),this._html.wrapper.appendChild(this._html.pointerBorder)),this._html.pointerBg=o("pointer-"+this._opts.position,"pointer-bg-"+this._opts.position),this._html.wrapper.appendChild(this._html.pointerBg)),this._html.floatWrapper=o("float-wrapper"),this._html.floatWrapper.appendChild(this._html.wrapper),this.getPanes().floatPane.appendChild(this._html.floatWrapper);var s=this.getMap();if(this.clearListeners(),this._opts.closeOnMapClick&&this._listeners.push(google.maps.event.addListener(s,"click",function(){t.close()})),google){this._previousWidth=null,this._previousHeight=null,this._listeners.push(google.maps.event.addListener(s,"bounds_changed",function(){var e=s.getDiv(),o=e.offsetWidth,i=e.offsetHeight,r=t._previousWidth,n=t._previousHeight;null!==r&&null!==n&&r===o&&n===i||(t._previousWidth=o,t._previousHeight=i,t.resize())})),this._marker&&this._listeners.push(google.maps.event.addListener(this._marker,"position_changed",function(){t.draw()})),this._opts.showCloseButton&&!this._opts.closeButtonMarkup&&this._listeners.push(google.maps.event.addDomListener(this._html.closeButton,"click",function(e){e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation(),t.close()}));var r=["click","dblclick","rightclick","contextmenu","drag","dragend","dragstart","mousedown","mouseout","mouseover","mouseup","touchstart","touchend","touchmove","wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"];r.forEach(function(e){t._listeners.push(google.maps.event.addDomListener(t._html.wrapper,e,function(t){t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()}))})}this.activateCallback("open")}}},{key:"onRemove",value:function(){if(this.activateCallback("close"),this._html){var t=this._html.floatWrapper.parentElement;t&&t.removeChild(this._html.floatWrapper),this._html=null}this._isOpen=!1,this.activateCallback("afterClose")}},{key:"getMapInnerBounds",value:function(){var t=this.getMap().getDiv().getBoundingClientRect(),e={top:t.top+this._opts.edgeOffset.top,right:t.right-this._opts.edgeOffset.right,bottom:t.bottom-this._opts.edgeOffset.bottom,left:t.left+this._opts.edgeOffset.left};return e.width=e.right-e.left,e.height=e.bottom-e.top,e}},{key:"reposition",value:function(){if(this._opts.panOnOpen&&this._html){var t=this.getMapInnerBounds(),e=this._html.wrapper.getBoundingClientRect(),o=0,i=0;t.left>=e.left?o=e.left-t.left:t.right<=e.right&&(o=e.left-(t.right-e.width)),t.top>=e.top?i=e.top-t.top:t.bottom<=e.bottom&&(i=e.top-(t.bottom-e.height)),0===o&&0===i||this.getMap().panBy(o,i)}}},{key:"resize",value:function(){if(this._html){var t=this.getMapInnerBounds(),e=t.width;void 0!==this._opts.maxWidth&&(e=Math.min(e,this._opts.maxWidth)),e-=this._html.wrapper.offsetWidth-this._html.content.offsetWidth,this._html.content.style.maxWidth=e+"px";var o=t.height;void 0!==this._opts.maxHeight&&(o=Math.min(o,this._opts.maxHeight)),o-=this._html.wrapper.offsetHeight-this._html.content.offsetHeight,this._html.content.style.maxHeight=o+"px"}}}]),e}(google.maps.OverlayView);e.default=v,t.exports=e.default});
//# sourceMappingURL=snazzy-info-window.min.js.map



//end Main 

$(function() {
  // Snazzy Map Style - https://snazzymaps.com/style/6618/cladme
  var mapStyle = [{
    'featureType': 'administrative',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#444444'
    }]
  }, {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [{
      'color': '#f2f2f2'
    }]
  }, {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [{
      'visibility': 'off'
    }]
  }, {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [{
      'saturation': -100
    }, {
      'lightness': 45
    }]
  }, {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [{
      'visibility': 'simplified'
    }]
  }, {
    'featureType': 'road.arterial',
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  }, {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [{
      'visibility': 'off'
    }]
  }, {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [{
      'color': '#4f595d'
    }, {
      'visibility': 'on'
    }]
  }];

  // Create the map
  var map = new google.maps.Map($('.map-canvas')[0], {
    zoom: 10,
    styles: mapStyle,
    center: new google.maps.LatLng(22.3475365, 91.81233240000006)
  });

  // // Add a marker
  // var marker = new google.maps.Marker({
  //     map: map,
  //     position: new google.maps.LatLng(22.3475365, 91.81233240000006)
  // });

  // Custom Marker
  var markerIcon = {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: '#18b0b6',
    fillOpacity: 0.95,
    scale: 3,
    strokeColor: '#ffffff',
    strokeWeight: 3,
    anchor: new google.maps.Point(12, 24)
  };
  var marker = new google.maps.Marker({
    map: map,
    icon: markerIcon,
    position: new google.maps.LatLng(22.3475365, 91.81233240000006)
  });

  // Add a Snazzy Info Window to the marker
  var info = new SnazzyInfoWindow({
    marker: marker,
    content: '<h1>Dhaka, Bangladesh</h1>' +
      '<p>437/1, Dhaka Cantonment</p>' +
      '<hr>' +
      '<em>Dhaka, Bangladesh</em>',
    closeOnMapClick: false
  });
  info.open();
});


 
 