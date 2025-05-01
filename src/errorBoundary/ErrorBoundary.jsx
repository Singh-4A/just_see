import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{
        display: 'grid',
        placeItems: 'center',
        height:'80vh'        
      }} >!Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
