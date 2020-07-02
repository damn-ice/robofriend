import React, {Component} from "react";
import CardList from "../components/CardList";
// import { robots } from "./robots";
import SearchBox from "../components/SearchBox";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import Scroll from "../components/Scroll";


class App extends Component {
    constructor () {
        super()
        this.state = {
            robots: [],
            searchField: "",
        };
    }
    // Some React specific syntax... => was used so the "this" is for where it was created...
    onSearchChange = (event) => {
        // Below is how state is changed in react and not this.state.searchField = ...
        this.setState({searchField: event.target.value}); 
    }

    componentDidMount () {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(user => this.setState({robots: user})
        );
    }

    render () {
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase()
            .includes(searchField.toLowerCase()));
        if (robots.length === 0) {
            return (<h1 className="f1 tc"> Loading...</h1>);
        }else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox search={this.onSearchChange}/>
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

export default App;