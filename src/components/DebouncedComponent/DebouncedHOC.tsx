import * as React from 'react';
import { debounce } from 'lodash';

interface DebouncedComponentProps {
  debouncePeriod: number;
  children: React.ReactNode;
}
interface DebouncedComponentState {
  value: any;
}
// A HOC that intercepts value, onChange, and onBlur handlers, from a single
// Child, wraps the event handlers in a configurable debounce, then reinjects
class DebouncedComponent extends React.Component<DebouncedComponentProps, DebouncedComponentState> {
  static defaultProps = {
    debouncePeriod: 1500,
  };
  debouncedActionCreator: _.Cancelable & React.ChangeEventHandler<HTMLInputElement>;
  constructor(props: DebouncedComponentProps) {
    super(props);
    const { debouncePeriod, children } = this.props;
    const { onChange, value } = React.Children.only(children).props;
    this.debouncedActionCreator = debounce(onChange, debouncePeriod);
    this.state = {
      value,
    };
  }
  // Reset local state from Redux store after debounce resolves
  componentWillReceiveProps(nextProps: DebouncedComponentProps) {
    const { value } = React.Children.only(nextProps.children).props;
    this.setState({ value });
  }
  componentWillUnmount() {
    this.debouncedActionCreator.cancel();
  }
  // 
  _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    this.setState({
      value: Number(e.target.value),
    });
    this.debouncedActionCreator(e);
  }
  _onBlur(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    const { onBlur } = React.Children.only(this.props.children).props;
    onBlur && onBlur(e);
    this.debouncedActionCreator.flush();
  }
  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      value: this.state.value,
      onChange: this._onChange.bind(this),
      onBlur: this._onBlur.bind(this),
    });
  }
}
export default DebouncedComponent;
