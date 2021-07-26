var Ext	= Ext || (function() {
	'use strict';
	
	var module;
	
	const _EXT_FIREFOX_DOWNLOAD_URL				= 'https://addons.mozilla.org/firefox/addon/uprism-screen-shot';//파이어폭스 스토어에 올라가있는 앱의 URL
	const _EXT_CHROME_DEFAULT_ID				= 'oepgnogijokngdeephjhlkigilekhodh'; //크롬 스토어에 올라가있는 앱의 고유 ID
	const _EXT_CHROME_DEFAULT_ID_DEV			= 'oepgnogijokngdeephjhlkigilekhodh'; //크롬 스토어에 올라가있는 앱의 고유 ID
//	const _EXT_CHROME_DEFAULT_ID_DEV			= 'dpneofhafgpaiihmndppfkmdkoghjcmp'; // 개발 서버용 
	
	const _EXT_DIRECTION_FROM_CONTENT_SCRIPT	= 'from-content-script';
	const _EXT_DIRECTION_FROM_PAGE_SCRIPT		= 'from-page-script';
	
	const _EXT_RESULT_MSG_INSTALLED				= 'curix-extension-installed';
	const _EXT_RESULT_MSG_LOADED				= 'curix-extension-loaded';
	
	const _EXT_RESULT_SUCCESS					= 'success';
	const _EXT_RESULT_ERROR_NOT_INSTALLED		= 'not-installed';
	const _EXT_RESULT_ERROR_DISABLED			= 'installed-disabled';
	const _EXT_RESULT_ERROR_NOT_CHROME			= 'not-chrome';
	
	const _BROWSER_CHROME						= 'chrome';
	const _BROWSER_FIREFOX						= 'firefox';
	const _BROWSER_OTHER						= 'other';

	var	_extId							= '';
	var	_disabledTimeOut				= null;
	var _hasExt							= false;
	var _callbacks						= {};
	var _browser						= _BROWSER_OTHER; 
	var _isDev							= (location.href.indexOf('devcloud.uprism.com') > 0) ? true : false;
	
	var _init,
		_onMessageCallback,
		_sendMsgToExt,
		_isInstalled,
		_downloadExt,		
		_getSourceId,		// 확장프로그램을 통해 공유할 화면이나 window ID 가져옴
		_getStatus,			// 확장프로그램 상태
		_getScreenShotUrl,
		_getInternalExtId,
		_getRecordingSourceId, // 2019.03.22 추가 로컬 녹화 관련
		_getExternalHtml;  

	/**
	 * @name   : _init
	 * @date   : 2017. 09. 15.
	 * @author : lhk0023
	 * @todo   : 화면공유 플러그인 이벤트 컬백 이벤트 등록
	 */	
	_init	= function(extId) {
		
		if (adapter.browserDetails.browser === _BROWSER_CHROME) {
			_browser	= _BROWSER_CHROME
		}
		else if (adapter.browserDetails.browser === _BROWSER_FIREFOX) {
			_browser	= _BROWSER_FIREFOX
		}
		
		window.addEventListener('message', function(event) {

			if (event.origin != window.location.origin || (!event.data.direction || event.data.direction != _EXT_DIRECTION_FROM_CONTENT_SCRIPT)) {
		        return;
		    }
			
		    _onMessageCallback(event.data);
		});
		
		_getInternalExtId(function(result) {
			
			//설치되지 않았을경우 리턴
			if (result && result === _EXT_RESULT_ERROR_NOT_INSTALLED)
				return;
			
			if (result) {
				
				_extId	= result;
				_getStatus(function(){});
			}
		});
	};
	
	/**
	 * @name   : _onMessageCallback
	 * @date   : 2017. 11. 08.
	 * @author : lhk0023
	 * @todo   : 화면캡쳐 플러그인 이벤트 컬백 이벤트 등록
	 */		
	_onMessageCallback	= function(data) {
		
		if (!data.idx) {
			
			if (data.msg === _EXT_RESULT_MSG_INSTALLED) {
				
//				if (_hasExt) {
//					location.reload();
//					return;
//				}
				
				_getInternalExtId(function(result) {
					
					_extId	= result;
					_getStatus(function(){});
				});
			}
		}		
		else if (_callbacks[data.idx]) {
			_callbacks[data.idx](data.msg);
			delete _callbacks[data.idx];
		}
	};	
	
	/**
	 * @name   : _sendMsgToExt
	 * @date   : 2017. 11. 08.
	 * @author : lhk0023
	 * @todo   : 플러그인 메시지 보내는 기능
	 */		
	_sendMsgToExt	= function(msg, callback) {
		
		var	idx		= Math.random().toString(36).substr(2, 10);
		
		_callbacks[idx]	= callback;
		msg.idx			= idx;
		msg.direction	= _EXT_DIRECTION_FROM_PAGE_SCRIPT;
		
		window.postMessage(msg, '*');
	};	
	
	/**
	 * @name   : _isInstalled
	 * @date   : 2017. 11. 06.
	 * @author : lhk0023
	 * @todo   : 설치 상태 리턴
	 */	
	_isInstalled	= function() {
		return _hasExt;
	}

	/**
	 * @name   : _downloadExt
	 * @date   : 2017. 11. 06.
	 * @author : lhk0023
	 * @todo   : 플러그인 다운로드
	 */	
	_downloadExt	= function() {
		
		var chromeId =  _EXT_CHROME_DEFAULT_ID;
		if(_isDev)
		{
			chromeId =  _EXT_CHROME_DEFAULT_ID_DEV;
		}
		
		if (_browser === _BROWSER_CHROME) {
			if (chrome.webstore)
				chrome.webstore.install('https://chrome.google.com/webstore/detail/' + chromeId, function() {}, function(e){if (npcxg.debug){console.log(e)}});
			else {
				window.open('https://chrome.google.com/webstore/detail/' + chromeId, '_blank');
			}
		}
		else if (_browser === _BROWSER_FIREFOX) {
			window.open(_EXT_FIREFOX_DOWNLOAD_URL, '_black');
		}
		
	};

	/**
	 * @name   : _getSourceId
	 * @date   : 2017. 08. 21.
	 * @author : lhk0023
	 * @todo   : 화면공유 대상 id 확인
	 */
	_getSourceId	= function(sharingType, callback) {
		
		if (!_browser === _BROWSER_CHROME) {
			callback(_EXT_RESULT_ERROR_NOT_CHROME);
		}
		
		if (!callback) throw '"callback" parameter is mandatory.';
	
    	_sendMsgToExt({type: 'screen-sharing', msg: sharingType ? 'get-sourceId-' + sharingType : 'get-sourceId'}, callback);		
	};


	/**
	 * @name   : _getRecordingSourceId
	 * @date   : 2019. 03. 22.
	 * @author : ssj
	 * @todo   : 로컬 녹화 대상 id 확인
	 */
	_getRecordingSourceId	= function(recordingType, callback) {
		
		if (!_browser === _BROWSER_CHROME) {
			callback(_EXT_RESULT_ERROR_NOT_CHROME);
		}
		
		if (!callback) throw '"callback" parameter is mandatory.';
		
		_sendMsgToExt({type: 'local-recording', msg: recordingType ? 'get-sourceId-' + recordingType : 'get-sourceId'}, callback);		
	};

	
	/**
	 * @name   : _getStatus
	 * @date   : 2017. 08. 21.
	 * @author : lhk0023
	 * @todo   : 화면공유 플러그인 사용 여부
	 */	
	_getStatus	= function(callback) {
		
		var	extId			= _extId;
	    var image			= null;

		if (!extId) {
		    callback(_EXT_RESULT_ERROR_NOT_INSTALLED);
		    return;
	    }
	
	    image			= document.createElement('img');
	    image.src		= extId + 'icon.png';
	    
	    image.onload	= function() {
	    
	    	var	resultCallback	= function(result) {
	    		
	    		if (result === _EXT_RESULT_MSG_LOADED) {
	    			//걸어놓은 timeout 삭제
	    			if (_disabledTimeOut) {
	    				clearTimeout(_disabledTimeOut);
	    				_disabledTimeOut	= null;
	    			}
	    			
	    			callback(_EXT_RESULT_SUCCESS);
	    		}
	    	};
	    	
	    	//익스텐션 존재
    		_hasExt		= true;
	      	_disabledTimeOut	= setTimeout(() => callback(_EXT_RESULT_ERROR_DISABLED), 1000); 
	      	
	      	_sendMsgToExt({type: 'ext', msg: 'are-you-there'}, resultCallback);
	    };
	    
	    image.onerror = function() {
	    	
	    	_hasExt	= false;
	        callback(_EXT_RESULT_ERROR_NOT_INSTALLED);
	    };
	    
	};

	/**
	 * @name   : _getInternalExtId
	 * @date   : 2017. 11. 17.
	 * @author : lhk0023
	 * @todo   : 익스텐션 id 가져옴
	 */
	_getInternalExtId	= function(callback) {
		
		var	resultCallback	= function(result) {
	    	
    		if (result) {
    			//걸어놓은 timeout 삭제
    			if (_disabledTimeOut) {
    				clearTimeout(_disabledTimeOut);
    				_disabledTimeOut	= null;
    			}

    			callback(result);
    		}
    	};
	
    	_disabledTimeOut	= setTimeout(() => callback(_EXT_RESULT_ERROR_NOT_INSTALLED), 1000);
		
    	_sendMsgToExt({type: 'ext', msg: 'get-id'}, resultCallback);
	};
	
	
	/**
	 * @name   : _getScreenShotUrl
	 * @date   : 2017. 09. 18.
	 * @author : lhk0023
	 * @todo   : 스크린샷 캡쳐
	 */	
	_getScreenShotUrl	= function(callback, errCallback) {
		
		_getStatus( result => {
			//설치가 되어 있고 사용가능하다면
			if (result === _EXT_RESULT_SUCCESS) {
				_sendMsgToExt({type: 'screen-capture'}, callback);
			}
			else {
				errCallback(result);
			}
		});
		
	};
	
	/**
	 * @name   : _getExternalHtml
	 * @date   : 2019. 10. 10.
	 * @author : ekim
	 * @todo   : 외부 html 가져오기
	 */
	_getExternalHtml	= function(callback) {
		
		if (!_browser === _BROWSER_CHROME) {
			callback(_EXT_RESULT_ERROR_NOT_CHROME);
		}
		
		if (!callback) throw '"callback" parameter is mandatory.';
		
		_sendMsgToExt({type: 'web-capture'}, callback);		
	};
	
	module	= {
		init					: _init,
		downloadExt				: _downloadExt,
		getStatus				: _getStatus,			// 확장프로그램 상태
		getSourceId				: _getSourceId,			// 확장프로그램을 통해 공유할 화면이나 window ID 가져옴
		getScreenShotUrl		: _getScreenShotUrl,
		isInstalled				: _isInstalled,
		getRecordingSourceId	: _getRecordingSourceId, // 로컬 녹화 ID 확인 
		getExternalHtml			: _getExternalHtml
	};
	
	return module;
}());
