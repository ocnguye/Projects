import ProfileInfo from "./ProfileInfo";
import CollectionPreview from "./CollectionPreview";
import SavedPreview from './SavedPreview';

const Profile = () => {

  return (
    <div className="flex flex-col space-y-3 pt-2 pb-5">
      <ProfileInfo />
      <div className="flex flex-col w-full space-y-3">
        <CollectionPreview />
        <SavedPreview />
      </div>
    </div>
  );
};

export default Profile;
