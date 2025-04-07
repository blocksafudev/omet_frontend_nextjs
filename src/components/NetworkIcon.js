import Image from "next/image";
const NetworkIcon = ({ network }) => {
  switch (network) {
    default:
      return (
        <Image
          priority={true}
          src="/images/network/bsc.svg"
          alt="bsc"
          width={20}
          height={20}
        />
      );
    case "ETHEREUM":
      return (
        <Image
          priority={true}
          src="/images/network/ethereum.svg"
          alt="ethereum"
          width={20}
          height={20}
        />
      );
    case "BASE":
      return (
        <Image
          priority={true}
          src="/images/network/base.svg"
          alt="base"
          width={20}
          height={20}
        />
      );
    case "ETHEREUMTESTNETGOERLI":
      return (
        <Image
          priority={true}
          src="/images/network/ethereumtestnet.svg"
          alt="ethereumtestnet"
          width={20}
          height={20}
        />
      );
    case "ETHEREUMTESTNETSEPOLIA":
      return (
        <Image
          priority={true}
          src="/images/network/ethereumtestnet.svg"
          alt="ethereumtestnet"
          width={20}
          height={20}
        />
      );
    case "ETHEREUMTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/ethereumtestnet.svg"
          alt="ethereumtestnet"
          width={20}
          height={20}
        />
      );
    case "BSC":
      return (
        <Image
          priority={true}
          src="/images/network/bsc.svg"
          alt="bsc"
          width={20}
          height={20}
        />
      );
    case "BSCTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/bsctestnet.svg"
          alt="bsctestnet"
          width={20}
          height={20}
        />
      );
    case "COREDAO":
      return (
        <Image
          priority={true}
          src="/images/network/coredao.svg"
          alt="coredao"
          width={20}
          height={20}
        />
      );
    case "COREDAOTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/coredao.svg"
          alt="coredao"
          width={20}
          height={20}
        />
      );
    case "ZKSYNC":
      return (
        <Image
          priority={true}
          src="/images/network/zksync.svg"
          alt="zksync"
          width={20}
          height={20}
        />
      );
    case "ZKSYNCTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/zksync.svg"
          alt="zksync"
          width={20}
          height={20}
        />
      );
    case "ARBITRUM":
    case "ARBITRUMTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/arbitrum.svg"
          alt="arbitrum"
          width={20}
          height={20}
        />
      );
    case "FANTOM":
    case "FANTOMTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/fantom.svg"
          alt="fantom"
          width={20}
          height={20}
        />
      );
    case "POLYGON":
      return (
        <Image
          priority={true}
          src="/images/network/polygon.svg"
          alt="polygon"
          width={20}
          height={20}
        />
      );
    case "POLYGONTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/polygontestnet.svg"
          alt="polygontestnet"
          width={20}
          height={20}
        />
      );
    case "AVALANCHE":
    case "AVALANCHETESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/avalanche.svg"
          alt="avalanche"
          width={20}
          height={20}
        />
      );
    case "CRONOS":
    case "CRONOSTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/cronos.svg"
          alt="cronos"
          width={20}
          height={20}
        />
      );
    case "OKC":
      return (
        <Image
          priority={true}
          src="/images/network/okc.svg"
          alt="okc"
          width={20}
          height={20}
        />
      );
    case "OKCTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/okc.svg"
          alt="okc"
          width={20}
          height={20}
        />
      );
    case "HECO":
    case "HECOTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/heco.svg"
          alt="heco"
          width={20}
          height={20}
        />
      );
    case "VELAS":
      return (
        <Image
          priority={true}
          src="/images/network/velas.svg"
          alt="velas"
          width={20}
          height={20}
        />
      );
    case "VELASTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/velas.svg"
          alt="velas"
          width={20}
          height={20}
        />
      );
    case "OASIS":
      return (
        <Image
          priority={true}
          src="/images/network/oasis.svg"
          alt="oasis"
          width={20}
          height={20}
        />
      );
    case "OASISTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/oasis.svg"
          alt="oasis"
          width={20}
          height={20}
        />
      );
    case "OPTIMISM":
    case "OPTIMISMTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/optimism.svg"
          alt="optimism"
          width={20}
          height={20}
        />
      );
    case "MOONBEAM":
    case "MOONBEAMTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/moonbeam.svg"
          alt="moonbeam"
          width={20}
          height={20}
        />
      );
    case "AURORA":
    case "AURORATESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/aurora.svg"
          alt="aurora"
          width={20}
          height={20}
        />
      );
    case "BITICA":
      return (
        <Image
          priority={true}
          src="/images/network/bitica.png"
          alt="biticanetwork"
          width={20}
          height={20}
        />
      );
    case "ALVEY":
    case "ALVEYTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/alvey.svg"
          alt="alvey"
          width={20}
          height={20}
        />
      );
    case "DOGECHAIN":
    case "DOGECHAINTESTNET":
      return (
        <Image
          priority={true}
          src="/images/network/dogechain.svg"
          alt="dogechain"
          width={20}
          height={20}
        />
      );
    case "MODE":
      return (
        <Image
          priority={true}
          src="/images/network/mode.svg"
          alt="mode"
          width={20}
          height={20}
        />
      );
    case "MERLIN":
      return (
        <Image
          priority={true}
          src="/images/network/merlin.svg"
          alt="merlin"
          width={20}
          height={20}
        />
      );
    case "XAI":
      return (
        <Image
          priority={true}
          src="/images/network/xai.svg"
          alt="xai"
          width={20}
          height={20}
        />
      );
    case "SOLANA":
      return (
        <Image
          priority={true}
          src="/images/network/solana.svg"
          alt="solana"
          width={20}
          height={20}
        />
      );
    case "TRON":
      return (
        <Image
          priority={true}
          src="/images/network/tron.svg"
          alt="tron"
          width={20}
          height={20}
        />
      );
    case "TON":
      return (
        <Image
          priority={true}
          src="/images/network/ton.svg"
          alt="tron"
          width={20}
          height={20}
        />
      );
  }
};
export default NetworkIcon;
