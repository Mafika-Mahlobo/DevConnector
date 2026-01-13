import { Fragment } from "react/jsx-runtime";
import spinner from './spinner.gif';

const Spinner = () => (
    <Fragment>
        <img 
            src={spinner}
            style={{width: '200px', margin: 'auto', display: 'block'}}
            alt="Loading..."
        />
    </Fragment>
);

export default Spinner;