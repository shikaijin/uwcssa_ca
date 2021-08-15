import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { FooterContainer } from "./containers/footer";
// import '.App.css';
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Members from "./components/pages/Members";
import ContactUs from "./components/pages/ContactUs";
import SignUp from "./components/pages/SignUp";
import Marketing from "./components/pages/Marketing";
import Consulting from "./components/pages/Consulting";
import News from "./components/pages/News";
import Forum from "./components/pages/Forum";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={News} />
        <Route path="/forum" exact component={Forum} />
        <Route path="/services" exact component={Services} />
        <Route path="/members" exact component={Members} />
        <Route path="/contact-us" exact component={ContactUs} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/marketing" exact component={Marketing} />
        <Route path="/consulting" exact component={Consulting} />
      </Switch>
      <FooterContainer />
    </Router>
  );
}

export default App;
