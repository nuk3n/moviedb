import ErrorMessage from '../error-message';
import React from 'react';

export default class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message="Oooops...Something`s gone wrong :(" />;
    }
    return this.props.children;
  }
}
