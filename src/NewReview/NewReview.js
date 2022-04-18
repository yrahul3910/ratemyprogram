import './NewReview.sass';

export default function NewReview() {
    return (
        <div className="new-review">
            <div className="column">
                <h2>Add your review here.</h2>
                <input id="new-university" type="text" placeholder="University" />
                <input id="new-degree" type="text" placeholder="Degree (MS / PhD / etc.)" />
                <input id="new-program" type="text" placeholder="Program (e.g. Computer Science)" />
                <textarea id="new-review" rows={10} placeholder="Review" />
                <button>Submit</button>
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