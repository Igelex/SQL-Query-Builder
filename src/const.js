export const CLAUSES_TYPES = {
    VALUE: 'value',
    CLAUSE: 'clause',
    OPERATOR: 'operator',
    FLOATING: 'floating',
};

/**
 * @clauses define all available building blocks with needed properties
 * 'type': defines type of the block (clause, operator, value)
 * 'block': produces new line or not (Boolean)
 * 'name': visible name of clause (e.g. SELECT, FROM or +)
 */
const CLAUSES = [
    /*Floating input ******************************/
    {
        type: CLAUSES_TYPES.FLOATING,
        block: false,
        name: 'floating'
    },
    /*Value input tag ******************************/
    {
        type: CLAUSES_TYPES.VALUE,
        block: false,
        name: 'Enter value'
    },
    /*Clauses **************************************/
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: true,
        name: 'select'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: true,
        name: 'from'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: true,
        name: 'where'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: false,
        name: 'distinct'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: false,
        name: 'count'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: false,
        name: 'sum'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: true,
        name: 'min'
    },
    {
        type: CLAUSES_TYPES.CLAUSE,
        block: true,
        name: 'avg'
    },
    /*Operators **************************************/
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: 'not'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: 'is not null'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: 'is null'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: 'and'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: 'or'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '('
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: ')'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '=='
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '<'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '>'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '<='
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '>='
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '+'
    },
    {
        type: CLAUSES_TYPES.OPERATOR,
        block: false,
        name: '*'
    }
];
CLAUSES.map((clause,i)=> clause.id = i);
export {CLAUSES};