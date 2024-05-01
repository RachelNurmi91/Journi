import Loader from "../../Shared/UI/Loader";
const Loading = ({ loading }) => {
  return loading ? (
    <div className="loading-screen">
      <div>
        <Loader />
      </div>
    </div>
  ) : null;
};

export default Loading;
