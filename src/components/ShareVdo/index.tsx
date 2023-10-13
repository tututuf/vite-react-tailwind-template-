import { Button } from '@mui/material';
import { createRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/index';
// import {
//   initLocalConnection
//   // setLocalIceCandidate
//   // createOffer
// } from '@/store/reducers/webRtcReducer';
import {
  initLocalConnectionAsync,
  createOfferAsync,
  setLocalIceCandidateAsync
} from '@/store/actions/webRtcAction';

export function ShareVdo() {
  let screenStream: MediaStream;
  const senderVdo = createRef<HTMLVideoElement>();
  const senderVdoBox = createRef<HTMLDivElement>();
  const webRtcStore = useAppSelector((state) => state.webRtc);
  const dispatch = useAppDispatch();
  let video: HTMLVideoElement;
  const width = 400,
    height = 200;
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

  const createVideo = (): HTMLVideoElement => {
    const video = document.createElement('video');
    video.height = 200;
    video.width = 400;
    video.controls = true;
    video.autoplay = true;
    return video;
  };

  const showCanvas = () => {
    video = createVideo();
    senderVdoBox.current?.append(video);
    timerCallback();
  };

  const renderCanvas = () => {};

  /**
   * 按帧渲染
   */
  function timerCallback() {
    if (video.paused || video.ended) return;
    renderCanvas();
    setTimeout(() => {
      timerCallback();
    }, 0);
  }

  timerCallback();
  /**
   * 共享屏幕
   */
  async function shareVdoHandler() {
    dispatch(initLocalConnectionAsync());
    dispatch(setLocalIceCandidateAsync());
    dispatch(createOfferAsync());
  }

  /**
   * 发送消息
   */
  function sendMsg() {
    console.log('发送了消息');
    if (!webRtcStore.sendChannel) return;
    webRtcStore.sendChannel.send('testMsg');
  }

  return (
    <div ref={senderVdoBox}>
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
      <canvas height={height} width={width}></canvas>
      <video
        ref={senderVdo}
        height={height}
        width={width}
        controls
        autoPlay
      ></video>
    </div>
  );
}
