import { Button } from '@mui/material';
import { useAppDispatch } from '@/store/index';
import { createRef, useEffect } from 'react';

import {
  setRemoteIceCandidateAsync,
  initRemoteConnection
} from '@/store/actions/webRtcAction';

export function ReciveVdo() {
  const remoteVdoRef = createRef<HTMLVideoElement>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getStreamHandler();
    getVdoInfo();
  }, []);

  function getVdoInfo() {
    if (!remoteVdoRef.current) return;
    console.dir(remoteVdoRef.current);
    remoteVdoRef.current.onloadedmetadata = () => {
      console.dir(remoteVdoRef.current);
    };
  }
  // getStreamHandler();
  /**
   * 接收视频
   */
  function getStreamHandler() {
    if (!remoteVdoRef.current) return;
    dispatch(initRemoteConnection(remoteVdoRef.current));
    dispatch(setRemoteIceCandidateAsync());
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
        height={'200'}
        width={'400'}
        controls
        autoPlay
      ></video>
    </>
  );
}
