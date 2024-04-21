import { User } from 'stream-chat';
import { LoadingIndicator } from 'stream-chat-react';
import { post } from '../../api/api';
import { useClerk } from '@clerk/clerk-react'
import { useCallback, useEffect, useState } from 'react';
import StreamMessage from './streamMessages';
import { useAuth } from '@clerk/clerk-react';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export type ChatState = {
  apiKey: string;
  user: User;
  token: string;
};

export default function ChatView() {
  const [myState, setMyState] = useState<ChatState | undefined>(undefined);
  const { getToken } = useAuth();
  const { user: myUser } = useClerk();

  const registerUser = useCallback(
    async function registerUser() {
      const userId = myUser?.id;
      const name = myUser?.username;
      if (userId && name) {
        const token = await getToken();
        const streamResponse = await post('register-user/', {
          "userId": userId,
          "name": name,
        }, token);
        const responseBody = streamResponse?.config?.data;
        return responseBody;
      }
    },
    [myUser, getToken]
  );

  useEffect(() => {
    if (
      myUser?.id &&
      myUser?.primaryEmailAddress?.emailAddress &&
      !myUser?.publicMetadata.streamRegistered
    ) {
      registerUser().then(() => {
        // console.log('[Page - useEffect] Result: ', result);
        getUserToken(
          myUser.id,
          myUser?.username || 'Unknown'
        );
      });
    } else {
      // take user and get token
      if (myUser?.id) {
        getUserToken(
          myUser?.id || 'Unknown',
          myUser?.username || 'Unknown'
        );
      }
    }
  }, [registerUser, myUser]);

  if (!myState) {
    return <LoadingIndicator />;
  }

  return <StreamMessage {...myState} />;

  async function getUserToken(userId: string, userName: string) {
    const clerkToken = await getToken();
    const responseBody = await post("token/", {userId: userId}, clerkToken);
      
    if (!responseBody) {
      console.error("Couldn't retrieve token.");
      return;
    }
    const token = responseBody?.data?.token;
    
    if (!token) {
      console.error("Couldn't retrieve token.");
      return;
    }

    const user: User = {
      id: userId,
      name: userName,
      image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
    };
    setMyState({
      apiKey: apiKey,
      user: user,
      token: token,
    });
  }
}
