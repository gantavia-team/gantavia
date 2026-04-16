import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-HC5X9DV1SJ");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};