import 'jquery-ui-bundle';
import '../styles/style.scss';
import 'normalize.css';
import {init} from './initializer';

export function showBuilder(options) {
    init(options);
}
//SELECT 1,2 FROM users WHERE id <= 5 AND age >= 25 AND (name = 'some_name' OR name = ''another_name)
