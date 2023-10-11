import { Button } from '@mui/material';
import { createRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/index';
import {
  initLocalConnection,
  setLocalIceCandidate,
  createOffer
} from '@/store/reducers/webRtcReducer';

export function ShareVdo() {
  let screenStream: MediaStream;
  let sendChannel: RTCDataChannel;
  const senderVdo = createRef<HTMLVideoElement>();
  const webRtcStore = useAppSelector((state) => state.webRtc);
  const dispatch = useAppDispatch();

  /**
   * 选择即将共享的屏幕
   */
  async function selectVdoHandler() {
    try {
      if (!senderVdo.current) return;
      screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      senderVdo.current.srcObject = screenStream;
      screenStream.getTracks().forEach((track) => {
        webRtcStore.localConnection.addTrack(track, screenStream);
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 共享屏幕
   */
  async function shareVdoHandler() {
    dispatch(initLocalConnection());
    dispatch(setLocalIceCandidate());
    dispatch(createOffer());
  }

  /**
   * 发送消息
   */
  function sendMsg() {
    console.log('发送了消息');
    sendChannel.send('testMsg');
  }

  return (
    <>
      <div className="mb-2">
        <span className="mr-5">视频源</span>
        <Button onClick={selectVdoHandler} variant="contained" size="small">
          选择屏幕
        </Button>
        <span className="mr-5"></span>
        <Button onClick={shareVdoHandler} variant="contained" size="small">
          共享
        </Button>
        <span className="mr-5"></span>
        <Button onClick={sendMsg} variant="contained" size="small">
          发送消息
        </Button>
      </div>
      <video ref={senderVdo} height="200" width="400" controls autoPlay></video>
    </>
  );
}
