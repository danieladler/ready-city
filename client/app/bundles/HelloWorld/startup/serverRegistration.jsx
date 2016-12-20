// Shows the mapping from the exported object to the name used by the server rendering.
import ReactOnRails from 'react-on-rails';

// React components
import HelloWorld from '../components/HelloWorld';

// Generator function
import HelloWorldApp from './HelloWorldApp';

ReactOnRails.register({
  HelloWorld,
  HelloWorldApp,
});
