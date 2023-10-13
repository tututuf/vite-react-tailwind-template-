import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// let negotiating = false;
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
    setSendChannel: (state, action: PayloadAction<RTCDataChannel>) => {
      state.sendChannel = action.payload;
    },

    initRemoteConnection: (state) => {
      state.remoteConnection.ondatachannel = romoteChannelCallback;
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
     * 添加候选人
     */
    setLocalIceCandidate: (state) => {
      const handleAddCandidateError = (err: Error) => {
        console.log('添加候选人失败', err);
      };
      state.localConnection.onicecandidate = (e) => {
        !e.candidate ||
          state.remoteConnection
            .addIceCandidate(e.candidate)
            .catch(handleAddCandidateError);
        console.log('添加候选人成功');
      };
    }
  }
});

export const {
  // initLocalConnection,
  initRemoteConnection,
  setSendChannel,
  // setRemoteIceCandidate,
  setLocalIceCandidate
  // createOffer
} = webRtcSilce.actions;

export default webRtcSilce.reducer;
