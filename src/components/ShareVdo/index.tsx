import { Button } from '@mui/material';
import { createRef, useEffect } from 'react';
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
  const senderVdoBox = createRef<HTMLDivElement>();
  const vdoCanvasRef = createRef<HTMLCanvasElement>();
  const webRtcStore = useAppSelector((state) => state.webRtc);
  const dispatch = useAppDispatch();
  let originVdoCtx: CanvasRenderingContext2D | null;
  let video: HTMLVideoElement;
  const width = 400,
    height = 200;
  /**
   * 选择即将共享的屏幕
   */
  async function selectVdoHandler() {
    try {
      if (!video) return;
      screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      video.srcObject = screenStream;
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
    video.addEventListener('play', timerCallback);
    return video;
  };

  const showCanvas = () => {
    if (!vdoCanvasRef.current) return;
    originVdoCtx = vdoCanvasRef.current.getContext('2d');
    video = createVideo();
    senderVdoBox.current?.append(video);
    timerCallback();
  };

  const renderCanvas = () => {
    originVdoCtx?.drawImage(video, 0, 0, width, height);
  };

  /**
   * 按帧渲染
   */
  function timerCallback() {
    if (video?.paused || video?.ended) return;
    renderCanvas();
    requestAnimationFrame(() => {
      timerCallback();
    });
  }

  timerCallback();

  useEffect(() => {
    showCanvas();
  }, []);

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
      <canvas
        ref={vdoCanvasRef}
        height={height}
        width={width}
        className="mb-2 bg-stone-900"
      ></canvas>
      {/* <video height={height} width={width} controls autoPlay></video> */}
    </div>
  );
}
