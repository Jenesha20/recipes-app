from flask import Blueprint, request, jsonify
from models import recipes_collection
from utils.filters import build_mongo_query

recipes_bp = Blueprint('recipes', __name__, url_prefix='/api/recipes')

def serialize_recipe(recipe):
    result = dict(recipe)
    if '_id' in result:
        result['id'] = str(result['_id'])
        del result['_id']
    return result

def parse_json(data):
    return [serialize_recipe(doc) for doc in data]

@recipes_bp.route('/', methods=['GET'])
def get_recipes():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit

        sort_field = request.args.get('sort', 'rating')
        sort_order = int(request.args.get('order', -1))  

        total = recipes_collection.count_documents({})

        recipes_cursor = recipes_collection.find() \
            .sort(sort_field, sort_order) \
            .skip(skip) \
            .limit(limit)

        recipes = list(recipes_cursor)

        response = {
            'page': page,
            'limit': limit,
            'total': total,
            'data': parse_json(recipes)
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@recipes_bp.route('/search', methods=['GET'])
def search_recipes():
    try:
        query = build_mongo_query(request.args)

        recipes_cursor = recipes_collection.find(query)
        recipes = list(recipes_cursor)

        return jsonify({'data': parse_json(recipes)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
