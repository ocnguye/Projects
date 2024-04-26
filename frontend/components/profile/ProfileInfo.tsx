import { useAuth, useClerk } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, ProfileData } from "../../api/profile";
import { Avatar, Divider } from "@mui/material";
import { renderRating } from "../utils/renderRating";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { post } from "../../api/api";


const ProfileInfo = () => {
  const { getToken } = useAuth();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState('');
  const { user: myUser } = useClerk();
  
  const { data, isLoading, isError } = useQuery<ProfileData>({
    queryKey: ['profile', myUser?.id],
    queryFn: async () => {
      if (myUser?.id === undefined) return;
      const token = await getToken();
      const resp = await getProfile(myUser.id, token);
      return resp?.data;
    }
  });
  
  const updateUserBio = async () => {
    if ( myUser?.id === undefined ) return;
    const token = await getToken();
    await post(`profiles/bio/?id=${myUser.id}`,{'bio': bio}, token)
    const resp = await getProfile(myUser.id, token);
    return resp?.data;
  }
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: updateUserBio,
    onSuccess: async (data) => {
      queryClient.setQueryData(['profile', myUser?.id], data);
    }
  })
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full items-center space-x-2">
          <Avatar src={data.profile_img} 
            sx={{
              width: 100,
              height: 100
            }} 
          />
          <div>
            <h1 className="text-3xl">{data.username}</h1>
            { renderRating(data.rating) }
          </div>
        </div>
        <Divider />
        <div>
          <h2 className="text-2xl">Bio</h2>
          <div className="w-full flex flex-col justify-between bg-green-150 min-h-56 rounded-xl p-4">
            {
              !editingBio ?
              <p>
                {data.bio}
              </p> :
              <textarea 
                rows={6}
                className="w-full bg-transparent outline-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            }
            <div className="w-full flex justify-end ">
              { !editingBio ? 
                <div className="bg-gray-500 bg-opacity-50 hover:bg-gray-900 hover:cursor-pointer text-white rounded-md p-2 "
                  onClick={() => {
                    setBio(data.bio);
                    setEditingBio(true);
                  }}
                >
                  <EditNoteIcon />
                </div> :
                
                <div className="flex space-x-2">
                  <div className="flex justify-center items-center text-sm p-1 bg-yellow-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 outline outline-yellow-500 outline-3 hover:cursor-pointer" 
                    onClick={() => {
                      setBio(data.bio);
                      setEditingBio(false);
                    }}
                  >
                    <ClearIcon fontSize="medium" />
                  </div>
                  <div className="flex justify-center items-center text-sm p-1 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 hover:cursor-pointer"
                    onClick={() => {
                      setEditingBio(false);
                      mutation.mutate();
                    }}
                  >
                    <CheckIcon fontSize="medium"/>
                  </div>
                </div>
              
              }
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
  
}

export default ProfileInfo