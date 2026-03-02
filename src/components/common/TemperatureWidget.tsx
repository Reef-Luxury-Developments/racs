export const TemperatureWidget = (): JSX.Element => {
  return (
    <div className="home-hero-temperature-widget">
      <div className="home-hero-temperature-widget-left">
        <p className="home-hero-temperature-value home-hero-temperature-value--white">20℃</p>
        <p className="home-hero-temperature-label home-hero-temperature-label--white">RACS</p>
      </div>
      
      <div className="home-hero-temperature-widget-separator">
        <div className="home-hero-temperature-widget-separator-bar" />
      </div>
      
      <div className="home-hero-temperature-widget-right">
        <p className="home-hero-temperature-value home-hero-temperature-value--orange">29℃</p>
        <p className="home-hero-temperature-label home-hero-temperature-label--orange">Dubai</p>
      </div>
    </div>
  );
};
