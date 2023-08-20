import TransState from '../components/Profile/TransMenu'
import Header from '../components/MainHeader'
import ProfileData from '../components/Profile/profile'
import TransferMenu from '../components/Profile/MainTransfer';

function Profile(){
  
    return (
        <div>
            <Header />
            <ProfileData />
            <TransState />

            <TransferMenu />


            
        </div>
    );
}

export default Profile;
