import React from 'react';

function Stats() {
  return (
    <form method="POST" action="/get-user-stats">
      <input type="text" name="username" placeholder="LastFM username" />
      <input type="submit" />
    </form>
  );
}

export default Stats;
