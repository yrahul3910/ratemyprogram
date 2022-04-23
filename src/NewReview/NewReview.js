import './NewReview.sass';

function submitReview() {
    // Check empty values
    if (document.getElementById('new-university').value === '' ||
        document.getElementById('new-program').value === '' ||
        document.getElementById('new-degree').value === '' ||
        document.getElementById('new-rating').value === '') {
        return;
    }

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

    fetch('/api/reviews/submit', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })
        .then(response => response.json())
        .then(data => {
            if (data['status'] === 'ok') {
                let el = document.getElementById('new-submit');
                el.classList.add('success');
                el.innerHTML = 'Submitted!';
                setTimeout(() => {
                    el.classList.remove('success');
                    el.innerHTML = 'Submit';
                }, 2000);

                // Clear form
                document.getElementById('new-university').value = '';
                document.getElementById('new-program').value = '';
                document.getElementById('new-degree').value = '';
                document.getElementById('new-rating').value = '';
                document.getElementById('new-review').value = '';
            } else {
                let el = document.getElementById('new-submit');
                el.classList.add('failure');
                el.innerHTML = 'Failed!';
                setTimeout(() => {
                    el.classList.remove('failure');
                    el.innerHTML = 'Submit';
                }, 2000);
            }
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
                <button id="new-submit" onClick={submitReview}>Submit</button>
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