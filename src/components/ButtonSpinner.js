import Spinner from "@/components/Spinner";

const ButtonSpinner = ({ label, isLoading, onClick, btnClassName }) => {
  if (isLoading) {
    return (
      <button
        type={"button"}
        className={`w-full p-4 rounded-lg ${btnClassName} bg-blackn-1000`}
        style={{}}
      >
        <Spinner isButton={true} />
      </button>
    );
  }
  return (
    <button type={"button"} onClick={onClick} className={btnClassName}>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default ButtonSpinner;
