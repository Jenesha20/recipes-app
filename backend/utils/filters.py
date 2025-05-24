def parse_comparison(input_str):
    operators = ['<=', '>=', '<', '>', '=']
    for op in operators:
        if input_str.startswith(op):
            return op, input_str[len(op):]
    return '=', input_str  

def clean_number(value):
    if value is None or (isinstance(value, str) and value.lower() == 'nan'):
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None

def map_operator(op):
    mapping = {
        '=': None,  
        '<': '$lt',
        '<=': '$lte',
        '>': '$gt',
        '>=': '$gte'
    }
    return mapping.get(op)

def build_mongo_query(params):
    query = {}

    if 'title' in params:
        query['title'] = {'$regex': params['title'], '$options': 'i'}  

    if 'cuisine' in params:
        query['cuisine'] = params['cuisine']

    for field in ['total_time', 'rating']:
        if field in params:
            op, value = parse_comparison(params[field])
            value = clean_number(value)
            if value is not None:
                mongo_op = map_operator(op)
                if mongo_op is None:
                    query[field] = value
                else:
                    query[field] = {mongo_op: value}

    if 'calories' in params:
        op, value = parse_comparison(params['calories'])
        value = clean_number(value)
        if value is not None:
            if op == '=':
                query['nutrients.calories'] = {'$regex': f'^{value} '}
            else:
                query['$expr'] = {
                    map_operator(op): [
                        {'$toDouble': {'$arrayElemAt': [
                            {'$split': ['$nutrients.calories', ' ']}, 0
                        ]}},
                        value
                    ]
                }

    return query
