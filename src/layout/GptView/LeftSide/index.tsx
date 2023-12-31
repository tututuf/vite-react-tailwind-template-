import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChatList } from '@/api';
import { ChatListItem } from '@/api/types/response';

export default function LeftSide() {
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    initChatList();
  }, []);
  const initChatList = async () => {
    const { data } = await getChatList();
    setChatList(data.rows);
  };
  return (
    <div className="w-60 h-full bg-slate-600 overflow-auto">
      {chatList.map((item, index) => (
        <Link
          className={`w-full bg-slate-700  p-4 block hover:bg-slate-900 
          ${params.gptId === String(item.id) ? 'bg-slate-800' : ''}`}
          key={index}
          to={String(item.id)}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
