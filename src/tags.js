/**
 * @tags define all available building blocks with needed properties
 * 'type': defines type of the block (clause, operator, value)
 * 'block': produces new line or not (Boolean)
 * 'name': name of clause (e.g. SELECT, FROM or +)
 */
const tags = [
    /*Value input tag **************************************/
    {
        type: 'value',
        block: false,
        name: 'Enter value'
    },
    /*Clauses **************************************/
    {
        type: 'clause',
        block: true,
        name: 'select'
    },
    {
        type: 'clause',
        block: true,
        name: 'from'
    },
    {
        type: 'clause',
        block: true,
        name: 'where'
    },
    {
        type: 'clause',
        block: false,
        name: 'distinct'
    },
    {
        type: 'clause',
        block: false,
        name: 'count'
    },
    {
        type: 'clause',
        block: false,
        name: 'sum'
    },
    {
        type: 'clause',
        block: true,
        name: 'min'
    },
    {
        type: 'clause',
        block: true,
        name: 'avg'
    },
    /*Operators **************************************/
    {
        type: 'operator',
        block: false,
        name: 'not'
    },
    {
        type: 'operator',
        block: false,
        name: 'is not null'
    },
    {
        type: 'operator',
        block: false,
        name: 'is null'
    },
    {
        type: 'operator',
        block: false,
        name: 'and'
    },
    {
        type: 'operator',
        block: false,
        name: 'or'
    },
    {
        type: 'operator',
        block: false,
        name: '('
    },
    {
        type: 'operator',
        block: false,
        name: ')'
    },
    {
        type: 'operator',
        block: false,
        name: '=='
    },
    {
        type: 'operator',
        block: false,
        name: '<'
    },
    {
        type: 'operator',
        block: false,
        name: '>'
    },
    {
        type: 'operator',
        block: false,
        name: '<='
    },
    {
        type: 'operator',
        block: false,
        name: '>='
    },
    {
        type: 'operator',
        block: false,
        name: '+'
    },
    {
        type: 'operator',
        block: false,
        name: '*'
    }
];

export {tags};