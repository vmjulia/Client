import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";
//<div className="player status">status: {user.logged_in.toString()}</div>



const Player = ({user}) => {
    const history = useHistory();

    const showUser = () => {
        try {
            history.push( `/game/profileUser/${user.id}`);
        } catch (error) {
            alert(`Something went wrong  \n${handleError(error)}`);
        }
    };

    return (<Button
        className="player container"
        onClick={() => showUser()}>
        <div className="player username">{user.username}</div>
        <div className="player status"> {user.logged_in}</div>
    </Button>)
};

Player.propTypes = {
    user: PropTypes.object
};

const Game = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);



    const logout = async () => {

        const logged_in = false;
        const requestBody = JSON.stringify({logged_in});
        await api.put('/users/' + localStorage.getItem("id"), requestBody);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        history.push('/login');
    }

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                const data = response.data.map(item => {
                    return new User(item)
                })

                setUsers(data);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }


        fetchData();
    }, []);

    const doShow = () => {
        try {
            history.push(`/game/profile`);
        } catch (error) {
            alert(`Something went wrong  \n${handleError(error)}`);
        }
    };



    let content = <Spinner/>;

    if (users) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    {users.map(user => (
                        <Player user = {user} />
                    ))}
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
                onClick={() => doShow()}
            >
                My profile
            </Button>
            <p className="game paragraph">
                Get all users from secure endpoint:
            </p>
            {content}
        </BaseContainer>
    );
}

export default Game;
