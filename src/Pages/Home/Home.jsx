import Container from "../../Layout/Container";

const Home = () => {
  return (
    <div
      className="min-h-screen -mt-[68px] py-20 z-10"
      style={{
        backgroundImage:
          'url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundColor: "rgba(0, 0, 0, 0.6)",
        // backgroundBlendMode: "overlay",
      }}
    >
      <Container>home</Container>
    </div>
  );
};

export default Home;
