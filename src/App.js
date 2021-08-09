import './App.css';
import Header from './component/Index/Header';
import Body from './component/Index/Body';
import Footer from './component/Index/Footer';
import About from './component/About';
import Signup from './component/Signup_Signin/Signup';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from './component/Signup_Signin/Signin';
import Search from './component/Search/Search';
import Profile from './component/Profile/Profile';
import UpdateProfile from './component/Update/UpdateProfile';
import Admin from './component/Admin/Admin';
import edit from './component/Admin/edit';
import Review from './component/Review/Review';
import UpdatePassword from './component/Update/UpdatePassword';
import BoardUser from "./component/board-user.component";
import BoardAdmin from "./component/board-admin.component";
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Favourites from './page/Favourites';
import Event from './page/user/Event';
import NewEvent from './page/host/NewEvent';
import Register from './component/Register';
import UpdateEvent from "./page/host/UpdateEvent";
import EventHost from './page/host/EventHost';

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/" component={Body}></Route>
                <Route exact path="/register" component={Signup}></Route>
                <Route exact path="/login" component={Signin}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/:id" component={Profile}></Route>
                <Route exact path="/password" component={UpdatePassword} />
                <Route exact path = "/body" component= {Body} />
                <Route exact path="/event" component={Favourites}></Route>
                <Route exact path="/eventHost/:id" component={EventHost}></Route>
                <Route exact path="/event/:id" component={Event}></Route>
                <Route exact path="/newEvent" component={NewEvent}></Route>
                <Route exact path="/homepage" component={Body}></Route>
                <Route exact path="/registerEvent" component={Register}></Route>
                <Route exact path="/review" component={Review}></Route>
                {<PrivateRoute exact path="/admin" component={Admin} isAuthenticated={localStorage.getItem('role') === '3'}></PrivateRoute> }
                {<PrivateRoute exact path="/updateProfile" component={UpdateProfile} isAuthenticated={localStorage.getItem('id') != null}></PrivateRoute> }
                {<PrivateRoute exact path="/updateEvent/:id" component={UpdateEvent} isAuthenticated={localStorage.getItem('checkUpdatEvent')}></PrivateRoute> }
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;