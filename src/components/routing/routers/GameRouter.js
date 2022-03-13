import {Redirect, Route} from "react-router-dom";
import Game from "components/views/Game";
import {ProfileGuard} from "components/routing/routeProtectors/ProfileGuard";
import Profile from "components/views/Profile";
import ProfileUser from "components/views/ProfileUser";
import ProfileEditMode from "components/views/ProfileEditMode";
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

const GameRouter = props => {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    /**
     * :id to have dynamic urls
     */
    return (

        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/dashboard`}>
                <Game/>
            </Route>

            <Route  exact path={`${props.base}/profile`}>
                <Profile/>
            </Route>

            <Route exact path={`${props.base}/profileUser/:id`}>
                <ProfileUser/>
            </Route>

            <Route exact path={`${props.base}/profileEditMode`}>
                <ProfileEditMode/>
            </Route>

            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/dashboard`}/>
            </Route>
        </div>

    );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
    base: PropTypes.string
}

export default GameRouter;
