import './Body.sass';
import NewReview from '../NewReview/NewReview';

export default function Body() {
    return (
        <main>
            <p>
                The program equivalent of RateMyProfessor. Created by grad students, for current
                and prospective grad students. Let&apos;s keep departments accountable.
            </p>
            <p>
                <b>Note:</b> people are more likely to add a review if they have had negative experiences. Please consider this bias
                when choosing a program.
            </p>
            <NewReview />
            <div id="review-list"></div>
        </main>
    )
}