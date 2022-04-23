from flask import Flask, request, Response
import pymongo
import dotenv
import json
import urllib

app = Flask(__name__, static_folder='./build/', static_url_path='/')

# PyMongo setup
config = dotenv.dotenv_values('.env')
username = config['USERNAME']
password = config['PASSWORD']
db = config['DB']
url = config['URL']
conn_url = f'mongodb+srv://{urllib.parse.quote(username)}:{urllib.parse.quote(password)}@{url}/{db}?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn_url)
db = client.rmp

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/reviews/submit', methods=['POST'])
def submit_review():
    req = request.get_json(force=True)
    university = req['university']
    program = req['program']
    rating = req['rating']
    review = req['review']
    degree = req['degree']

    reviews = db.reviews
    success = reviews.insert_one({
        'university': university,
        'program': program,
        'rating': rating,
        'review': review,
        'degree': degree
    }).acknowledged

    if success:
        return Response(json.dumps({'status': 'ok'}), status=200, headers={'Content-Type': 'application/json'})
    else:
        return Response(json.dumps({'status': 'error'}), status=500, headers={'Content-Type': 'application/json'})

@app.route('/*', methods=['POST'])
def catch_all():
    print(request.json)


if __name__ == '__main__':
    app.run()