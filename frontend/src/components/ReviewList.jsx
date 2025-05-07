import React from 'react';

const ReviewList = ({ reviews }) => (
  <div>
    <h3>Customer Reviews</h3>
    {reviews.length === 0 ? (
      <p>No reviews yet.</p>
    ) : (
      reviews.map((review) => (
        <div key={review.id}>
          <p>Rating: {review.rating} Stars</p>
          <p>{review.comment}</p>
        </div>
      ))
    )}
  </div>
);

export default ReviewList;
