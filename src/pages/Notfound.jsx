import React from 'react';

const NotFound = () => {
  const notFoundImageUrl = 'https://img.freepik.com/premium-vector/error-404-concepts-landing-page_206192-61.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703030400&semt=ais';

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img
        src={notFoundImageUrl}
        alt="Not Found"
        style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px 0' }}
      />
    </div>
  );
};

export default NotFound;
