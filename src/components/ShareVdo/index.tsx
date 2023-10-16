import { Button } from '@mui/material';
import { createRef, useEffect, useState, ChangeEventHandler } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/index';
import {
  initLocalConnectionAsync,
  createOfferAsync,
  setLocalIceCandidateAsync
} from '@/store/actions/webRtcAction';
import { Input } from '@mui/material';
let video: HTMLVideoElement;
let canvasText = '';
let canvas: HTMLCanvasElement;

export function ShareVdo() {
  const [videoSize, setVideoSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  const [canvasData, setCanvaseData] = useState({
    text: ''
  });
  let screenStream: MediaStream;
  const senderVdoBox = createRef<HTMLDivElement>();
  const vdoCanvasRef = createRef<HTMLCanvasElement>();
  const webRtcStore = useAppSelector((state) => state.webRtc);
  const dispatch = useAppDispatch();
  let canvasStream: MediaStream;
  let originVdoCtx: CanvasRenderingContext2D;

  const inputCanvasHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCanvaseData({
      text: e.target.value
    });
    canvasText = canvasData.text;
  };

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
    } catch (err) {
      console.error(err);
    }
  }

  const createVideo = (): HTMLVideoElement => {
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.style.height = '200px';
    video.style.width = '400px';
    // video.addEventListener('play', timerCallback);
    video.onloadedmetadata = () => {
      setVideoSize({
        height: video.videoHeight,
        width: video.videoWidth
      });
    };
    return video;
  };

  const showCanvas = () => {
    if (!vdoCanvasRef.current) return;
    const ratio = window.devicePixelRatio || 1;
    canvasStream = vdoCanvasRef.current.captureStream();
    canvasStream.getTracks().forEach((track) => {
      webRtcStore.localConnection.addTrack(track, canvasStream);
    });
    originVdoCtx = vdoCanvasRef.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    originVdoCtx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    console.log(originVdoCtx);

    canvas = vdoCanvasRef.current;
    video = createVideo();
    senderVdoBox.current?.append(video);
  };

  function renderCanvas() {
    if (!originVdoCtx) return;
    originVdoCtx.clearRect(0, 0, canvas!.width, canvas!.height);

    originVdoCtx.drawImage(
      video,
      0,
      0,
      videoSize.width * 2,
      videoSize.height * 2
    );
    originVdoCtx.font = '300px Arial';
    originVdoCtx.fillStyle = 'black';
    originVdoCtx.fillText(canvasText, 0, 300); // 填充文本
    requestAnimationFrame(renderCanvas);
  }

  // /**
  //  * 按帧渲染
  //  */
  // function timerCallback() {
  //   if (video?.paused || video?.ended) return;
  //   renderCanvas();
  //   requestAnimationFrame(() => {
  //     timerCallback();
  //   });
  // }

  useEffect(() => {
    showCanvas();
    renderCanvas();
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
      <div>
        <Input
          value={canvasData.text}
          color="info"
          onChange={inputCanvasHandler}
        ></Input>
      </div>
      <canvas
        ref={vdoCanvasRef}
        height={videoSize.height * 2}
        width={videoSize.width * 2}
        className="mb-2 w-[400px] h-[200px]"
      />
    </div>
  );
}
