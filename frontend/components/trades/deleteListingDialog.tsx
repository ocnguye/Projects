import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Listing } from '../../api/search';
import { formatSeries } from '../utils/utils';
import { deleteListing } from '../../api/profile';
import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '../../api/profile';
type Props = {
  open: boolean,
  handleClose: () => void,
  listing: Listing | undefined
}

export default function AlertDialog({open, handleClose, listing}: Props) {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    
    const handleDelete = async () => {
        if (!listing) return;
        const token = await getToken();
        await deleteListing(token, {"listing": listing.id});
        const resp = await getProfile(token);
        handleClose();
        return resp?.data;
    }
    
    const mutation = useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        queryClient.setQueryData(['listings'], data)
      },
    });

    return (
        <>
            { listing !== undefined ?
            (<Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <h1>Delete Listing</h1>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className='flex space-x-1 items-center'>
                        <img src={listing.collectible.image} className='w-25 h-20 object-contain'/>
                        <div>
                            <h1 className='text-2xl'>{formatSeries(listing.collectible.series)}</h1>
                            <h1>{listing.collectible.name}</h1>
                        </div>
                    </div>
                    Are you sure you want to delete this listing? This action cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <div className="hover:cursor-pointer flex justify-center items-center text-md hover:scale-102 w-50 px-2 py-1 bg-yellow-300 text-black rounded-lg transition duration-300 ease-in-out hover:bg-yellow-500 outline outline-yellow-500 outline-3" 
                    onClick={handleClose}
                >
                    Cancel
                </div>
                <div className="hover:cursor-pointer flex justify-center items-center text-md hover:scale-102 w-50 px-2 py-1 bg-red-500 text-black rounded-lg transition duration-300 ease-in-out hover:bg-red-600 outline outline-red-700 outline-3" 
                    onClick={() => mutation.mutate()}
                >
                    Delete
                </div>
                </DialogActions>
            </Dialog>) : (<></>)
            }
        </>
    );
}
