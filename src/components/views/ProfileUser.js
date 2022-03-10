import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";

const Player = ({user}) => (
    <div>
        <div className="player container">username: {user.username}</div>
        <div className="player container">status: {user.logged_in.toString()}</div>
        <div className="player container">birthday: {user.birthday}</div>
        <div className="player container">creation day: {user.creation_date}</div>

    </div>
);


Player.propTypes = {
    user: PropTypes.object
};

const Profile = () => {

    const history = useHistory();
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        history.push('/login');
    }
    useEffect(() => {
        async function fetchData() {
            try {

                const response = await api.get('/users/' + localStorage.getItem("idUser"));

                if(response.data.logged_in){
                    response.data.logged_in = "online"
                }
                else {
                    response.data.logged_in = "offline"

                }

                if(response.data.birthday== null){
                    response.data.birthday = "no information"
                }
                else{
                    response.data.birthday= response.data.birthday.substr(0, 10);

                }
                if(response.data.creation_date== null){
                    response.data.creation_date = "no information"
                }
                else{
                    response.data.creation_date = response.data.creation_date.substr(0, 10);;
                }


            } catch (error) {
                console.error(`Something went wrong while fetching the users data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users data.");
            }
        }

        fetchData();
    }, []);


    const doBack = () => {
        try {
            history.goBack();
        } catch (error) {
            alert(`Something went wrong  \n${handleError(error)}`);
        }

    };

    let content = <div> hg </div>;

    if (user) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    <Player user={user}/>
                </ul>
                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        );
    }



    return (
        <BaseContainer className="game container">
            <Button
                width="100%"
                onClick={() => doBack()}
            >
                Back
            </Button>
            <p className="game paragraph">
                Get all users from secure endpoint:
            </p>
            {content}
        </BaseContainer>
    );
}

export default Profile;
