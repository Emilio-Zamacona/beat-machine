interface IBeatInput {
  changeBeatQty: (qty: number) => void;
}
const BeatInput = ({ changeBeatQty }: IBeatInput) => {
  const onChangeBeatQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeBeatQty(Number(e.target.value));
  };
  return <input onChange={onChangeBeatQty} type="number" />;
};
export default BeatInput;
