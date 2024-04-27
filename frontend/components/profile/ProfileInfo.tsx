import { useAuth, useClerk } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, postProfile, ProfileData } from "../../api/profile";
import { Avatar, Divider } from "@mui/material";
import { renderRating } from "../utils/renderRating";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { post } from "../../api/api";
import { postImgToS3 } from "../../utils/s3utils";
import { cleanImage } from "../../utils/images";
import EditIcon from '@mui/icons-material/Edit';


const ProfileInfo = () => {
  const { getToken } = useAuth();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState('');
  
  const { user: myUser } = useClerk();
  
  const onImageChange = async (event: any) => {
    if ( myUser?.id === undefined ) return;
    const token = await getToken();
    const file = event.target.files[0];
    const imgUrl = await postImgToS3(file, token);
    await postProfile(myUser?.id, { "profile_img": imgUrl }, token);
    const resp = await getProfile(myUser.id, token);
    return resp?.data;
  };
  
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
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', myUser?.id], data);
    }
  });
  
  const mutationImage = useMutation({
    mutationFn: onImageChange,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', myUser?.id], data);
    }
  });
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full items-center space-x-2">
          <div className="grid grid-cols-1 grid-rows-1 justify-center items-center">
            <Avatar src={cleanImage(data.profile_img)} 
              sx={{
                width: 100,
                height: 100,
                gridColumnStart: 1,
                gridRowStart: 1,
              }} 
            />
            <label htmlFor="input" className="col-start-1 row-start-1 z-10 flex w-full justify-center items-center">
              <div className="hover:cursor-pointer opacity-0 hover:opacity-100 text-md p-2 hover:scale-101 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450">
                <EditIcon />
              </div>
            </label>
            <input
              accept="image/*"
              onChange={(event: any) => mutationImage.mutate(event)}
              id="input"
              type="file"
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: -1
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl">{data.username}</h1>
            <p className="flex items-center">
            { renderRating(data.rating) } 
            <p>({data.rating})</p>
            </p>
          </div>
        </div>
        <Divider />
        <div>
          <h2 className="text-2xl">Bio</h2>
          <div className="w-full flex flex-col justify-between bg-green-150 shadow-lg min-h-56 rounded-xl p-4">
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
                <div className="bg-gray-500 bg-opacity-50 shadow-lg hover:bg-gray-900 hover:cursor-pointer text-white rounded-md p-2 "
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