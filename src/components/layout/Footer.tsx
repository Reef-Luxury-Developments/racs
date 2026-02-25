export const Footer = (): JSX.Element => {
  return (
    <footer className="site-footer">
      <div className="container">© {new Date().getFullYear()} RACS. All rights reserved.</div>
    </footer>
  );
};
