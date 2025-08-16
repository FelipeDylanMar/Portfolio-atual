import { useEffect, useState } from 'react';

interface Track {
  id: string;
  name: string;
  preview_url: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'token';

const SpotifySearch = () => {
  const [token, setToken] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    let _token = localStorage.getItem('token');

    if (!_token && hash) {
      _token = hash.substring(1).split('&').find((x) => x.startsWith('access_token'))?.split('=')[1] || '';
      localStorage.setItem('token', _token);
      window.location.hash = '';
    }

    setToken(_token);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const res = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTracks(data.tracks.items);
  };

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=user-read-private`;

  return (
    <div>
      {!token ? (
        <a href={loginUrl}>
          <button>Login com Spotify</button>
        </a>
      ) : (
        <>
          <button onClick={logout}>Logout</button>

          <form onSubmit={handleSearch} style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Digite o nome da música"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>

          <div style={{ marginTop: 20 }}>
            {tracks.map((track) => (
              <div key={track.id} style={{ marginBottom: 20 }}>
                <p>
                  <strong>{track.name}</strong> - {track.artists[0].name}
                </p>
                {track.album.images[0] && (
                  <img src={track.album.images[0].url} alt="Capa do álbum" width={100} />
                )}
                {track.preview_url && (
                  <audio controls src={track.preview_url}>
                    Seu navegador não suporta áudio.
                  </audio>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SpotifySearch;
