import React, { useState } from 'react';

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit review to backend
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authentication token if required
      },
      body: JSON.stringify({ rating, comment }),
    });
    if (response.ok) {
      const newReview = await response.json();
      onReviewSubmit(newReview);
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={0}>Select...</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 && 's'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Review:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
