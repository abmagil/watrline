// import DebouncedComponent from './DebouncedRenderProps';
import DebouncedComponent from './DebouncedHOC';
import { debounce } from 'lodash';

export default DebouncedComponent;
export type DebounceType = typeof debounce;
