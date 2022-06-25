from flask import Flask, request, Response
import pymongo
import configparser
import json
import urllib
import certifi

app = Flask(__name__, static_folder='./build/', static_url_path='/')

# PyMongo setup
config = configparser.ConfigParser()
config.read('.env')
username = config['db']['USERNAME']
password = config['db']['PASSWORD']
db = config['db']['DB']
url = config['db']['URL']
conn_url = f'mongodb+srv://{urllib.parse.quote(username)}:{urllib.parse.quote(password)}@{url}/?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE'
client = pymongo.MongoClient(conn_url, tlsCAFile=certifi.where())
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
    advisor = req['advisor']
    advisor_rating = req['advisorRating']

    reviews = db.reviews
    success = reviews.insert_one({
        'university': university,
        'program': program,
        'rating': rating,
        'review': review,
        'degree': degree,
        'advisor': advisor,
        'advisorRating': advisor_rating
    }).acknowledged

    if success:
        return Response(json.dumps({'status': 'ok'}), status=200, headers={'Content-Type': 'application/json'})
    else:
        return Response(json.dumps({'status': 'error'}), status=500, headers={'Content-Type': 'application/json'})

@app.route('/api/reviews/search', methods=['POST'])
def search():
    req = request.get_json(force=True)
    query = req['query']

    reviews = db.reviews
    results = reviews.aggregate([
        {
            '$search': {
                'index': 'default',
                'text': {
                    'query': query,
                    'path': {
                        'wildcard': '*'
                    }
                }
            }, 
        }, {
            '$project': {
                '_id': 0,
            }
        }
    ])

    results = { 'status': 'ok', 'reviews': [x for x in results] }
    return Response(json.dumps(results), status=200, headers={'Content-Type': 'application/json'})

@app.route('/*', methods=['POST'])
def catch_all():
    print(request.json)


if __name__ == '__main__':
    app.run()