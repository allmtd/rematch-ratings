import React, { useState, useEffect } from "react";
import VoteTable from "./VoteTable";

function App() {
  const [user, setUser] = useState(null);

  // Parse Discord info from URL hash after redirect
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const access_token = params.get("access_token");
      if (access_token) {
        fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${access_token}` },
        })
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.error(err));
      }
    }
  }, []);

  const handleLogin = () => {
    const clientId = "1423677174963241051"; // Discord App ID
    const redirectUri = "http://localhost:3000";
    const scope = "identify";
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${scope}`;
    window.location.href = discordAuthUrl;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Rematch Leaderboard</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with Discord</button>
      ) : (
        <>
          <p>Logged in as: {user.username}#{user.discriminator}</p>
          <VoteTable currentUser={user} />

        </>
      )}
    </div>
  );
}

export default App;
