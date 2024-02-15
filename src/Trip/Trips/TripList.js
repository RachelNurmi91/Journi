import Button from "../../Shared/UI/Button";

function TripList() {
  return (
    <div>
      <Button label="New Trip" destination={"/trips/add"} />
    </div>
  );
}

export default TripList;
