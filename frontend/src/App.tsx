import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { routes } from './router/routes';

function App() {
  dayjs.extend(utc)
  return <>{routes}</>
}

export default App
