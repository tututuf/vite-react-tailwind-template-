import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/index';
import { createRef, useEffect } from 'react';
import {
  initRemoteConnection,
  setRemoteIceCandidate
} from '@/store/reducers/webRtcReducer';

export function ReciveVdo() {
  const remoteVdoRef = createRef<HTMLVideoElement>();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.webRtc);
  useEffect(() => {
    getStreamHandler();
  }, []);

  /**
   * 接收视频
   */
  function getStreamHandler() {
    // if (!remoteVdoRef) return;
    dispatch(initRemoteConnection());
    store.remoteConnection.ontrack = (event) => {
      if (!remoteVdoRef.current) return;
      const remoteStream = event.streams[0];
      remoteVdoRef.current.srcObject = remoteStream;
    };
    dispatch(setRemoteIceCandidate());
  }
  return (
    <>
      <div className="mb-2">
        <span className="mr-5">共享</span>
        <Button onClick={getStreamHandler} variant="contained" size="small">
          接收
        </Button>
      </div>
      <video
        ref={remoteVdoRef}
        height="200"
        width="400"
        controls
        autoPlay
      ></video>
    </>
  );
}
