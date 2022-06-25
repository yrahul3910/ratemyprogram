import './NewReview.sass';

function submitReview() {
    // Check empty values
    if (document.getElementById('new-university').value === '' ||
        document.getElementById('new-program').value === '' ||
        document.getElementById('new-degree').value === '' ||
        document.getElementById('new-program-rating').value === '') {
        return;
    }

    // Process bad rating values
    let rating = document.getElementById('new-program-rating').value;
    if (rating < 1)
        rating = 1;
    if (rating > 5)
        rating = 5;

    const review = {
        university: document.getElementById('new-university').value,
        program: document.getElementById('new-program').value,
        degree: document.getElementById('new-degree').value,
        rating: document.getElementById('new-program-rating').value,
        review: document.getElementById('new-review').value,
        advisor: document.getElementById('new-advisor').value,
        advisorRating: document.getElementById('new-advisor-rating').value
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
                document.getElementById('new-program-rating').value = '';
                document.getElementById('new-review').value = '';
                document.getElementById('new-advisor').value = '';
                document.getElementById('new-advisor-rating').value = '';
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

function findReviews() {
    const query = document.getElementById('search-query').value;

    fetch('/api/reviews/search', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data['status'] === 'ok') {
                const reviews = data['reviews'];
                const reviewList = document.getElementById('review-list');
                reviewList.innerHTML = '';
                for (let i = 0; i < reviews.length; i++) {
                    const review = reviews[i];
                    const reviewEl = document.createElement('div');
                    reviewEl.classList.add('review');
                    reviewEl.innerHTML = `
                        <div class="review-header">
                            <div class="review-header-left">
                                <div class="review-university">${review['university']}</div>
                                <div class="review-program">${review['program']}</div>
                                <div class="review-degree">${review['degree']}</div>
                            </div>
                            <div class="review-header-right">
                                <div class="review-rating">${review['rating']}</div>
                            </div>
                        </div>
                        <div class="review-body">
                    `;

                    if (review['advisor'])
                        reviewEl.innerHTML += `
                            <div class="review-advisor">${review['advisor']}</div>
                            <div class="review-advisor-rating">${review['advisorRating']}</div>
                        `;
                    
                    reviewEl.innerHTML += `
                            <div class="review-review">${review['review']}</div>
                        </div>
                    `;
                    reviewList.appendChild(reviewEl);
                }
            }
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
                <input id="new-program-rating" type="number" min={1} max={5} placeholder="Program Rating (1-5)" />
                <input id="new-advisor" type="text" placeholder="Advisor (optional)" />
                <input id="new-advisor-rating" type="number" min={1} max={5} placeholder="Advisor Rating (1-5) (optional)" />
                <textarea id="new-review" rows={10} placeholder="Review (optional)" />
                <button id="new-submit" onClick={submitReview}>Submit</button>
            </div>
            <div className="column">
                <h2>Find reviews.</h2>
                <input id="search-query" type="text" placeholder="Search..." />
                <button id="search-submit" onClick={findReviews}>Submit</button>
            </div>
        </div>
    )
}