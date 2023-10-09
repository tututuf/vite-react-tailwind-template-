// 视频通话
export default function VideoCall() {
  return (
    <div>
      <span>测试 webRtc</span>
      <div className="mt-3">
        <span>视频源</span>
        <video height="200" width="400" controls></video>
      </div>
      <div className="mt-3">
        <span>共享</span>
        <video height="200" width="400" controls></video>
      </div>
    </div>
  );
}
