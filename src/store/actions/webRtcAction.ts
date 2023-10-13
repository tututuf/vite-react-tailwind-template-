import { AppDispatch, AppSelector } from '..';
import { setSendChannel } from '../reducers/webRtcReducer';

export const initLocalConnectionAsync = () => {
  return (dispatch: AppDispatch, getState: AppSelector) => {
    const state = getState();
    const handleSendChannelStatusChange = () => {
      if (state.webRtc.sendChannel) {
        const readyState = state.webRtc.sendChannel?.readyState;
        if (readyState === 'open') {
          console.log('i m open');
        } else {
          console.log('i m ', readyState);
        }
      }
    };
    dispatch(
      setSendChannel(
        state.webRtc.localConnection.createDataChannel('sendChannel')
      )
    );
    if (!state.webRtc.sendChannel) return;
    state.webRtc.sendChannel.onopen = handleSendChannelStatusChange;
    state.webRtc.sendChannel.onclose = handleSendChannelStatusChange;
  };
};

export const setLocalIceCandidateAsync = () => {
  return (dispatch: AppDispatch, getState: AppSelector) => {
    const state = getState();
    const handleAddCandidateError = (err: Error) => {
      console.log('添加候选人失败', err);
    };
    state.webRtc.localConnection.onicecandidate = (e) => {
      !e.candidate ||
        state.webRtc.remoteConnection
          .addIceCandidate(e.candidate)
          .catch(handleAddCandidateError);
      console.log('添加候选人成功');
    };
  };
};

export const setRemoteIceCandidateAsync = () => {
  return (dispatch: AppDispatch, getState: AppSelector) => {
    const state = getState();
    const handleAddCandidateError = () => {
      console.error('远端连接失败');
    };
    state.webRtc.remoteConnection.onicecandidate = (e) => {
      !e.candidate ||
        state.webRtc.localConnection
          .addIceCandidate(e.candidate)
          .catch(handleAddCandidateError);
      console.log('远端候选人连接成功');
    };
  };
};

export const createOfferAsync = () => {
  return (dispatch: AppDispatch, getState: AppSelector) => {
    const state = getState();
    const handleCreateDescriptionError = (err: Error) => {
      console.error('创建描述发生错误', err);
    };

    state.webRtc.localConnection
      .createOffer()
      .then((offer) => {
        return state.webRtc.localConnection.setLocalDescription(offer);
      })
      .then(() => {
        if (!state.webRtc.localConnection.localDescription)
          throw new Error('获取本地描述失败');
        return state.webRtc.remoteConnection.setRemoteDescription(
          state.webRtc.localConnection.localDescription
        );
      })
      .then(() => {
        return state.webRtc.remoteConnection.createAnswer();
      })
      .then((answer) => {
        return state.webRtc.remoteConnection.setLocalDescription(answer);
      })
      .then(() => {
        if (!state.webRtc.remoteConnection.localDescription)
          throw new Error('获取远端描述失败');
        state.webRtc.localConnection.setRemoteDescription(
          state.webRtc.remoteConnection.localDescription
        );
      })
      .catch(handleCreateDescriptionError);
  };
};

export const initRemoteConnection = (vdoElement: HTMLVideoElement) => {
  return (dispatch: AppDispatch, getState: AppSelector) => {
    const state = getState();
    state.webRtc.remoteConnection.ondatachannel = romoteChannelCallback;
    state.webRtc.remoteConnection.ontrack = (event) => {
      console.log(1231, vdoElement);
      const remoteStream = event.streams[0];
      vdoElement.srcObject = remoteStream;
    };

    function romoteChannelCallback(event: RTCDataChannelEvent) {
      const remoteChannel = event.channel;
      remoteChannel.onmessage = handleReceiveMessage;
      remoteChannel.onopen = handleReceiveChannelStatusChange;
      remoteChannel.onclose = handleReceiveChannelStatusChange;

      function handleReceiveMessage(event: MessageEvent) {
        console.log('收到了消息', event);
      }

      function handleReceiveChannelStatusChange() {
        if (remoteChannel) {
          console.log(
            "Receive channel's status has changed to " +
              remoteChannel.readyState
          );
        }
      }
    }
  };
};
