import './NewReview.sass';

function submitReview() {
    // Process bad rating values
    let rating = document.getElementById('new-rating').value;
    if (rating < 1)
        rating = 1;
    if (rating > 5)
        rating = 5;

    const review = {
        university: document.getElementById('new-university').value,
        program: document.getElementById('new-program').value,
        degree: document.getElementById('new-degree').value,
        rating: document.getElementById('new-rating').value,
        review: document.getElementById('new-review').value
    };

    fetch('http://127.0.0.1:5000/api/reviews/submit', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
}

export default function NewReview() {
    return (
        <div className="new-review">
            <div className="column">
                <h2>Add your review here.</h2>
                <input id="new-university" type="text" placeholder="University" />
                <input id="new-degree" type="text" placeholder="Degree (MS / PhD / etc.)" />
                <input id="new-program" type="text" placeholder="Program (e.g. Computer Science)" />
                <input id="new-rating" type="number" min={1} max={5} placeholder="Rating (1-5)" />
                <textarea id="new-review" rows={10} placeholder="Review" />
                <button onClick={submitReview}>Submit</button>
            </div>
            <div className="column">
                <h2>Find reviews.</h2>
                <input id="find-university" type="text" placeholder="University" />
                <input id="find-degree" type="text" placeholder="Degree (MS / PhD / etc.)" />
                <input id="find-program" type="text" placeholder="Program" />
                <button>Submit</button>
            </div>
        </div>
    )
}