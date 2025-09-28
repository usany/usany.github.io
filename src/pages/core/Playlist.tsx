import { useSelectors } from "src/hooks";

const Playlist = () => {
  const theme = useSelectors((state) => state.theme.value);
  return (
    <iframe
      src={import.meta.env.VITE_SPOTIFY_URL+`${theme !== 'light' ? '&theme=0' : ''}`}
      width="90%"
      height="200"
      allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}

export default Playlist
