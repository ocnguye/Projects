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
  
  
  const [open, setOpen] = useState(true);
  
  const channelWidth = () => {
    if (!open) return "65px";
    return "450px";
  };
  
  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <section className='flex h-[85vh] sm:h-[90vh] w-[95vw] md:w-[100vw]' style={{
      }}>
          <div className='overflow-auto bg-white' style={{
            width: `${channelWidth()}`
          }}>
            <div onClick={() => setOpen(!open)}>
              { open ? <ChevronLeft fontSize='large'/> : <ChevronRight fontSize='large' />}
            </div>
              <ChannelList filters={filters} sort={sort} options={options} />
          </div>
          <div className='w-full'>
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
      </section>
    </Chat>
  );
};

export default StreamMessage;
