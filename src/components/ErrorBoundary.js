import React, {Component} from "react";

class ErrorBoundary extends Component {
    // This props passed down not necessary in class but good for understanding...
    // Although required in functions...
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