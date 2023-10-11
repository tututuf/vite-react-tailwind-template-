import { ShareVdo } from '@/components/ShareVdo';
import { ReciveVdo } from '@/components/ReciveVdo';

// 视频通话
export default function VideoCall() {
  return (
    <div>
      <span>测试 webRtc</span>
      <div className="mt-3">
        <ShareVdo></ShareVdo>
      </div>
      <div className="mt-3">
        <ReciveVdo></ReciveVdo>
      </div>
    </div>
  );
}
