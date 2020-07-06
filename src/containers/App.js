import React, {Component} from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
// import { robots } from "./robots";
import SearchBox from "../components/SearchBox";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import Scroll from "../components/Scroll";
import { setSearchField, requestRobots} from "../actions";

// Deals with the state which is gotten from the store...
const mapStateToProps = state => {
    return {
        // The combiner makes us use state.searchRobots. ..
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

// Updates the action based on state gotten from store...
const mapDispatchToProps = dispatch => {
    return{
      onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    // This will pass through thunk... because the action returns a function stead of an object...
      onRequestRobots: () => dispatch(requestRobots())
    }
}


class App extends Component {
   
    componentDidMount () {
        this.props.onRequestRobots();
    }

    render () {
        // const {robots} = this.state;
        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase()
            .includes(searchField.toLowerCase()));
        if (isPending) {
            return (<h1 className="f1 tc"> Loading...</h1>);
        }else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox search={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll> 
                </div>
            );
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);


//                uSInG  sTaTe  iN  rEAcT...,

 // constructor () {
    //     super()
    //     this.state = {
    //         robots: [],
    //         // searchField: "",
    //     };
    // }
    // onSearchChange now replaced with redux...
    // // Some React specific syntax... => was used so the "this" is for where it was created...
    // onSearchChange = (event) => {
    //     // Below is how state is changed in react and not this.state.searchField = ...
    //     this.setState({searchField: event.target.value}); 
    // }


    // componentDidMount () {
        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then(response => response.json())
        //     .then(user => this.setState({robots: user})
        // );
    // }
