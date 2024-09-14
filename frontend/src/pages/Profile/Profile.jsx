import "./profile.css";
import image1 from "../../assets/images/profile.webp";

const Profile = () => {
  return (
    <div>
      <div className="profile-title">Profile</div>
      <div className="profile-rectangle">
        <div className="profile-image">
          <img className="profile-image" src={image1} alt="profile pic" />
          <div className="profile-add-photo">
  <label htmlFor="profile-photo-upload">
    <i className="fa-solid fa-camera profile-add-photo-button"></i>
  </label>
  <input type="file" id="profile-photo-upload" style={{ display: 'none' }} />
</div>

        </div>
        <div className="profile-text">Sultan</div>
        <div className="profile-info">
          <div className="profile-labels">First Name</div>
          <div className="profile-container">
            <input className="profile-input" type="text"></input>
          </div>

          <div className="profile-labels">Last Name</div>

          <div className="profile-container">
            <input className="profile-input" type="text"></input>
          </div>

          <div className="profile-labels">Bio</div>

          <div className="profile-container">
            <input className="profile-input" type="text"></input>
          </div>

          <div className="profile-labels">Location</div>

          <div className="profile-container">
            <input className="profile-input" type="text"></input>
          </div>

          <div className="profile-container2">
            <div className="profile-save-button">Save Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
