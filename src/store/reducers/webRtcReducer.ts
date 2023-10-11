import { createSlice } from '@reduxjs/toolkit';

interface WebRtcState {
  localConnection: RTCPeerConnection;
  remoteConnection: RTCPeerConnection;
  sendChannel: RTCDataChannel | null;
}

const initialState: WebRtcState = {
  localConnection: new RTCPeerConnection(),
  remoteConnection: new RTCPeerConnection(),
  sendChannel: null
};

export const webRtcSilce = createSlice({
  name: 'webRtc',
  initialState,
  reducers: {
    initLocalConnection: (state) => {
      const handleSendChannelStatusChange = () => {
        if (state.sendChannel) {
          const readyState = state.sendChannel?.readyState;
          if (readyState === 'open') {
            console.log('i m open');
          } else {
            console.log('i m ', readyState);
          }
        }
      };
      state.sendChannel =
        state.localConnection.createDataChannel('sendChannel');
      state.sendChannel.onopen = handleSendChannelStatusChange;
      state.sendChannel.onclose = handleSendChannelStatusChange;
    },

    initRemoteConnection: (state) => {
      state.remoteConnection.ondatachannel = romoteChannelCallback;
      // state.remoteConnection.ontrack = (event) => {
      //   if (!action.payload.current) return;
      //   const remoteStream = event.streams[0];
      //   action.payload.current.srcObject = remoteStream;
      // };
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
    },

    /**
     * 设置远端候选人
     */
    setRemoteIceCandidate: (state) => {
      const handleAddCandidateError = () => {
        console.error('远端连接失败');
      };
      state.remoteConnection.onicecandidate = (e) => {
        !e.candidate ||
          state.localConnection
            .addIceCandidate(e.candidate)
            .catch(handleAddCandidateError);
        console.log('远端候选人连接成功');
      };
    },

    /**
     * 添加候选人
     */
    setLocalIceCandidate: (state) => {
      const handleAddCandidateError = () => {
        console.log('添加候选人失败');
      };
      state.localConnection.onicecandidate = (e) => {
        !e.candidate ||
          state.remoteConnection
            .addIceCandidate(e.candidate)
            .catch(handleAddCandidateError);
        console.log('本地连接成功');
      };
    },

    createOffer: (state) => {
      const handleCreateDescriptionError = () => {
        console.log('创建描述发生错误');
      };
      state.localConnection
        .createOffer()
        .then((offer) => state.localConnection.setLocalDescription(offer))
        .then(() => {
          if (!state.localConnection.localDescription) return;
          state.remoteConnection.setRemoteDescription(
            state.localConnection.localDescription
          );
        })
        .then(() => state.remoteConnection.createAnswer())
        .then((answer) => state.remoteConnection.setLocalDescription(answer))
        .then(() => {
          if (!state.remoteConnection.localDescription) return;
          state.localConnection.setRemoteDescription(
            state.remoteConnection.localDescription
          );
        })
        .catch(handleCreateDescriptionError);
    }
  }
});

export const {
  initLocalConnection,
  initRemoteConnection,
  setRemoteIceCandidate,
  setLocalIceCandidate,
  createOffer
} = webRtcSilce.actions;

export default webRtcSilce.reducer;
