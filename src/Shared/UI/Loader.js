function Loader() {
  return (
    <div
      className="spinner-grow"
      role="status"
      style={{ width: "15px", height: "15px", color: "#fff" }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
