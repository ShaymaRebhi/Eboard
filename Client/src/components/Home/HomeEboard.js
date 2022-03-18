import React from 'react';
import PrivateRoute from "../../Routes/PrivateRoute";
import Navbar from '../pages/Shared/Navbar';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/SignUp';
import ContactUs from '../pages/Home/ContactUs';
import AboutUs from '../pages/Home/AboutUs';
import Footer from '../pages/Shared/Footer';
function HomeEboard() {
    return (
        <div>
            <Navbar />
            <PrivateRoute
              path="/"
              exact
              component={Home}
            />
            <PrivateRoute
              path="/Contactus"
              exact
              component={ContactUs}
            />
            <PrivateRoute
              path="/Aboutus"
              exact
              component={AboutUs}
            />
            <PrivateRoute
              path="/sign-up"
              exact
              component={SignUp}
            />

<Footer />
        </div>
    )
}
export default HomeEboard;