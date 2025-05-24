from flask import Flask
from config import Config
from flask_cors import CORS  
from routes.recipes import recipes_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)  

    app.register_blueprint(recipes_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
