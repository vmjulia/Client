import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";


const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};



const Profile = () => {

    const history = useHistory();
    const [user, setUser] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [username, setUsername] = useState(null);

    const logout = async () => {

        const logged_in = false;
        const requestBody = JSON.stringify({logged_in});
        await api.put('/users/' + localStorage.getItem("id"), requestBody);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        history.push('/login');
    }

    const changeUsernameBirthday = async () => {
        try {

            const requestBody = JSON.stringify({username, birthday});
            await api.put('/users/' + localStorage.getItem("id"), requestBody); // TO DO: remove register
            // Register successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game/profile`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };






    const doBack = () => {
        try {
            history.goBack();
        } catch (error) {
            alert(`Something went wrong  \n${handleError(error)}`);
        }

    };

    let content = <div> hg </div>;


    content = (
            <div className="game">
                <FormField
                    label="Username"
                    value={username}
                    onChange={un => setUsername(un) }
                />
                <FormField
                    label="Birthday"
                    value={birthday}
                    onChange={n => setBirthday(n)}
                />

                <Button
                    width="100%"
                    disabled={!username && !birthday}
                    onClick={() => changeUsernameBirthday()}
                >
                    Save
                </Button>
                &nbsp;&nbsp;
                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        );




    return (
        <BaseContainer className="game container">
            <Button
                width="100%"
                onClick={() => doBack()}
            >
                Back
            </Button>
            <p className="game paragraph">
                Write your new username and birthday:
            </p>
            {content}
        </BaseContainer>
    );
}

export default Profile;
