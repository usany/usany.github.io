import useSelectors from 'src/hooks/useSelectors';

const Playlist = () => {
  const theme = useSelectors((state) => state.theme.value);
  return (
    <iframe
      src={'https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator'+`${theme !== 'light' ? '&theme=0' : ''}`}
      width="90%"
      height="200"
      allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}

export default Playlist
