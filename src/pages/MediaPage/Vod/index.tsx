// 点播视频
import { useRef, useEffect } from 'react';
import dashjs from 'dashjs';

export default function Vod() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, '/static/media/dash/lol.mpd', true);
  }, []);
  return (
    <div>
      <span>测试 Dash</span>
      <video ref={videoRef} controls>
        <source
          src="/static/media/dash/lol.mpd"
          type="application/dash+xml"
        ></source>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
