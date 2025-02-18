export default function SearchBar({ setSearch }) {

  return (
    <>
      {/* Search input */}
      <h2>Search Players</h2>
      <input 
        type="text"
        placeholder="Search players"
        onChange={(event) => setSearch(event.target.value)}
      /> 
    </>
  );
}