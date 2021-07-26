var uprism=function(){"use strict";var r={userId:"",userName:""};function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(t,e){var n,i=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)),i}function i(r){for(var e=1;e<arguments.length;e++){var c=null!=arguments[e]?arguments[e]:{};e%2?t(Object(c),!0).forEach(function(e){var t,n,i;t=r,i=c[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(c)):t(Object(c)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(c,e))})}return r}var n={userId:"",attendance:!1,attendeeIdImage:{register:!1,base64FormatImage:null},examState:!1};var o={state:n,setState:function(e){n.userId=e.userId,n.attendance=e.attendance,n.attendeeIdImage=e.attendeeIdImage,n.examState=e.examState}},a=null;var s={presenterId:"",isInit:!1};function e(e,t,n){npcxg.ChangeCallUserString(e,t,!1,null,n)}function E(e){var t=0<(e.nRight&CXG_CONF_RIGHT_TYPE_PRESENTER),n=s.presenterId;t||t&&s.presenterId!=e.pszID?s.presenterId=e.pszID:(t||s.presenterId!=e.pszID)&&(t||s.presenterId)||(s.presenterId=""),s.isInit&&n==s.presenterId||(a&&a("isExistManager",!!s.presenterId),s.isInit=!0)}var d={init:function(){npcxg.GetCurrentConfInfo().pUserList.forEach(E),e(JSON.stringify({type:"attendance",userId:npcxg.GetMyUserID(),data:!1}),npcxg.GetMyAttdIndex(),function(e){0==e&&o.setState(i(i({},o.state),{},{attendance:!1}))})},changeUserStringInfo:function(e,t){var n=JSON.parse(e);switch(n.type){case"attendance":o.setState(i(i({},o.state),{},{attendance:n.data})),a&&a("attendUser",n.data);break;case"waitingToLeave":a&&a("waitingToLeave",n.data);break;case"kickout":a&&a("kickout",n.data)}},sendCallUserString:e,saveCallUserString:function(e,t,n){npcxg.ChangeCallUserString(JSON.stringify(e),t,!0,{bSaveOnly:!0,bNotifyToOthers:!1,bNotifyToSelf:!1,bNotifyToPresenter:!1,bNotifyToManagers:!1},n)},changePresenterInfo:E,exitPresenter:function(e){e.pszID==s.presenterId&&(u.resetPresenterGroupId(),s.presenterId="",a&&a("isExistManager",!!s.presenterId))},getPresenterId:function(){return s.presenterId}},C={targetId:"",currentGroupId:""};function _(e,t){var n;t&&(n={pszGroupId:t,pszChatMsg:e.message,pszUserID:r.userId,pszUserName:r.userName,pszDisplayName:r.userName,pszRegDate:(new Date).getTime().toString()},npcxg.SendChatMessage(n))}var u={sendChatToPresenter:function(n){var i=d.getPresenterId();if(!i)return"No Presenter";i==C.targetId&&C.currentGroupId?_(n,C.currentGroupId):npcxg.CreateChatWhisper(i,function(e,t){C.currentGroupId=t.Index,C.targetId=i,_(n,C.currentGroupId)})},receiveChat:function(e){e.pszGroupId&&(C.targetId=e.pszUserID,C.currentGroupId=e.pszGroupId);var t={userId:e.pszUserID,userName:e.pszUserName,message:e.pszChatMsg,type:e.pszGroupId?"one":"all"};a&&a("receiveChat",t)},resetPresenterGroupId:function(){C.targetId="",C.currentGroupId=""}},S={deviceCheck:!1,init:!1,npcxgInit:!1,serviceViewCreated:!1,streamCreated:!1,logined:!1,joined:!1,screenSharing:!1};var R,I={login:function(t){return new Promise(function(n,i){var e;S.logined&&n(),npcxg.Login({pszCryptoType:"Aria-128",pszUserId:(e=t).userId,pszPassword:e.userPasswd,pszTID:e.tid,pszExternalCode:e.externalCode,pszSiteCode:e.siteCode?e.siteCode:"uprism",pszAgentType:e.agentType?e.agentType:"Web",bGuest:e.bGuest?1:0,dwTimeout:15e3,pszWSURL:e.mobileServerUrl,pszServerIPAddr:"",nServerPort:"",nCallStyleCode:0,nGatewayServerPort:"",nCallMode:0,pszCallUserString:"",pszSSOCookie:"",pszChannel:"",pszOSDivision:"",pszProductCode:"",pszAccessChannelCode:"",bUseCallStyleCode:0,bAllowDuplicatedLogin:!1,pAlternativeServerList:{nCount:"",pList:[]},nReceivingVideoRes:CMXG_VIDEO_RES.ToCXG("4CIF")},function(e,t){e==CXG_RESULT_SUCCESS?(r.userId=t.pszUserId,r.userName=t.pszUserName,S.logined=!0,n(t)):i(e)})})},join:function(e){return new Promise(function(n,i){S.joined&&n(),npcxg.JoinConf(e.roomNo,e.roomPasswd,function(e,t){e==CXG_RESULT_SUCCESS?(S.joined=!0,npcxg.ReleaseConfUserRight(r.userId,CXG_CONF_RIGHT_TYPE_SPEAKER),n(t)):i(e)})})},getAccessInfo:function(e){return new Promise(function(n,i){$.get("".concat("https://lg.uprism.io:31443","/sdk/conference?roomId=").concat(e.roomId,"&externalCode=").concat(e.externalCode),function(e,t){"success"==t?e?n(e.response):i("invalid parameters"):i("internal server error")})})},logout:function(e){S.logined=!1,a&&a("logout",e),console.error("회의에서 로그아웃 되었습니다. 이유: "+e)},exitConf:function(e){S.joined=!1,a&&a("lefted",e),console.error("회의에서 나가졌습니다. 이유: "+e)}};function l(e,t){try{if(!t.track)return;"video"===t.track.kind&&npcxg.SetAttdVideoStream(e,t.streams[0]),"audio"===t.track.kind&&(R?R.srcObject=t.streams[0]:((R=document.createElement("audio")).id="masterAudio",R.style.position="absolute",R.style.left=-9999,R.style.top=-9999,R.style.width=0,R.style.height=0,R.autoplay=!0,R.srcObject=t.streams[0],document.body.appendChild(R)))}catch(e){console.error(e)}}function p(e,t){"video"===t.track.kind&&npcxg.SetAttdVideoStream(CXG_ATTD_INDEX_COWORK_VIDEO,t.streams[0])}function V(e){console.error(e)}var f={makeVideoConnection:function(i,e){npcxg.SetSelfVideoStream(i),null!=e&&!e||(npcxg.IsRTCVideoP2PEnabled()?npcxg.RenewP2PVideoStreamAll():Rtc.createVideoSenderPeerConnection(i,function n(e,t){"connected"!==t||"chrome"==adapter.browserDetails.browser&&setTimeout(function(e){var t;Rtc.hasPeerConnection(e)&&(null!=(t=npcxg.FindRTCBandwidth(npcxg.GetMyAttdIndex(),CXG_RTC_OFFER_VIDEO_SENDONLY))&&null!=t.Sender&&null!=t.Sender.Video&&0!=t.Sender.Video.nBandwidth||(npcxg.trace(sprintf("VideoSenderConnection [RETRY] [BANDWIDTH IS ZERO] [index=%s]",e)),Rtc.createVideoSenderPeerConnection(i,n).then(Rtc.sendOfferForVideoSenderPeerConnection).catch(V)))},5e3,e),"failed"!==t&&"disconnected"!=t||Rtc.hasPeerConnection(e)&&(npcxg.trace(sprintf("VideoSenderConnection [RETRY] [index=%s, state=%s]",e,t)),Rtc.createVideoSenderPeerConnection(i,n).then(Rtc.sendOfferForVideoSenderPeerConnection).catch(V))}).then(Rtc.sendOfferForVideoSenderPeerConnection).catch(V))},makeAudioConnection:function(e,t){npcxg.IsRTCAudioP2PEnabled()||Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,function n(e,t){"connected"===t&&setTimeout(function(e){var t;Rtc.hasPeerConnection(e)&&(null!=(t=npcxg.FindRTCBandwidth(npcxg.GetMyAttdIndex(),CXG_RTC_OFFER_AUDIO_SENDRECV))&&null!=t.Receiver&&null!=t.Receiver.Audio&&0!=t.Receiver.Audio.nBandwidth||(npcxg.trace(sprintf("AudioConnection [RETRY] [BANDWIDTH IS ZERO] [index=%s]",e)),cmxg.IsSpeakingAvailableRight()?Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,n).then(Rtc.sendOfferForAudioPeerConnection).catch(V):Rtc.createAudioReceiverPeerConnection(Rtc.getSelfAudioStream(),l,n)))},5e3,e),"failed"!==t&&"disconnected"!=t||Rtc.hasPeerConnection(e)&&Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,n).then(Rtc.sendOfferForAudioPeerConnection).catch(V)}).then(Rtc.sendOfferForAudioPeerConnection).catch(V)}},N=document.createElement("video"),g=document.createElement("video"),O=document.createElement("canvas"),m=O.getContext("2d"),T={ID_CARD_CAPTURE:-1,CAMERA_ONLY:0,SCREEN_ONLY:1,PIP_SCREEN:2,PIP_CAMERA:3},h={option:T.PIP_SCREEN,self:null,screen:null,mixing:null},v={ready:!0,frame:15,frameCount:0},G={screenResW:1280,screenResH:720,videoResW:1280,videoResH:960,videoPosX:870,videoPosY:430,videoW:360,videoH:240,screenPosX:750,screenPosY:640,screenW:480,screenH:270};function A(){v.frameCount++%(60/v.frame)==0&&(h.option==T.PIP_SCREEN?(m.drawImage(N,0,0,G.videoResW,G.videoResH),m.drawImage(g,G.screenPosX,G.screenPosY,G.screenW,G.screenH)):h.option==T.PIP_CAMERA&&(m.drawImage(g,0,0,G.screenResW,G.screenResH),m.drawImage(N,G.videoPosX,G.videoPosY,G.videoW,G.videoH))),requestAnimationFrame(A)}function D(){return h.self}function P(){return h.screen}function b(){return h.mixing}function w(e){var t=null;switch(h.option=e){case T.PIP_SCREEN:case T.PIP_CAMERA:h.option==T.PIP_CAMERA?(O.width=G.screenResW,O.height=G.screenResH):h.option==T.PIP_SCREEN&&(O.width=G.videoResW,O.height=G.videoResH),t=b();break;case T.CAMERA_ONLY:t=D();break;case T.SCREEN_ONLY:t=P();break;case T.ID_CARD_CAPTURE:t=null}npcxg.SetSelfVideoStream(t),Rtc.switchSelfVideoStream(t),f.makeVideoConnection(t)}var y={init:function(t){return new Promise(function(e){S.streamCreated&&e(),function(e){N.id="selfVideo",N.style.width="100%",N.style.height="100%",N.autoplay="autoplay",N.srcObject=h.self,e.visibility||(N.style.position="absolute",N.style.left="-9999px");e.parent.appendChild(N)}(t.selfVideo),function(e){g.id="screenShareVideo",g.style.width="100%",g.style.height="100%",g.autoplay="autoplay",g.muted=!0,g.srcObject=h.screen,e.visibility||(g.style.position="absolute",g.style.left="-9999px");e.parent.appendChild(g)}(t.screenShareVideo),function(e){O.id="mixingCanvas",O.width=G.videoResW,O.height=G.videoResH,e.visibility||(O.style.position="absolute",O.style.left="-9999px");e.parent.appendChild(O)}(t.mixingVideo),A(),h.mixing=O.captureStream(),w(T.PIP_SCREEN),S.streamCreated=!0,e()})},getMixingStream:b,getVideoStream:D,getVideoObject:function(){return N},getScreenShareStream:P,setVideoStream:function(e){h.self=e,N.srcObject=e},setScreenShareStream:function(e){h.screen=e,g.srcObject=e},sendStream:w,resendStream:function(){w(h.option)},stopSendingStream:function(){npcxg.SetVideoCamInfo(!1)},restartSendingStream:function(){npcxg.SetVideoCamInfo(!0)},setVideoInputLayout:function(e){w(e)}};var x={requestVoiceChat:function(){return new Promise(function(t,e){var n=npcxg.GetCurrentConfInfo().pUserList.find(function(e){return 0<(e.nRight&CXG_CONF_RIGHT_BIT_PRESENTER)});n?npcxg.RequestVoiceChatting(n.nAttdIndex,function(e){t(0==e?"success":"busy")}):t("No Presenter")})},responseVoiceChat:function(){npcxg.ResponseVoiceChatting(!0)},receiveVoiceChat:function(e){a&&a("receiveVoiceChat",{id:e.pszID,name:e.pszName})},connectedVoiceChat:function(){a&&a("connectedVoiceChat","connected")},disconnectedVoiceChat:function(){a&&a("disconnectedVoiceChat","disconnected")},timeoutVoiceChat:function(){a&&a("timeoutVoiceChat","timeout")}};function F(e,t,n){switch(e){case CXG_SERVICE_EVENT_EVENT_LOG_MONITORED:case CXG_SERVICE_EVENT_CONF_SELF_SPEAKER_CHANGED:case CXG_SERVICE_EVENT_CONF_SPEAKER_CHANGED:case CXG_SERVICE_EVENT_NETWORK_VIDEO_QUALITY_CHANGED:case CXG_SERVICE_EVENT_VIDEO_USER_CLICKED:case CXG_SERVICE_EVENT_MIXING_VIDEO_USER_CLICKED:case CXG_SERVICE_EVENT_PRESENCE_SELF_STATE_CHANGED:case CXG_SERVICE_EVENT_PRESENCE_STATE_CHANGED:case CXG_SERVICE_EVENT_PRESENCE_REQUESTED:break;case CXG_SERVICE_EVENT_SESSION_CLOSED:case CXG_SERVICE_EVENT_CONF_SESSION_CLOSED:I.exitConf("sessionClosed");break;case CXG_SERVICE_EVENT_USER_LOGOUT_BY_RELOGIN:I.logout("relogin");break;case CXG_SERVICE_EVENT_CONF_CLOSE_AFTER_FEW_MINUTE:break;case CXG_SERVICE_EVENT_CONF_CLOSED:I.exitConf("confClosed");break;case CXG_SERVICE_EVENT_CONF_SERVICE_MODE_CHANGED:case CXG_SERVICE_EVENT_CONF_USER_JOINED:break;case CXG_SERVICE_EVENT_CONF_USER_EXITED:d.exitPresenter(t);break;case CXG_SERVICE_EVENT_CONF_USER_EJECTED:I.exitConf("kickout");break;case CXG_SERVICE_EVENT_CONF_FILE_APPENDED:case CXG_SERVICE_EVENT_CONF_FILE_MODIFIED:case CXG_SERVICE_EVENT_CONF_FILE_DELETED:case CXG_SERVICE_EVENT_CONF_FILE_DOWNLOAD_COMPLETED:break;case CXG_SERVICE_EVENT_CONF_USER_INFO_CHANGED:d.changePresenterInfo(t);break;case CXG_SERVICE_EVENT_CONF_INVITED:case CXG_SERVICE_EVENT_CONF_INVITATION_CALLING:case CXG_SERVICE_EVENT_CONF_INVITATION_ACCEPTED:case CXG_SERVICE_EVENT_CONF_INVITATION_ENDED:case CXG_SERVICE_EVENT_CONF_INVITE_TO_USER:case CXG_SERVICE_EVENT_CONF_INVITATION_WAITING_INFO_CHANGED:case CXG_SERVICE_EVENT_CONF_CANCEL_INVITING_TO_USER:case CXG_SERVICE_EVENT_CONF_TIMEOUT_INVITING_TO_USER:case CXG_SERVICE_EVENT_CONF_CUSTOMER_INFO:case CXG_SERVICE_EVENT_CONF_USER_VIDEO_SELECTED:case CXG_SERVICE_EVENT_CONF_USER_VIDEO_UNSELECTED:case CXG_SERVICE_EVENT_CONF_SERVICE_DRAW_MODE_CHANGED:case CXG_SERVICE_EVENT_CONF_SERVICE_MODE_USER_STRING_CHANGED:case CXG_SERVICE_EVENT_CONF_AUTO_LAYOUT_CHANGED:case CXG_SERVICE_EVENT_CONF_VIDEO_LAYOUT_CHANGED:case CXG_SERVICE_EVENT_CONF_VIEW_VIDEO_LAYOUT_CHANGED:case CXG_SERVICE_EVENT_CONF_VIEW_VIDEO_MOUSE_EVENT:case CXG_SERVICE_EVENT_CONF_RTC_VIDEO_LAYOUT_CHANGED:case CXG_SERVICE_EVENT_CONF_RTC_VIEW_VIDEO_LAYOUT_CHANGED:case CXG_SERVICE_EVENT_REMOTE_CONTROL_REQUESTED:case CXG_SERVICE_EVENT_REMOTE_CONTROL_ACCEPTED:case CXG_SERVICE_EVENT_REMOTE_CONTROL_STOPPED:case CXG_SERVICE_EVENT_CONF_COWORK_STARTED:case CXG_SERVICE_EVENT_CONF_COWORK_STOPPED:case CXG_SERVICE_EVENT_CONF_SELF_PRESENTER_CHANGED:case CXG_SERVICE_EVENT_CONF_FILE_MODE_INFO_CHANGED:case CXG_SERVICE_EVENT_CONF_FILE_CONVERT_FAILED:case CXG_SERVICE_EVENT_DOC_NAVIGATION_MODE_CHANGED:case CXG_SERVICE_EVENT_CONF_MEDIA_POSITION_CHANGED:break;case CXG_SERVICE_EVENT_CONF_CHAT_MESSAGE:u.receiveChat(t);break;case CXG_SERVICE_EVENT_CONF_VIDEOCELL_SELECTED:case CXG_SERVICE_EVENT_CONF_CONTROL_REMOTE_VIDEO:case CXG_SERVICE_EVENT_CONF_CONTROL_REMOTE_MEDIA:case CXG_SERVICE_EVENT_TELEWEB_POSTPROCESS_ENDED:case CXG_SERVICE_EVENT_TELEWEB_CALL_ENDED:case CXG_SERVICE_EVENT_TELEWEB_NOT_CONNECTED:case CXG_SERVICE_EVENT_DEVICE_MASTER_MUTE_CHANGED:case CXG_SERVICE_EVENT_DEVICE_SESSION_MUTE_CHANGED:case CXG_SERVICE_EVENT_DEVICE_MIKE_MUTE_CHANGED:case CXG_SERVICE_EVENT_DEVICE_MASTER_VOLUME_CHANGED:case CXG_SERVICE_EVENT_DEVICE_SESSION_VOLUME_CHANGED:case CXG_SERVICE_EVENT_DEVICE_MIKE_VOLUME_CHANGED:case CXG_SERVICE_EVENT_CONF_QUIZ_INFO_CHANGED:case CXG_SERVICE_EVENT_CONF_QUIZ_STATE_CHANGED:case CXG_SERVICE_EVENT_CONF_QUIZ_STAT_INFO_CHANGED:case CXG_SERVICE_EVENT_CONF_PRESENTER_CHANGED:case CXG_SERVICE_EVENT_CONF_FILE_DOWNLOAD_COMPLETED:case CXG_SERVICE_EVENT_CONF_USER_RIGHT_REQUEST_RESULT:case CXG_SERVICE_EVENT_CONF_USER_ACCESS_STATE_CHANGED:case CXG_SERVICE_EVENT_SHARING_CONTENT_SIZE_CHANGED:case CXG_SERVICE_EVENT_CONF_SERVER_RECORDING_STARTED:case CXG_SERVICE_EVENT_CONF_SERVER_RECORDING_PAUSED:case CXG_SERVICE_EVENT_CONF_SERVER_RECORDING_RESUMED:case CXG_SERVICE_EVENT_CONF_SERVER_RECORDING_STOPPED:case CXG_SERVICE_EVENT_CONF_BROADCAST_ONAIR_CHANGED:break;case CXG_SERVICE_EVENT_VIDEO_INPUT_LAYOUT_CHANGED:y.setVideoInputLayout(t.Value);break;case CXG_SERVICE_EVENT_CONF_CALL_USER_STRING_CHANGED:n.nAttdIndex!=npcxg.GetMyAttdIndex()||n.bDB||d.changeUserStringInfo(t,n);break;case CXG_SERVICE_EVENT_CONF_USER_VOICE_CHATTING_REQUESTED:x.receiveVoiceChat(t);break;case CXG_SERVICE_EVENT_CONF_USER_VOICE_CHATTING_TIMEOUT:x.timeoutVoiceChat();break;case CXG_SERVICE_EVENT_CONF_USER_VOICE_CHATTING_CONNECTED:x.connectedVoiceChat();break;case CXG_SERVICE_EVENT_CONF_USER_VOICE_CHATTING_DISCONNECTED:x.disconnectedVoiceChat()}}function U(){}function X(){}function L(e){!function(){Rtc.hasAudioPeerConnection()&&Rtc.destroyAudioPeerConnection();function i(e,t){switch(t){case"connected":npcxg.trace(sprintf("오디오 연결됨 [connected]"));break;case"failed":npcxg.trace(sprintf("오디오 실패함 [failed]"));break;case"disconnected":npcxg.trace(sprintf("오디오 끊어짐 [disconnected]"))}"connected"===t&&setTimeout(function(e){var t,n;Rtc.hasPeerConnection(e)&&(t=!0,null!=(n=npcxg.FindRTCBandwidth(npcxg.GetMyAttdIndex(),CXG_RTC_OFFER_AUDIO_SENDRECV))?CMXGUTIL.IsRTCBandwidthEmpty(n.Sender.Audio)||CMXGUTIL.IsRTCBandwidthEmpty(n.Receiver.Audio)||(t=!1):(n=npcxg.FindRTCBandwidth(npcxg.GetMyAttdIndex(),CXG_RTC_OFFER_AUDIO_RECVONLY),CMXGUTIL.IsRTCBandwidthEmpty(n.Receiver.Audio)||(t=!1)),t&&(npcxg.trace(sprintf("AudioConnection [RETRY] [BANDWIDTH IS ZERO] [index=%s]",e)),npcxg.trace(sprintf("오디오 재 연결중 [retry]")),npcxg.IsSpeakingAvailable()?Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,i).then(Rtc.sendOfferForAudioPeerConnection).catch(se):Rtc.createAudioReceiverPeerConnection(Rtc.getSelfAudioStream(),l,i)))},5e3,e),"failed"!==t&&"disconnected"!=t||Rtc.hasPeerConnection(e)&&(npcxg.trace(sprintf("AudioConnection [RETRY] [index=%s, state=%s]",e,t)),npcxg.trace(sprintf("오디오 재 연결중 [retry]")),n?Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,i).then(Rtc.sendOfferForAudioPeerConnection).catch(se):Rtc.createAudioReceiverPeerConnection(Rtc.getSelfAudioStream(),l,i))}var n=npcxg.IsSpeakingAvailable();npcxg.trace(sprintf("오디오 연결중 [try]")),n?Rtc.createAudioPeerConnection(Rtc.getSelfAudioStream(),l,i).then(Rtc.sendOfferForAudioPeerConnection).catch(se):Rtc.createAudioReceiverPeerConnection(Rtc.getSelfAudioStream(),l,i)}()}function k(){Rtc.destroyAudioPeerConnection()}function M(i,e,r,c,o){Rtc.createVideoReceiverPeerConnection(i,r,c,o,l,function n(e,t){null!=cmxg.m_timerVideoSenderRTCChecking&&(clearTimeout(cmxg.m_timerVideoSenderRTCChecking),cmxg.m_timerVideoSenderRTCChecking=null),"connected"!==t||"chrome"==adapter.browserDetails.browser&&setTimeout(function(e){var t;Rtc.hasPeerConnection(e)&&(null!=(t=npcxg.FindRTCBandwidth(e,CXG_RTC_OFFER_VIDEO_RECVONLY))&&null!=t.Receiver&&null!=t.Receiver.Video&&0!=t.Receiver.Video.nBandwidth||(npcxg.trace(sprintf("VideoReceiverConnection [RETRY] [BANDWIDTH IS ZERO] [index=%s]",e)),Rtc.createVideoReceiverPeerConnection(i,r,c,o,l,n,se)))},1e4,e),"failed"!==t&&"disconnected"!=t||Rtc.hasPeerConnection(e)&&Rtc.createVideoReceiverPeerConnection(i,r,c,o,l,n,se)},se)}function H(e){Rtc.destroyPeerConnection(e),npcxg.ResetAttdVideoStream(e)}function W(e,t,n){Rtc.hasVideoSenderPeerConnection()&&Rtc.destroyVideoSenderPeerConnection();var i;re!=t&&0<t&&(t=Math.floor(t),Rtc.setVideoFrame(t)),ie!=e&&((i={width:"",height:""}).width=CXG_VIDEO_RES.GetVideoWidth(e),i.height=CXG_VIDEO_RES.GetVideoHeight(e),Rtc.setVideoResolution(i)),ce!=n&&Rtc.setDefaultVideoBandwidth(n),ie=e,re=t,ce=n,!1?Rtc.createSelfVideoStream().then(function(e){y.setVideoStream(e),f.makeVideoConnection(Rtc.getSelfVideoStream(),!0),y.resendStream()}).catch(se):f.makeVideoConnection(Rtc.getSelfVideoStream(),!0)}function z(){Rtc.destroyVideoSenderPeerConnection()}function Y(){Rtc.createScreenSharingPeerConnection(Rtc.getScreenSharingStream(),function e(t,n){"failed"!==n&&"disconnected"!=n||Rtc.hasPeerConnection(t)&&Rtc.createScreenSharingPeerConnection(Rtc.getScreenSharingStream(),e).then(Rtc.sendOfferForScreenSharingStream).catch(se)}).then(Rtc.sendOfferForScreenSharingStream).catch(se)}function j(){Rtc.destroyScreenSharingPeerConnection(),npcxg.ResetAttdVideoStream(CXG_ATTD_INDEX_COWORK_VIDEO)}function B(i){Rtc.createPeerConnectionForP2P(i,l,function e(t,n){"failed"!==n&&"disconnected"!=n||Rtc.hasPeerConnection(t)&&Rtc.createPeerConnectionForP2P(i,l,e,se)},se)}function Z(e){Rtc.destroyPeerConnection(e),npcxg.ResetAttdVideoStream(e)}function J(i){Rtc.createScreenSharingOfferPeerConnectionForP2P(i,function e(t,n){"failed"!==n&&"disconnected"!=n||Rtc.hasPeerConnection(t)&&Rtc.createScreenSharingOfferPeerConnectionForP2P(i,e).then(Rtc.sendOfferForScreenSharingStream).then(npcxg.SetAttdVideoStream(CXG_ATTD_INDEX_COWORK_VIDEO,Rtc.getScreenSharingStream())).catch(se)}).then(Rtc.sendOfferForScreenSharingStream).then(npcxg.SetAttdVideoStream(CXG_ATTD_INDEX_COWORK_VIDEO,Rtc.getScreenSharingStream())).catch(se)}function Q(e){Rtc.destroyAttdScreenSharingPeerConnection(e)}function q(e){function t(e,t){"failed"!==t&&"disconnected"!=t||npcxg.trace(sprintf("VideoAnswerP2PConnection [index=%s, state=%s]",e,t))}e.nRTCOffer==CXG_RTC_OFFER_COWORK_SENDONLY?Rtc.receiveOfferToUser(e,p,t,se):Rtc.receiveOfferToUser(e,l,t,se)}function K(e){Rtc.receiveAnswerToUser(e)}function ee(e){"ice"===e.pszDataType&&Rtc.receiveIceToUser(e)}function te(e){console.warn(sprintf("OnEventRTCDataAnswered:\n nFromAttdIndex=%d\n nRTCOffer=%d\n nTargetAttdIndex=%d\n pszDataType=%s\n pszData=%s",e.nFromAttdIndex,e.nRTCOffer,e.nTargetAttdIndex,e.pszDataType,e.pszData))}function ne(e,t,n,i){if(e==npcxg.GetMyAttdIndex())switch(t){case CXG_RTC_OFFER_AV_SENDRECV:case CXG_RTC_OFFER_AUDIO_SENDRECV:}}var ie=0,re=0,ce=0;function oe(e,t,n){var i=!1,r={},n=0;ie!=e&&(r.width=CXG_VIDEO_RES.GetVideoWidth(e),r.height=CXG_VIDEO_RES.GetVideoHeight(e),Rtc.setVideoResolution(r),i=!0),re!=t&&i&&Rtc.setVideoFrame(t),"undefined"!=n&&null!=n||(n=npcxg.GetConfSendingVideoBandwidth()),ce!=n&&(i?Rtc.setDefaultVideoBandwidth(n):Rtc.changeDefaultVideoBandwidth(n)),ie=e,re=t,ce=n}function ae(e,t,n){Rtc.hasScreenSharingPeerConnection()&&Rtc.changeScreenSharingBandwidth(n)}function se(e){console.error(e)}var Ee={init:function(e){e.OnVideoModeChanged=U,e.OnRealVideoModeChanged=X,e.OnNewAudioStream=L,e.OnDeleteAudioStream=k,e.OnNewVideoStream=M,e.OnDeleteVideoStream=H,e.OnNewVideoSenderStream=W,e.OnDeleteVideoSenderStream=z,e.OnNewCoworkStream=Y,e.OnDeleteCoworkStream=j,e.OnNewP2PVideoStream=B,e.OnDeleteP2PVideoStream=Z,e.OnNewP2PCoworkStream=J,e.OnDeleteP2PCoworkStream=Q,e.OnRTCOffered=q,e.OnRTCAnswered=K,e.OnRTCDataOffered=ee,e.OnRTCDataAnswered=te,e.OnAttdRTCStat=ne,e.OnApplySendingVideo=oe,e.OnApplySendingCowork=ae}},de=[],Ce=document.createElement("div");function _e(t){return new Promise(function(e){!function(e){if(S.serviceViewCreated)return;var t=document.createElement("div");t.id="serviceView",t.style.position="relative",t.style.width="100%",t.style.height="100%",de[0]=npcxg.CreateServiceView(t),de[0].SelectConfVideoByRight(CXG_CONF_RIGHT_BIT_PRESENTER),de[0].SetViewReceivingVideoRes(CXG_VIDEO_RES_CIF),e.serviceView.enable&&e.serviceView.parent.appendChild(t);Ce.id="selfServiceView",Ce.style.position="absolute",Ce.style.left="-9999px",Ce.style.top="-9999px",de[1]=npcxg.CreateVideoView(Ce),de[1].SelectConfSelfVideo(),S.serviceViewCreated=!0}(t),e()})}function ue(){return new Promise(function(e){var t={iceServers:Se(npcxg.GetIceServers(),"all")},n={iceServers:Se(npcxg.GetIceServers(),"audio")},i={iceServers:Se(npcxg.GetIceServers(),"video")};Rtc.create({service:npcxg,enableLog:!0,iceServers:t,iceAudioServers:n,iceVideoServers:i,pcConstraints:{optional:[{dtlsSrtpKeyAgreement:!0},{rtpDataChannels:!1},{googIPv6:!0}]},offerConstraints:{mozDontOfferDataChannel:!0}}).catch(V),e()})}function Se(e,t){for(var n=[],i=0;i<e.length;i++){var r=!1,c=default_param(e[i].IceServer.SupportMedia,"all");"all"!=t&&("audio"!=t||"all"!=c&&"audio"!=c)&&("video"!=t||"all"!=c&&"video"!=c)||(r=!0),r&&n.push({urls:e[i].IceServer.Urls,credential:e[i].IceServer.Credential,username:e[i].IceServer.Username})}return n}document.body.appendChild(Ce);var Re="",Ie={audio:!1,width:0,height:0,frame:"auto",bandwidth:0};function le(){return new Promise(function(t,e){Rtc.destroyScreenSharingStream(),Rtc.createScreenSharingStream(Re,Ie).then(pe).then(function(e){y.setScreenShareStream(e),S.screenSharing=!0,t()}).catch(e)})}function pe(e){return e.getVideoTracks()[0].addEventListener("ended",function(){S.screenSharing=!1,le()}),e}var Ve={startScreenShare:function(){return new Promise(function(t,e){var n;S.screenSharing&&t(),n=cmxg.GetSendingCoworkRes(),Ie.width=CXG_VIDEO_RES.GetVideoWidth(n),Ie.height=CXG_VIDEO_RES.GetVideoHeight(n),Ie.frame=cmxg.GetSendingCoworkFrame(),Ie.bandwidth=cmxg.GetSendingCoworkBandwidth(),Rtc.createScreenSharingStream(Re,Ie).then(pe).then(function(e){y.setScreenShareStream(e),S.screenSharing=!0,t()}).catch(e)})},restartScreenShare:le},fe={video:null,audio:null,volumeChangeCallback:null};var Ne={init:function(e){return new Promise(function(t,n){(S.deviceCheck||S.init)&&n("initialized"),e&&(fe.video=e.video,fe.audio=e.audio,fe.volumeChangeCallback=e.volumeChangeCallback),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(Rtc.createSelfAudioStream).then(function(e){fe.volumeChangeCallback&&Rtc.getSoundMeter("instant",fe.volumeChangeCallback)}).then(Rtc.createSelfVideoStream).then(function(e){fe.video&&(fe.video.autoplay="autoplay",fe.video.srcObject=e),S.deviceCheck=!0,t(e)}).catch(function(e){console.error(e),n(e)})})},getDeviceList:function(){return Rtc.findDevices()},getVideoDeviceList:function(){return Rtc.findDevices().then(function(e){return e.videoinput})},getAudioInputDeviceList:function(){return Rtc.findDevices().then(function(e){return e.audioinput})},getAudioOutputDeviceList:function(){return Rtc.findDevices().then(function(e){return e.audiooutput})},setVideoDevice:function(e){Rtc.switchSelfVideoStream(y.getVideoStream()),Rtc.changeVideoDevice(e).then(function(e){S.init?(y.setVideoStream(e),y.resendStream()):fe.video.srcObject=e})},setAudioInputDevice:function(e){Rtc.changeAudioInputDevice(e).then(function(e){S.init||fe.volumeChangeCallback&&Rtc.getSoundMeter("instant",fe.volumeChangeCallback)})},setAudioOutputDevice:function(e,t){S.init&&(e=document.getElementById("masterAudio")),e.setSinkId(t)}},ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1OUYxRTk0QUIyQzJFNzExQUQ3N0M2MDE1MzUzMkVENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RUM3QUEwNkQ1MzYxMUU5OTNBRUQ2OTA2Q0YyRDY0RiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RUM3QUEwNUQ1MzYxMUU5OTNBRUQ2OTA2Q0YyRDY0RiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTZENTQ0NDMxRDVFOTExOTc2QzhDNDc5OTYwMUZBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1OUYxRTk0QUIyQzJFNzExQUQ3N0M2MDE1MzUzMkVENiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phwdp5AAAANoSURBVHjaxFZNSBtREJ5NQiQ0EEkJ/tBCSqs9CKJWKjlIIMFibQkEUotFELxVD/WkYMGDFz3oQYRcAh5NEUE9lJYGwRKxEALpRRD8ibTBIKT5kdoUaXydeewLa2pDsgntwMfu2337vvfNzJtZCQAsCDciwBiLwj+yVwgmYwfxEmEu9ePx8fH8PW66JGhw7kfFGjaEFxFHbCBcCH21VRLp54aGhl8Fz/Uy4UZtbe1PeSO2apJCPB73KR+6XC4IhUIwNjYGNTU1kuzyHRnmapE/EXEdHh5mp6en7Pz8PI/19XWGii/lOWGEqZKY6iYnJ2n+J6/Xy+rr66XFxcU/dtTT0wMGgyGXTqd1OHyA2EQ4ERnV7kVL4oL+vb092N3dzb9MpVKwtLTEkc1mtXV1dTmn03kgE39QKlZrL8hD09PTebfOzMwwxXFiLS0t7OzsjA0ODorxd3Tv7bLdqyB9r9VquaqLiwtob2+HWCzGX6DrobW1FaxWK9AcGudyOfD7/TfQM6s45ZFaV5O9USoTCAQCVxKLQIoHBgaURcVUqtJCMyDe0UJ6vZ51dnYmEAwVc6Kuri7mdrsZxjpPbLfbowpio1q1BjlJWHd391daWKjD88uVYTZfIe7v72dVJSZlgjiRSHDC64g9Hs9/Jw6qJsbCYS6XmEKiIDaoIb1CrIxxMWLaoGpimVSVq3t7e9URK0gF8Wapivf39xkWEkG8VTJxAWnZxM3NzT8URWZL/BBoygxzFvG0o6MjFQwGbw0NDfFyiB2ISiLvRli9eCkly2QyeovFckn9Gc2OmFKjVJnVm9fFmFrk0dERW1lZ4QqpYtHzpqYm4e77GpVnOCkUr62tgcPh+HZycsIVk/pwOAwjIyOApRRmZ2et9HxiYoJ7Bc2hq6AVZjFD7+H1AEluohIgUA9GZWA0GsHn8/HuRIa9WHxn0lTYg5NE3NbWlqYBZiyYTCaudnt7G7BC5SeSetm+VErKifv6+u6KX9nGxsbY/Pw8Vy3s8PAQFhYW6D+LYvpWh42Z/W215eVlfqXmTXZ8fCwVifFjaouY1XabzQajo6P8u0gkAnNzc5Ro9O0zSmqpGGmhRaNRqdh7SZLoHE5hlr6Wk4ab2Wy+TCaTz/F2lc+7rpOrNSQVt3cQD+V/ZGryIdkb3H4LMAC96wlpD4H6jgAAAABJRU5ErkJggg==";var Oe,me,Te=function(){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=document.body;this.bodyObject=e.bodyObject,t.append(e.bodyObject),this.attachEventListener(e.bodyObject),this.onClose=e.onClose}var e,t,i;return e=n,(t=[{key:"attachEventListener",value:function(){var e=this;this.bodyObject.querySelector(".xi-close-thin").addEventListener("click",function(){e.onClose&&e.onClose(),e.close()})}},{key:"open",value:function(){this.bodyObject.style.display="block"}},{key:"close",value:function(){this.bodyObject.style.display="none"}}])&&c(e.prototype,t),i&&c(e,i),n}(),he={makePopup:function(e){return new Te(e)}},ve={isMade:!1,captureState:"ready",captureImage:null,drawState:"ready"},Ge={canvas:null,context:null},Ae={width:630,height:350};function De(){var e;ve.isMade||((e=document.createElement("div")).className="idcard_check_popup",e.innerHTML='\n            <i class="xi-close-thin"></i>\n            <div class="camBox">\n                <canvas id="idCardCanvas" width="'.concat(Ae.width,'" height="').concat(Ae.height,'"></canvas>\n            </div>\n            <div class="btn_wrap uprism_popup_footer_step1 uprism_popup_footer_step_active">\n                <div class="shoot_btn">캡쳐</div>\n            </div>\n            <div class="btn_wrap uprism_popup_footer_step2">\n                <div class="regis_btn">등록</div>\n                <div class="reshoot_btn">재촬영</div>\n                <div class="masking_btn">마스킹</div>\n                <div class="masking_del_btn">마스킹 지우기</div>\n            </div>\n    '),Ge.canvas=e.querySelector("#idCardCanvas"),Ge.context=Ge.canvas.getContext("2d"),function(e){e.querySelector(".shoot_btn").addEventListener("click",ye),e.querySelector(".masking_btn").addEventListener("click",xe),e.querySelector(".masking_del_btn").addEventListener("click",Le),e.querySelector(".reshoot_btn").addEventListener("click",ke),e.querySelector(".regis_btn").addEventListener("click",Me)}(e),Oe=e,me=he.makePopup({bodyObject:Oe,onClose:Pe,closeButton:!0}),ve.isMade=!0)}function Pe(){me.close(),y.restartSendingStream()}function be(e){1==e?(Oe.querySelector(".uprism_popup_footer_step2").classList.remove("uprism_popup_footer_step_active"),Oe.querySelector(".uprism_popup_footer_step1").classList.add("uprism_popup_footer_step_active")):2==e&&(Oe.querySelector(".uprism_popup_footer_step1").classList.remove("uprism_popup_footer_step_active"),Oe.querySelector(".uprism_popup_footer_step2").classList.add("uprism_popup_footer_step_active"))}function we(){"start"==ve.captureState&&(Ge.context.drawImage(y.getVideoObject(),0,0,Ae.width,Ae.height),requestAnimationFrame(we))}function ye(){ve.captureState="captured",ve.captureImage=Ge.canvas.toDataURL("image/jpeg",.3),be(2)}function xe(){"captured"==ve.captureState&&(Ge.context.lineWidth=25,Ge.context.strokeStyle="black",Ge.canvas.addEventListener("mousedown",Fe),Ge.canvas.addEventListener("mouseup",Ue),Ge.canvas.addEventListener("mousemove",Xe),Ge.canvas.style.cursor="url(".concat(ge,"), auto"),ve.captureState="drawing")}function Fe(e){ve.drawState="start",Ge.context.beginPath(e.offsetX,e.offsetY)}function Ue(e){ve.drawState="ready",Ge.context.closePath()}function Xe(e){"start"==ve.drawState&&(Ge.context.lineCap="round",Ge.context.lineTo(e.offsetX,e.offsetY),Ge.context.stroke())}function Le(){var e=document.createElement("img");e.src=ve.captureImage,e.onload=function(){Ge.context.drawImage(e,0,0),Ge.canvas.removeEventListener("mousedown",Fe),Ge.canvas.removeEventListener("mouseup",Ue),Ge.canvas.removeEventListener("mousemove",Xe),Ge.canvas.style.cursor="default",ve.captureState="captured"}}function ke(){be(1),ve.captureState="start",we()}function Me(){var t=Ge.canvas.toDataURL("image/jpeg",.3);d.sendCallUserString(JSON.stringify({type:"attendeeIdImage",userId:npcxg.GetMyUserID(),data:t}),npcxg.GetMyAttdIndex(),function(e){0==e&&(o.setState(i(i({},o.state),{},{userId:npcxg.GetMyUserID(),attendeeIdImage:{register:!0,base64FormatImage:t}})),d.saveCallUserString(o.state,npcxg.GetMyAttdIndex(),function(e){}))}),a&&a("registerIdCard",t)}var He={openIdCardPopup:function(){De(),ve.captureState="start",y.stopSendingStream(),me.open(),we(),be(1)},closeIdCardPopup:Pe};var We={moveElement:function(e,t){t.appendChild(e.childNodes[0])}};var ze={changeExamState:function(t){d.sendCallUserString(JSON.stringify({type:"examState",userId:npcxg.GetMyUserID(),data:t}),npcxg.GetMyAttdIndex(),function(e){0==e&&d.saveCallUserString(o.setState(i(i({},o.state),{},{examState:t})),npcxg.GetMyAttdIndex(),function(e){})})}},Ye={accessInfo:{roomId:"",externalCode:""},serviceView:{enable:!0,defaultView:"presenter",parent:window.document.getElementById("service")},selfVideo:{visibility:!0,parent:window.document.getElementById("self")},screenShareVideo:{visibility:!0,parent:window.document.getElementById("screen")},mixingVideo:{visibility:!0,parent:window.document.getElementById("mixing")}},je={userId:"",userPasswd:"",tid:"",externalCode:"",mobileServerUrl:"",siteCode:"",agentType:""},Be={roomNo:0,roomPasswd:null};return new Promise(function(e){S.npcxgInit&&e(),new NPCXG,npcxg.OnServiceEvent=F,Ee.init(npcxg),npcxg.Create(),npcxg.EnableMultiStream(!0),S.npcxgInit=!0,e()}),{init:function(n){return S.init?new Promise(function(e){e("initialized")}):(S.init=!0,new Promise(function(e,t){var i=Object.assign(Ye,n);I.getAccessInfo(i.accessInfo).then(function(e){je.externalCode=e.externalCode,je.mobileServerUrl=e.mobileServerAddr,Be.roomNo=e.roomNo,Be.roomPasswd=e.roomPasswd}).then(function(){return _e(i)}).then(function(){return e=je,I.login(e);var e}).then(function(){return n=Be,new Promise(function(e,t){new Promise(function(t){navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(function(){Rtc.setVideoResolution({width:640,height:480}),Rtc.createSelfAudioStream().then(Rtc.createSelfVideoStream).then(function(e){y.setVideoStream(e),npcxg.SetVideoCamInfo(!0),t()})})}).then(ue).then(function(){return I.join(n)}).then(e).catch(t)});var n}).then(function(){return n=i,new Promise(function(e,t){y.init(n),e(),Ve.startScreenShare().then(function(){return y.init(n)}).then(e).catch(function(){y.init(n),e()}),d.init()});var n}).then(function(){e("init success")}).catch(function(e){if(console.error(e),S.init=!1,"number"==typeof e)switch(e){case CXG_RESULT_INTERNAL_ERROR:e="internal mobile server error";break;case CXG_RESULT_NOT_FOUND:e="conf server not found";break;case CXG_RESULT_LICENSE_CON_CONF_EXCEEDED:case CXG_RESULT_LICENSE_CON_USER_EXCEEDED:case CXG_RESULT_LICENSE_MAX_ACCOUNT_EXCEEDED:e="license exceeded"}t(e)})}))},device:Ne,share:{restartScreenShare:Ve.restartScreenShare},id:He,sendStream:y.sendStream,addEventCallback:function(e){a=e},chat:{sendChat:u.sendChatToPresenter},view:We,exam:ze,voiceChat:{request:x.requestVoiceChat,response:x.responseVoiceChat}}}();