import './list.css'
import { ChatList } from './chatList/ChatList';
import { UserInfo } from './userInfo/UserInfo';

export const List = () => {
    return <div className='list'>
      <UserInfo></UserInfo>
      <ChatList></ChatList>
    </div>;
  };
  