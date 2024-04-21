import type { User, ChannelSort, ChannelFilters, ChannelOptions } from 'stream-chat';
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { useState } from 'react';
import 'stream-chat-react/dist/css/v2/index.css';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const StreamMessage = ({apiKey, user, token}: {apiKey: string; user: User; token: string;}) => {

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [user.id] },
  };
  
  const options: ChannelOptions = {
    limit: 10,
  };
  
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: user,
  });
  
  
  const [open, setOpen] = useState(false);
  
  const channelWidth = () => {
    if (!open) return "60px";
    return "200px";
  };
  
  const numChannels = client?.activeChannels?.length ? Number(client?.activeChannels?.length) : 0;

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <section style={{
        display: 'flex',
        height: '100vh',
        paddingBottom: '96px',
        width: '100vw',
      }}>
      {numChannels > 0 ? (
        <>
          <div className='overflow-auto bg-white' style={{
            width: `${channelWidth()}`
          }}>
            <div onClick={() => setOpen(!open)}>
              { open ? <ChevronLeft /> : <ChevronRight />}
            </div>
              <ChannelList filters={filters} sort={sort} options={options} />
          </div>
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </>
        ) : (
          <div className='flex items-center justify-center w-full h-full'>
            <h1 className='text-2xl'>No contacts found</h1>
          </div>
        )}
      </section>
    </Chat>
  );
};

export default StreamMessage;
