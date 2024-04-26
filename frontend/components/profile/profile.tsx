import ProfileInfo from "./ProfileInfo";
import CollectionPreview from "./CollectionPreview";
const Profile = () => {

  return (
    <div className="flex flex-col space-y-3 pt-2">
      <ProfileInfo />
      <div>
        <CollectionPreview />
        <h1>Saved</h1>
      </div>
    </div>
  );
};

export default Profile;
