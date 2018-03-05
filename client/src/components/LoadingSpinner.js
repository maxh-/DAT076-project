import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { Glyphicon } from 'react-bootstrap';

/**
 * Display a loading spinner.
 * 
 * example: 
 *   <LoadingSpinner
 *    name="three-bounce"
 *    show={this.state.showSpinner}
 *    done={this.state.success}
 *    fail={this.state.fail}/>
 */
class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.fail) return <Glyphicon glyph="remove" />;
    if (this.props.done) return <Glyphicon glyph="ok" />;
    if (this.props.show) return <Spinner name={this.props.name} />;
    return null;
  }
}

export default LoadingSpinner;
