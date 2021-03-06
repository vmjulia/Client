import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";

/**
 * similar to profile bit doesnt contain edit button, and retrived id for api request from the link instead of from storage
 *
 */

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

const ProfileUser = () => {
    const {id} = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);

    const logout = async () => {

        const logged_in = false;
        const requestBody = JSON.stringify({logged_in});
        await api.put('/users/' + localStorage.getItem("id"), requestBody);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        history.push('/login');
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users/' + id);
                const data = new User(response.data);
                setUser(data);


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

export default ProfileUser;
