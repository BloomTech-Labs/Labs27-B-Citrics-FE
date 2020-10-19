import React, { useForm } from 'react';
import { Input } from 'antd';

const ProfilePage = () => {
  const { register, handleSubmit } = useForm();
  const preferencesStyles = {
    width: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={preferencesStyles}>
      <h1>Profile</h1>
      <div className="preferences">
        <h4>My Account</h4>
        <p>Name</p>
        <Input ref={register} />
        <p>Screen Name</p>
        <Input />
        <p>Photo</p>
        <Input />
        <h4>Sign in and Security</h4>
        <p>Email</p>
        <Input />
        <button>Change Password</button>
        <button>Deactivate Account</button>
        <br />
        <button name="submit">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfilePage;
