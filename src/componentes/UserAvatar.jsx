import { useSelector } from 'react-redux';
import '../componentes/styles/UserAvatar.css'


export default function UserAvatar() {

    const user = useSelector(state => state.user)

    return <div>
                    <div className="boxAvatar">
                    <img className='avatarNavImage' src={user.image} alt="usuario" />
                    </div>
        </div>
}
