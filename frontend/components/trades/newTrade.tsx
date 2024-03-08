// @ts-nocheck
// This is a monstrosity of a file, i apologize for my sins
// beware if you decide to read this file, it is not for the faint of heart

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getCollectibles } from "../../api/collectibles";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import { postImgToS3 } from '../../utils/s3utils';
import LinearProgress from '@mui/material/LinearProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import { postTrade } from '../../api/profile';

type Collectible = {
    id: string;
    name: string;
    series: string;
    product: string;
    image: string;
};

type Image = {
    imagePreview: string;
    file: string;
};

const NewTrade = () => {
    const [open , setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { getToken } = useAuth();
    const { data , isLoading, isError } = useQuery<readonly Collectible[]>({
        queryKey: ['collectibles'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getCollectibles(token);
            return resp!.data;
        }
    });

    const getOptions = (data: readonly Collectible[] | undefined) => {
        if (data === undefined) {
            return {};
        }
        const props = {
            options: data,
            getOptionLabel: (option: Collectible) => `${option.series.toUpperCase().charAt(0) + option.series.slice(1)} ${option.name}`,
          };
        return props;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    
    const [trading, setTrading] = React.useState<Collectible | null>(null);
    const [requestingOne, setRequestingOne] = React.useState<Collectible | null>(null);
    const [requestingTwo, setRequestingTwo] = React.useState<Collectible | null>(null);
    const [requestingThree, setRequestingThree] = React.useState<Collectible | null>(null);
    const [description, setDescription] = React.useState<string>('');
    
    const [images, setImages] = React.useState<Image[]>([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setImages([ { imagePreview: reader.result as string, file: file }, ...images ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const onClearImage = (i: Image) => {
        setImages(images.filter((image) => image !== i));
        document.getElementById('input').value = '';
    }
    
    React.useEffect(() => {
        setDisabled(!(trading !== undefined && description !== undefined && images.length !== 0));
    }, [images, trading, description]);

    const handleCreate = async () => {
        if (disabled) {
            return;
        };
        const form = {
            trading: trading.id,
            requesting1: requestingOne ? requestingOne.id : '',
            requesting2: requestingTwo ? requestingTwo.id : '',
            requesting3: requestingThree ? requestingThree.id : '',
            description: description,
            price: 0.0,
            images: [],
        };
        setIsUploading(true);
        const token = await getToken();
        for (let i = 0; i < images.length; i++) {
            const imgUrl = await postImgToS3(images[i].file, token);
            images[i].imagePreview = imgUrl;
            form.images.push(imgUrl);
        }

        const resp = await postTrade(token, form);
        if (resp && resp.status === 201) {
            setIsUploading(false);
            setOpen(false);
        } else {
            setIsUploading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-10 right-10" onClick={handleClickOpen}> 
                <div className="flex justify-center items-center text-xl hover:scale-110 h-6 w-50 px-5 py-6 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" >
                    New Trade
                </div>
            </div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                    <p className='pt-6 pl-6 text-xl'>
                        Create a new trade!
                    </p>
                <DialogContent>
                    <div className = "flex flex-col">
                        <>
                        { isUploading ? 
                        <div style={{color: "#BBF670"}}>
                            <LinearProgress style={{
                                marginBottom: '10px',
                            }}
                            color="inherit"
                            /> 
                        </div>
                        : 
                        <></>}
                        {
                            !isLoading && !isError ? 
                            (
                                <div>
                                    <Autocomplete
                                        {...getOptions(data)}
                                        value={trading}
                                        onChange={(_: any, newValue: Collectible | null) => {
                                            setTrading(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        sx={{ width: 400, marginBottom: 2, }}
                                        renderInput={(params) => <TextField {...params} label="Select a Smiski to trade" />}
                                    />
                                    <Autocomplete
                                        {...getOptions(data)}
                                        value={requestingOne}
                                        onChange={(_: any, newValue: Collectible | null) => {
                                            setRequestingOne(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        sx={{ width: 400, marginBottom: 2 }}
                                        renderInput={(params) => <TextField {...params} label="[Optional] Select a Smiski to receive" />}
                                        color="success"
                                    />
                                    <Autocomplete
                                        {...getOptions(data)}
                                        value={requestingTwo}
                                        onChange={(_: any, newValue: Collectible | null) => {
                                            setRequestingTwo(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        sx={{ width: 400, marginBottom: 2, color: 'success'}}
                                        renderInput={(params) => <TextField {...params} label="[Optional] Select a Smiski to receive" />}
                                        color="success"
                                        />
                                        <Autocomplete
                                        {...getOptions(data)}
                                        value={requestingThree}
                                        onChange={(_: any, newValue: Collectible | null) => {
                                            setRequestingThree(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        sx={{ width: 400, marginBottom: 2 }}
                                        renderInput={(params) => <TextField {...params} label="[Optional] Select a Smiski to receive" />}
                                        color="success"
                                    />
                                    <TextField
                                        id="outlined-multiline-static"
                                        placeholder='Trade Description'
                                        value={description}
                                        onChange={(event: any) => {
                                            setDescription(event.target.value);
                                        }}
                                        multiline
                                        rows={4}
                                        color="success"
                                        style={{
                                            width: 400,
                                            marginBottom: 10,
                                        }}
                                    />
                                    <label htmlFor="input" >
                                        <div className="hover:cursor-pointer flex justify-center items-center text-md hover:scale-101 w-50 px-2 py-1 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3">
                                            Add an image
                                        </div>
                                    </label>
                                    <input
                                        accept="image/*"
                                        onChange={onImageChange}
                                        id="input"
                                        type="file"
                                        style={{
                                            opacity: 0,
                                            position: "absolute",
                                            zIndex: -1
                                        }}
                                    />
                                    {
                                        images.length > 0 ? (
                                            <div style={{display: 'flex', width: 150*images.length}}>
                                                {images.map((i: Image) => 
                                                    <div
                                                    className="pt-2 hover:scale-101 ease-in-out duration-300
                                                    flex items-center justify-end"
                                                    key={i.imagePreview}
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                    }}
                                                >
                                                    <CancelIcon className='relative z-10' fontSize="medium" onClick={() => onClearImage(i)} 
                                                    style={{
                                                        top: 55,
                                                        left: 145,
                                                        zIndex: 1,
                                                        cursor: 'pointer',
                                                    }}
                                                    />
                                                    <img src={ i.imagePreview } alt={i.imagePreview} style={{height: '100%', zIndex: 0, borderRadius: 10}} />
                                                </div>
                                                )}
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>
                            ) 
                            : 
                            (<></>)
                        }
                        </>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className="hover:cursor-pointer flex justify-center items-center text-md hover:scale-110 w-50 px-2 py-1 bg-yellow-300 text-black rounded-lg transition duration-300 ease-in-out hover:bg-yellow-500 outline outline-yellow-500 outline-3" 
                        onClick={handleCancel}
                    >
                        Cancel
                    </div>
                    <div className="hover:cursor-pointer flex justify-center items-center text-md hover:scale-110 w-50 px-2 py-1 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" 
                        onClick={handleCreate}
                        style={{
                            opacity: disabled ? 0.5 : 1,
                            pointerEvents: disabled ? 'none' : 'auto',
                            hover: disabled ? 'none' : 'scale-110',                   
                        }}
                    >
                        Create
                    </div>
                </DialogActions>
            </Dialog>
        </>
      );
};

export default NewTrade;