import 'jquery-ui-bundle';
import '../styles/style.scss';
import {init} from './initializer';

const Sqlqb = {
    inject: (options) => init(options)
};

export default Sqlqb;
