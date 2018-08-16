export const CLAUSES_TYPES = {
    VALUE: 0,
    ClAUSE: 1,
    OPERATOR: 2
};

/**
 * @clauses define all available building blocks with needed properties
 * 'type': defines type of the block (clause, operator, value)
 * 'block': produces new line or not (Boolean)
 * 'name': name of clause (e.g. SELECT, FROM or +)
 */
export const CLAUSES = [
    /*Value input tag **************************************/
    {
        type: 0,
        block: false,
        name: 'Enter value'
    },
    /*Clauses **************************************/
    {
        type: 1,
        block: true,
        name: 'select'
    },
    {
        type: 1,
        block: true,
        name: 'from'
    },
    {
        type: 1,
        block: true,
        name: 'where'
    },
    {
        type: 1,
        block: false,
        name: 'distinct'
    },
    {
        type: 1,
        block: false,
        name: 'count'
    },
    {
        type: 1,
        block: false,
        name: 'sum'
    },
    {
        type: 1,
        block: true,
        name: 'min'
    },
    {
        type: 1,
        block: true,
        name: 'avg'
    },
    /*Operators **************************************/
    {
        type: 2,
        block: false,
        name: 'not'
    },
    {
        type: 2,
        block: false,
        name: 'is not null'
    },
    {
        type: 2,
        block: false,
        name: 'is null'
    },
    {
        type: 2,
        block: false,
        name: 'and'
    },
    {
        type: 2,
        block: false,
        name: 'or'
    },
    {
        type: 2,
        block: false,
        name: '('
    },
    {
        type: 2,
        block: false,
        name: ')'
    },
    {
        type: 2,
        block: false,
        name: '=='
    },
    {
        type: 2,
        block: false,
        name: '<'
    },
    {
        type: 2,
        block: false,
        name: '>'
    },
    {
        type: 2,
        block: false,
        name: '<='
    },
    {
        type: 2,
        block: false,
        name: '>='
    },
    {
        type: 2,
        block: false,
        name: '+'
    },
    {
        type: 2,
        block: false,
        name: '*'
    }
];