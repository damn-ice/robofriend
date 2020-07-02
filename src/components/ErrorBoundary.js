import React, {Component} from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    //  Runs auto if an error was caught...
    componentDidCatch (error, info){
        this.setState({hasError: true});
    }

    render() {
        return (this.state.hasError) ? <h1>Something went Wrong...</h1> : this.props.children
    }
}

export default ErrorBoundary;