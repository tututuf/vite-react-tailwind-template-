import { useParams } from 'react-router';
import SearchInput from '@/components/SearchInput';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getResource } from '@/utils';
import { getHistory } from '@/api';
import { HistoryInfoItem } from '@/api/types/response';

export default function GptPage() {
  const params = useParams();
  const [inputVal, setInputVal] = useState('');
  const [chatList, setChatList] = useState<HistoryInfoItem[]>([]);
  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  const getChatList = async () => {
    const res = await getHistory({
      page: 1,
      size: 10,
      chat_id: Number(params.gptId)
    });
    setChatList(res.data.rows);
  };
  useEffect(() => {
    getChatList();
  }, [params.gptId]);

  const onSubmitHnadler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#f5f5f5] h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-3">
        {chatList.map((item, index) => (
          <div className="clear-both mb-6 overflow-hidden" key={index}>
            <img
              src={getResource('react.svg')}
              className="inline-block w-7 mx-3 align-middle float-left"
            />
            <span className="bg-white py-1 px-2 rounded-md align-middle float-left max-w-5xl inline-block">
              {item.message}
            </span>
          </div>
        ))}
        <div className="clear-both">
          <img
            src={getResource('react.svg')}
            className="inline-block w-7 mx-3 align-middle float-right"
          />
          <span className="bg-white py-1 px-2 rounded-md align-middle float-right">
            你好, {params.gptId}
          </span>
        </div>
      </div>
      <div className="flex justify-center h-5rem">
        <SearchInput
          value={inputVal}
          onChange={onInputChangeHandler}
          onSubmit={onSubmitHnadler}
        ></SearchInput>
      </div>
    </div>
  );
}
