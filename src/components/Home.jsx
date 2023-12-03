import Notes from "./Notes";

function Home(props) {
  console.log("HOME page");
  const { showAlert } = props;
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
}

export default Home;
