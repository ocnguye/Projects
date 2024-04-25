import React from 'react';
import Listings from './Listings';
import SavedListings from './SavedListings';

const ListingsPage = () => {
  const [isListings, setIsListings] = React.useState(true);
  return (
    <div className='flex flex-col w-full space-y-2 pt-2'>
      <div className='flex w-full justify-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-center'>{isListings ? "Your Listings" : "Saved Listings"}</h1>
      </div>
      <div className='flex w-full justify-center'>
        <div className="flex justify-center items-center text-sm h-6 w-50 px-5 py-6 bg-green-350 text-black rounded-l-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 hover:cursor-pointer"
          onClick={() => setIsListings(true)}
          style={{ backgroundColor: !isListings ? "rgb(187, 246, 112)" : "#A1DF51" }}
        >
          Your Listings
        </div>
        <div className="flex justify-center items-center text-sm h-6 w-50 px-5 py-6 bg-green-350 text-black rounded-r-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 hover:cursor-pointer"
          style={{ backgroundColor: isListings ? "rgb(187, 246, 112)" : "#A1DF51" }}
          onClick={() => setIsListings(false)}
        >
          Saved Listings
        </div>
      </div>
      <div>
        {isListings ? <Listings /> : <SavedListings />}
      </div>
    </div>
  )
}

export default ListingsPage;