import '../styles/style.scss';
import './output';
import {init} from './initializer';

const Sqlqb = {
    inject: (options) => init(options)
};

export default Sqlqb;
